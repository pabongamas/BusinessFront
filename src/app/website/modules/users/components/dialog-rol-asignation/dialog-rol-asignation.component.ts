import { Component, Inject,inject } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { rolAdminModel } from './../../../rols/models/rolAdmin.model';
import {
  FormBuilder, Validators, FormControl, FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { UserService } from '../../../../services/admin/user/user.service';
import { LoadingService } from './../../../../services/loading.service';
import { userAdminModel } from '../../models/userAdmin.model';

import { InputComponent } from './../../../../components/input/input.component';

interface OutputData {
  rta: boolean;
}
interface InputData {
  dataRols: rolAdminModel[];
  dataUser:userAdminModel;
}
@Component({
  selector: 'app-dialog-rol-asignation',
  standalone: true,
  templateUrl: './dialog-rol-asignation.component.html',
  styleUrls: ['./dialog-rol-asignation.component.sass'],
  imports: [NgIf, NgFor, InputComponent],
})
export class DialogRolAsignationComponent {
  dataRols: rolAdminModel[] = [];
  dataUser: userAdminModel;
  private service = inject(UserService);
  private loadingService = inject(LoadingService);
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.dataUser = data.dataUser;
    this.dataRols = data.dataRols;
  }
  hasRole(user: userAdminModel, rol: rolAdminModel): boolean {
    return user.roles.some((userRol: any) => userRol.id === rol.id);
  }
  asignationRol(event: Event, rol: rolAdminModel, user: userAdminModel) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.service.setRolToUser(rol.id, user.id).subscribe({
        next: (data) => {
          this.service.setFetchUsers(true);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.service.unsetRolToUser(rol.id, user.id).subscribe({
        next: (data) => {
          this.service.setFetchUsers(true);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
