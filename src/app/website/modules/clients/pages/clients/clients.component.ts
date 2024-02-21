import { Component, inject, OnInit } from '@angular/core';
import { userAdminModel } from '../../../users/models/userAdmin.model';
import { DataSourceUserAdmin } from '../../../users/pages/user-admin/dataSourceUserAdmin';
import { ClientsService } from 'src/app/website/services/admin/clients/clients.service';
import { RolService } from '../../../../services/admin/rol/rol.service';
import { BusinessService } from 'src/app/website/services/admin/business/business.service';
import { LoadingService } from './../../../../services/loading.service';
import {
  NgFor,
  NgIf,
  NgSwitchCase,
  NgSwitch,
  NgSwitchDefault,
} from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPenToSquare,
  faEraser,
  faUserPlus,
  faMagnifyingGlass,
  faUserShield,
  faUserLarge,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { DialogModule, Dialog } from '@angular/cdk/dialog';
import { DialogAdminClientsComponent } from '../../components/dialog-admin-clients/dialog-admin-clients.component';
import { SpinnerComponent } from 'src/app/website/components/spinner/spinner.component';
import { ButtonComponent } from 'src/app/website/components/button/button.component';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { rolAdminModel } from '../../../rols/models/rolAdmin.model';
import { businessAdminModel } from '../../../business/models/businessAdmin.model';
import { DataSourceClientAdmin } from './dataSourceClientAdmin';
import { clientAdminModel } from '../../models/clientAdmin.model';
import { HttpStatusCode } from '@angular/common/http';
import { Swal, SuccessErrorToast, objByDefaultAlertSwal, fireActionSwal } from 'src/app/website/utils/ActionToastAlert';

@Component({
  selector: 'app-clients',
  standalone: true,
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.sass',
  imports:[
    CdkTableModule,
    NgFor,
    NgIf,
    NgSwitchCase,
    NgSwitch,
    NgSwitchDefault,
    MatIconModule,
    FontAwesomeModule,
    DialogModule,
    SpinnerComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ]
})
export class ClientsComponent {
  faPenToSquare = faPenToSquare;
  faEraser = faEraser;
  faUser = faUser;
  faUserPlus = faUserPlus;
  faUserShield = faUserShield;
  faUserLarge = faUserLarge;
  faMagnifyingGlass = faMagnifyingGlass;
  dataClients: clientAdminModel[] = [];
  loading = false;
  textSpinner = '';

  private service = inject(ClientsService);
  private rolService=inject(RolService);
  private businessService=inject(BusinessService);
  private LoadingService = inject(LoadingService);
  constructor(private dialog: Dialog) {}
  dataSource = new DataSourceClientAdmin();

  inputSearch = new FormControl('', { nonNullable: true });
  ngOnInit(): void {
    this.service.dataClient$.subscribe((data) => {
      this.dataClients = data;
      this.dataSource.init(this.dataClients);
    });
    this.loading = true;
    this.LoadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.LoadingService.loadingMsj$.subscribe((msg) => {
      this.textSpinner = msg;
    });
    this.service.fetchClient$.subscribe((find) => {
      if (find) {
        this.fetchClients();
      } else {
        if (this.dataSource.getData().length === 0) {
          this.fetchClients();
        }
      }
    });

    this.textSpinner = 'Cargando Información de Productos';
    this.inputSearch.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => {
          if (value) {
            this.LoadingService.setLoading(true, `Realizando Busqueda ...`);
            return this.service.searchClient(value).pipe(
              catchError((error) => {
                this.handleErrorToast(error);
                // Retornar un observable vacío en caso de error
                return of(null);
              })
            );
          } else {
            this.LoadingService.setLoading(false, ``);
            // Si el valor está vacío, retornar un observable vacío
            this.service.setFetchClient(true);
            return of(null);
          }
        })
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.LoadingService.setLoading(false, ``);
            this.dataClients = data;
            this.dataSource.init(this.dataClients);
            this.service.setdataClient(this.dataClients);
          }
        },
      });
  }

  fetchClients() {
    this.LoadingService.setLoading(true, `Consultando Clients`);
    this.service.search('', []).subscribe({
      next: (data) => {
        this.dataClients = data;
        this.dataSource.init(this.dataClients);
        this.service.setdataClient(this.dataClients);
        this.LoadingService.setLoading(false, ``);
      },
      error: (error) => {
        this.LoadingService.setLoading(false, ``);
        SuccessErrorToast(error.error, "error");
      },
    });
  }

  openDialog(create: boolean, client: clientAdminModel | null) {
    const dialogRef = this.dialog.open(DialogAdminClientsComponent, {
      // width: '400px', // Ancho del dialog
      // height: '300px', // Alto del dialog
      // maxWidth: '60vw', // Máximo ancho en relación al viewport
      // maxHeight: '90vh', // Máximo alto en relación al viewport
      data: {
        action: create,
        dataClient: client,
      },
    });
  }
  deleteClient(data: clientAdminModel) {
    objByDefaultAlertSwal.title = `Estas seguro de eliminar el cliente ${data.names} ${data.lastnames}?`;
    objByDefaultAlertSwal.text = `No podrás revertir esto!`;
    objByDefaultAlertSwal.icon = `warning`;
    objByDefaultAlertSwal.confirmButtonText = "Si,Eliminar!";

    const fireSwal = fireActionSwal(objByDefaultAlertSwal);
    fireSwal.then((result) => {
      if (result.isConfirmed) {
        this.LoadingService.setLoading(true, `Eliminando Cliente`);
        this.service.deleteClient(data.id).subscribe({
          next: (dataRta) => {
            this.LoadingService.setLoading(false, ``);
            this.service.setFetchClient(true);
            SuccessErrorToast(`Cliente ${data.names} ${data.lastnames} eliminado correctamente`, "success");
          },
          error: (error) => {
            this.LoadingService.setLoading(false, '');
            this.handleErrorToast(error);
          },
        });
      }
    })
  }
  handleErrorToast(error:any) {
    if (HttpStatusCode.Unauthorized === error.status) {
      this.LoadingService.setLoading(false, ``);
      SuccessErrorToast(error.error, "error");
    }
  }

}
