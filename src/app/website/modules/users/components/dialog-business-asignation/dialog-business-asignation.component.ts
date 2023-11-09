import { Component, Inject,inject } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { rolAdminModel } from './../../../rols/models/rolAdmin.model';
import {
  FormBuilder, Validators, FormControl, FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus, faPenToSquare,faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { UserService } from './../../../../services/user.service';
import { LoadingService } from './../../../../services/loading.service';
import { userAdminModel } from '../../models/userAdmin.model';

import { InputComponent } from './../../../../components/input/input.component';
import { businessAdminModel } from '../../../business/models/businessAdmin.model';
import { ButtonComponent } from 'src/app/website/components/button/button.component';

interface OutputData {
  rta: boolean;
}
interface InputData {
  dataBusiness: businessAdminModel[];
  dataUser:userAdminModel;
}
@Component({
  selector: 'app-dialog-business-asignation',
  standalone: true,
  templateUrl: './dialog-business-asignation.component.html',
  styleUrls: ['./dialog-business-asignation.component.sass'],
  imports: [NgIf, NgFor, InputComponent,ButtonComponent,FontAwesomeModule,ReactiveFormsModule],
})
export class DialogBusinessAsignationComponent {
  dataBusiness: businessAdminModel[] = [];
  dataUser: userAdminModel;
  faUserPlus = faUserPlus;
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  form = this.formBuilder.nonNullable.group(
    {
      business: ['', [Validators.required]],
      rol: ['', [Validators.required]],
    }
  );
  private service = inject(UserService);
  private loadingService = inject(LoadingService);
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.dataUser = data.dataUser;
    this.dataBusiness = data.dataBusiness;
    // console.log(this.dataBusiness);
    // console.log(this.dataUser);
    console.log(this.hasBusiness(this.dataUser,this.dataBusiness));
  }
  hasBusiness(user: userAdminModel, business: businessAdminModel[]): businessAdminModel[]{
    return business;
  }

  actionForm() {
    if (this.form.valid) {
      this.loadingService.setLoading(true, `Estableciendo negocio con su rol para el  usuario  ${this.dataUser.email}...`);
      const { business,rol } = this.form.getRawValue();
      const objData={
        businessId:business,
        rolId:rol,
        userId:this.dataUser.id
      }
      this.service.setBusinessRolToUser(objData).subscribe({
        next: () => {
          this.close();
          this.loadingService.setLoading(false, '');
          this.service.setFetchUsers(true);
        },
        error: (error) => {
          this.loadingService.setLoading(
            true,
            `Ha ocurrido un error: ${error.error.message}`
          );
        },
      });
    }else{
      this.form.markAllAsTouched();
    }
  }
  close() {
    this.dialogRef.close();
  }
}
