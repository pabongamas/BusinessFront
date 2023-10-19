import { Component, Inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { actionUserAdmin } from '../../models/userAdmin.model';
import { userAdminModel } from '../../models/userAdmin.model';
import {
  FormBuilder, Validators, FormControl, FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

interface OutputData {
  rta: boolean;
}
interface InputData {
  action: actionUserAdmin;
  dataUser: userAdminModel;
}

@Component({
  selector: 'app-dialog-admin-user',
  templateUrl: './dialog-admin-user.component.html',
  standalone: true,
  styleUrls: ['./dialog-admin-user.component.sass'],
  imports: [NgIf, ReactiveFormsModule,FontAwesomeModule]
})


export class DialogAdminUserComponent {
  faUserPlus=faUserPlus;
  faPenToSquare=faPenToSquare;
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required]],
  });
  action: actionUserAdmin;
  dataUser: userAdminModel;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.action = data.action;
    this.dataUser = data.dataUser;
  }
  actionForm(action: actionUserAdmin) {

  }
}