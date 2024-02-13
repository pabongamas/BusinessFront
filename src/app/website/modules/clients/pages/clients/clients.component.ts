import { Component, inject, OnInit } from '@angular/core';
import { userAdminModel } from '../../../users/models/userAdmin.model';
import { DataSourceUserAdmin } from '../../../users/pages/user-admin/dataSourceUserAdmin';
import { UserService } from '../../../../services/admin/user/user.service';
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
import { DialogAdminUserComponent } from '../../../users/components/dialog-admin-user/dialog-admin-user.component';
import { SpinnerComponent } from 'src/app/website/components/spinner/spinner.component';
import { ButtonComponent } from 'src/app/website/components/button/button.component';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, of, switchMap } from 'rxjs';
import { rolAdminModel } from '../../../rols/models/rolAdmin.model';
import { businessAdminModel } from '../../../business/models/businessAdmin.model';

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
  dataUser: userAdminModel[] = [];
  loading = false;
  textSpinner = '';

  private service = inject(UserService);
  private rolService=inject(RolService);
  private businessService=inject(BusinessService);
  private LoadingService = inject(LoadingService);
  constructor(private dialog: Dialog) {}
  inputSearch = new FormControl('', { nonNullable: true });

  openDialog(create: boolean, user: userAdminModel | null) {
    const dialogRef = this.dialog.open(DialogAdminUserComponent, {
      width: '400px', // Ancho del dialog
      height: '300px', // Alto del dialog
      maxWidth: '90vw', // Máximo ancho en relación al viewport
      maxHeight: '90vh', // Máximo alto en relación al viewport
      data: {
        action: create,
        dataUser: user,
      },
    });
  }
  deleteUser(id: string) {
    this.LoadingService.setLoading(true, `Eliminando usuario`);
    this.service.delete(id).subscribe({
      next: (data) => {
        this.LoadingService.setLoading(false, ``);
        this.service.setFetchUsers(true);
      },
      error: (error) => {
        this.LoadingService.setLoading(false, ``);
      },
    });
  }

}
