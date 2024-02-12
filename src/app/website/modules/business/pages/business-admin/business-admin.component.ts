import { Component, inject, OnInit } from '@angular/core';
import { businessAdminModel } from './../../models/businessAdmin.model';
import { DataSourceBusinessAdmin } from './dataSourceBusinessAdmin';
import { BusinessService} from '../../../../services/admin/business/business.service';
import { LoadingService } from './../../../../services/loading.service';
import { NgFor } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPenToSquare,
  faEraser,
  faUserPlus,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { DialogModule, Dialog } from '@angular/cdk/dialog';
import { DialogAdminBusinessComponent } from '../../components/dialog-admin-business/dialog-admin-business.component';
import { SpinnerComponent } from 'src/app/website/components/spinner/spinner.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, of, switchMap } from 'rxjs';
import { ButtonComponent } from 'src/app/website/components/button/button.component';
@Component({
  selector: 'app-business-admin',
  standalone:true,
  templateUrl: './business-admin.component.html',
  styleUrls: ['./business-admin.component.sass'],
  imports: [
    CdkTableModule,
    NgFor,
    MatIconModule,
    FontAwesomeModule,
    DialogModule,
    SpinnerComponent,
    ReactiveFormsModule,
    ButtonComponent
  ],
})
export class BusinessAdminComponent {
  faPenToSquare = faPenToSquare;
  faEraser = faEraser;
  faUserPlus = faUserPlus;
  faMagnifyingGlass = faMagnifyingGlass;
  dataBusiness: businessAdminModel[] = [];
  loading = false;
  textSpinner = '';
  private service = inject(BusinessService);
  private LoadingService = inject(LoadingService);
  constructor(private dialog: Dialog) {}
  dataSource = new DataSourceBusinessAdmin();
  inputSearch = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.service.dataBusiness$.subscribe((data) => {
      this.dataBusiness = data;
      this.dataSource.init(this.dataBusiness);
    });
    this.loading = true;
    this.LoadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.LoadingService.loadingMsj$.subscribe((msg) => {
      this.textSpinner = msg;
    });
    this.service.fetchBusiness$.subscribe((find) => {
      if (find) {
        this.fetchBusiness();
      } else {
        if (this.dataSource.getData().length === 0) {
          this.fetchBusiness();
        }
      }
    });
    this.textSpinner = 'Cargando Información de Negocios';
    this.inputSearch.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => {
          if (value) {
            this.LoadingService.setLoading(true, `Realizando Busqueda ...`);
            return this.service.searchBusiness(value);
          } else {
            this.LoadingService.setLoading(false, ``);
            // Si el valor está vacío, retornar un observable vacío
            this.service.setfetchBusiness(true);
            return of(null);
          }
        })
      )
      .subscribe((data) => {
        if (data) {
          this.LoadingService.setLoading(false, ``);
          this.dataBusiness = data;
          this.dataSource.init(this.dataBusiness);
          this.service.setdataBusiness(this.dataBusiness);
        }
      });
  }
  fetchBusiness() {
    this.LoadingService.setLoading(true, `Consultando Negocios`);
    this.service.search('', []).subscribe({
      next: (data) => {
        this.dataBusiness = data;
        this.dataSource.init(this.dataBusiness);
        this.service.setdataBusiness(this.dataBusiness);
        this.LoadingService.setLoading(false, ``);
      },
      error: (error) => {
        this.LoadingService.setLoading(false, ``);
      },
    });
  }

  openDialog(create: boolean, business: businessAdminModel | null) {
    const dialogRef = this.dialog.open(DialogAdminBusinessComponent, {
      width: '400px', // Ancho del dialog
      height: '300px', // Alto del dialog
      maxWidth: '90vw', // Máximo ancho en relación al viewport
      maxHeight: '90vh', // Máximo alto en relación al viewport
      data: {
        action: create,
        dataBusiness: business,
      },
    });
  }
  deleteRol(id: string) {
    this.LoadingService.setLoading(true, `Eliminando Negocio`);
    this.service.delete(id).subscribe({
      next: (data) => {
        this.LoadingService.setLoading(false, ``);
        this.service.setfetchBusiness(true);
      },
      error: (error) => {
        this.LoadingService.setLoading(false, ``);
      },
    });
  }

}
