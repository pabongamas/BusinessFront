import { Component, inject, OnInit } from '@angular/core';
import { userAdminModel } from './../../models/userAdmin.model';
import { DataSourceUserAdmin } from './dataSourceUserAdmin';
import { UserService } from './../../../../services/user.service';
import { NgFor } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare,faEraser,faUserPlus,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {DialogModule,Dialog} from '@angular/cdk/dialog';
import { DialogAdminUserComponent } from '../../components/dialog-admin-user/dialog-admin-user.component';
import { SpinnerComponent } from 'src/app/website/components/spinner/spinner.component';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  standalone: true,
  styleUrls: ['./user-admin.component.sass'],
  imports: [CdkTableModule, NgFor,MatIconModule,FontAwesomeModule,DialogModule,SpinnerComponent]
})
export class UserAdminComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faEraser=faEraser;
  faUserPlus=faUserPlus;
  faMagnifyingGlass=faMagnifyingGlass;
  dataUser: userAdminModel[] = [];
  loading=false;
  textSpinner="";
  private service = inject(UserService);
  constructor(
    private dialog: Dialog,
  ){

  }
  dataSource = new DataSourceUserAdmin();
  ngOnInit(): void {
    this.loading=true;
    this.textSpinner="Cargando Información de usuarios";
    this.service.search('', []).subscribe((data) => {
      data.map((item) => {
        item.business = item.BusinessxUser.map((obj) => obj.name).join(',');
        item.rolesData = item.roles.map((obj) => obj.name).join(',');
        return item;
      });
      this.dataUser = data;
      this.dataSource.init(this.dataUser);
      this.loading=false;
      this.textSpinner="";
    },
    (error)=>{
      this.textSpinner="";
      this.loading=false;
    });
  }
  openDialog(create:boolean,user:userAdminModel|null) {
    const dialogRef = this.dialog.open(DialogAdminUserComponent, {
      minWidth: '50%',
      maxWidth: '50%',
      data: {
        action:create,
        dataUser:user
      },
    });
  }
}
