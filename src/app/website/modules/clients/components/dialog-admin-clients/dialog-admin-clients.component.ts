import { Component, Inject, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { clientAdminModel, actionClientAdmin } from '../../models/clientAdmin.model';;
import {
  FormBuilder, Validators, FormControl, FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus, faPenToSquare, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { ClientsService } from '../../../../services/admin/clients/clients.service';
import { LoadingService } from './../../../../services/loading.service';

interface OutputData {
  rta: boolean;
}
interface InputData {
  action: actionClientAdmin;
  dataClient: clientAdminModel;
}

@Component({
  selector: 'app-dialog-admin-clients',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './dialog-admin-clients.component.html'
})
export class DialogAdminClientsComponent {
  faUserPlus = faUserPlus;
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  isEditing = false;
  form = this.formBuilder.nonNullable.group(
    {
      names: ['', [Validators.required]],
      lastnames: ['', [Validators.required]],
      nickname: [''],
      phone: [''],
      gender:['', [Validators.required]],
    }
  );
  action: actionClientAdmin;
  dataClient: clientAdminModel;
  showPassword = false;
  private service = inject(ClientsService);
  private loadingService = inject(LoadingService);
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.action = data.action;
    this.dataClient = data.dataClient;
    if (!this.action) {
      this.isEditing = true;
      this.form = this.formBuilder.nonNullable.group({
        names: ['', [Validators.required]],
        lastnames: ['', [Validators.required]],
        nickname: [''],
        phone: [''],
        gender: ['none', [Validators.required]],
      });
      this.form.patchValue({
        names: data.dataClient.names,
        lastnames:data.dataClient.lastnames,
        nickname:data.dataClient.nickname,
        phone:data.dataClient.phone,
        gender:data.dataClient.gender?'M':'F'
      });
    } else {
    }
  }
  actionForm(action: actionClientAdmin) {
    if (action) {
      if (this.form.valid) {
        this.loadingService.setLoading(true, 'Creando Cliente ...');
        // const { email, password } = this.form.getRawValue();
        // this.service.create(email, password).subscribe({
        //   next: () => {
        //     this.close();
        //     this.loadingService.setLoading(false, '');
        //     this.service.setFetchUsers(true);
        //   },
        //   error: (error) => {
        //     this.loadingService.setLoading(
        //       true,
        //       `Ha ocurrido un error: ${error.error.message}`
        //     );
        //   },
        // });
      } else {
        this.form.markAllAsTouched();
      }
    } else {
      if (this.form.valid) {
        this.loadingService.setLoading(true, 'Editando usuario ...');
        // const { email } = this.form.getRawValue();
        // this.service.update(this.dataUser.id, email).subscribe({
        //   next: () => {
        //     this.close();
        //     this.loadingService.setLoading(false, '');
        //     this.service.setFetchUsers(true);
        //   },
        //   error: (error) => {
        //     this.loadingService.setLoading(
        //       true,
        //       `Ha ocurrido un error: ${error.error.message}`
        //     );
        //   },
        // });
      } else {
        this.form.markAllAsTouched();
      }
    }
  }
  close() {
    this.dialogRef.close();
  }
}
