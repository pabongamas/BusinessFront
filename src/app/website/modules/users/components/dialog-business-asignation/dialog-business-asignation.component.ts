import { Component, Inject, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { rolAdminModel } from './../../../rols/models/rolAdmin.model';
import {
  FormBuilder, Validators, FormControl, FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus, faPenToSquare, faEye, faEyeSlash,faTrash } from '@fortawesome/free-solid-svg-icons';

import { UserService } from './../../../../services/user.service';
import { BusinessService } from 'src/app/website/services/business.service';
import { LoadingService } from './../../../../services/loading.service';
import { userAdminModel } from '../../models/userAdmin.model';

import { InputComponent } from './../../../../components/input/input.component';
import { businessAdminModel } from '../../../business/models/businessAdmin.model';
import { rolesUser } from './../../models/rolesUser.model';
import { ButtonComponent } from 'src/app/website/components/button/button.component';

import {
  COLORS,
  Colors,
  COLORSNOACTION,
  COLORS_FOR_BUTTONS,
} from './../../../../models/colors.model';

interface OutputData {
  rta: boolean;
}
interface InputData {
  dataBusiness: businessAdminModel[];
  dataUser: userAdminModel;
}
@Component({
  selector: 'app-dialog-business-asignation',
  standalone: true,
  templateUrl: './dialog-business-asignation.component.html',
  styleUrls: ['./dialog-business-asignation.component.sass'],
  imports: [NgIf, NgFor, InputComponent, ButtonComponent, FontAwesomeModule, ReactiveFormsModule],
})
export class DialogBusinessAsignationComponent {
  dataBusiness: businessAdminModel[] = [];
  dataUser: userAdminModel;
  faUserPlus = faUserPlus;
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faTrash=faTrash;
  dataBusinessOfUser: businessAdminModel[] = [];
  roleBusinessUser: string[] = [];
  businessUser:string[]=[];
  rolesUser:rolesUser[]=[];
  form = this.formBuilder.nonNullable.group(
    {
      business: ['', [Validators.required]],
      rol: ['', [Validators.required]],
    }
  );
  colorsButton=COLORS_FOR_BUTTONS;
  private service = inject(UserService);
  private businessService = inject(BusinessService);
  private loadingService = inject(LoadingService);
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.dataUser = data.dataUser;
    this.rolesUser=data.dataUser.roles;
    this.businessByUser(this.dataUser.id);
    this.dataBusiness = data.dataBusiness;
    this.roleBusinessUser = this.hasRole(data.dataUser, this.dataBusinessOfUser);
    this.businessUser=this.hasBusiness(data.dataUser, this.dataBusinessOfUser);
  }
  hasBusiness(user: userAdminModel, business: businessAdminModel[]): string[] {
    // Verificar si el usuario tiene información de negocios
    if (user && user.BusinessxUser) {
      // Obtener los IDs de los negocios del usuario
      const userBusinessIds = user.BusinessxUser.map(business => business.id);
      return userBusinessIds;
    } else {
      // Devolver un array vacío si el usuario no tiene información de negocios
      return [];
    }
  }
  hasRole(user: userAdminModel, business: businessAdminModel[]): string[] {
    // Verificar si el usuario tiene información de negocios
    if (user && user.roles) {
      // Obtener los IDs de los negocios del usuario
      const userRolesId = user.roles.map(rol => rol.id);
      const rolesBusinessUser = user.BusinessxUser.map(businessUser => businessUser.UserBusinessRole.role_id);
      // Filtrar los negocios proporcionados que coinciden con los IDs del usuario
      return rolesBusinessUser;
    } else {
      // Devolver un array vacío si el usuario no tiene información de negocios
      return [];
    }
  }

  actionForm() {
    if (this.form.valid) {
      this.loadingService.setLoading(true, `Estableciendo negocio con su rol para el  usuario  ${this.dataUser.email}...`);
      const { business, rol } = this.form.getRawValue();
      const objData = {
        businessId: business,
        rolId: rol,
        userId: this.dataUser.id
      }
      this.service.setBusinessRolToUser(objData).subscribe({
        next: () => {
          this.loadingService.setLoading(false, '');
          this.service.setFetchUsers(true);
          this.businessByUser(this.dataUser.id);
          const indexSelectBusiness=this.dataBusiness.findIndex(obj=>obj.id==business);
          this.dataBusiness.splice(indexSelectBusiness,1);
        },
        error: (error) => {
          this.loadingService.setLoading(
            true,
            `Ha ocurrido un error: ${error.error.message}`
          );
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  close() {
    this.dialogRef.close();
  }
  businessByUser(idUser: string) {
    this.loadingService.setLoading(true, `Buscando Negocios para el usuario`);
    this.businessService.businessByUser(idUser).subscribe({
      next: (data) => {
        const roles=this.dataUser.roles;
        data.forEach(function(value){
          value.userxBusiness.forEach(function(valueInt){
            value.roles=roles.find(obj=>parseInt(obj.id)===valueInt.UserBusinessRole.role_id);
          });
        });
        this.dataBusinessOfUser = data;
        this.loadingService.setLoading(false, '');
      },
      error: (error) => {
        this.loadingService.setLoading(
          true,
          `Ha ocurrido un error: ${error.error.message}`
        );
      },
    });

  }
  deleteBusinessRolUser(dataUser:userAdminModel,rolId:number|undefined,businessId:string){
    this.loadingService.setLoading(true, `Desvinculando Negocio y su rol  para el usuario ${dataUser.email}`);
    this.businessService.deleteBusinessRolByUser(dataUser.id,rolId,businessId).subscribe({
      next: (data) => {
        this.loadingService.setLoading(false, '');
        this.businessByUser(dataUser.id);
      },
      error: (error) => {
        this.loadingService.setLoading(
          true,
          `Ha ocurrido un error: ${error.error.message}`
        );
      },
    });

  }
}
