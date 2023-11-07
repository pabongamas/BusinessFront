import { Component, Inject,inject } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { rolAdminModel } from './../../../rols/models/rolAdmin.model';
import {
  FormBuilder, Validators, FormControl, FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

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
  imports: [NgIf, NgFor, InputComponent,ButtonComponent],
})
export class DialogBusinessAsignationComponent {
  dataBusiness: businessAdminModel[] = [];
  dataUser: userAdminModel;
  private service = inject(UserService);
  private loadingService = inject(LoadingService);
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.dataUser = data.dataUser;
    this.dataBusiness = data.dataBusiness;
  }
  hasBusiness(user: userAdminModel, business: businessAdminModel): boolean {
    return user.BusinessxUser.some((userBusiness: any) => userBusiness.id === business.id);
  }
  setRolToBusiness(event: Event,rol:rolAdminModel){
      const target = event.target as HTMLInputElement;
      console.log(target);
      console.log(rol);
  }
}
