import { Component, Inject, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { clientAdminModel, actionClientAdmin,clientAdminFormModel } from '../../models/clientAdmin.model';;
import {
  FormBuilder, Validators, FormControl, FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus, faPenToSquare, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { ClientsService } from '../../../../services/admin/clients/clients.service';
import { LoadingService } from './../../../../services/loading.service';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SuccessErrorToast } from 'src/app/website/utils/ActionToastAlert';
import { HttpStatusCode } from '@angular/common/http';

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
  providers: [provideNativeDateAdapter()],
  imports: [NgIf, ReactiveFormsModule, FontAwesomeModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
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
      email: ['', [Validators.required, Validators.email]],
      nickname: [''],
      phone: [''],
      gender: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      address: ['', [Validators.required]],
      active: [false],
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
        email: ['', [Validators.required, Validators.email]],
        nickname: [''],
        phone: [''],
        gender: ['none', [Validators.required]],
        birthdate: ['', [Validators.required]],
        address: ['',[Validators.required]],
        active: [false],

      });
      this.form.patchValue({
        names: data.dataClient.names,
        lastnames: data.dataClient.lastnames,
        nickname: data.dataClient.nickname,
        email: data.dataClient.user?.email,
        phone: data.dataClient.phone,
        gender: data.dataClient.gender ? 'M' : 'F',
        birthdate: data.dataClient.birthdate,
        address:data.dataClient.address,
        active:data.dataClient.active === true
      });
    } else {
    }
  }
  actionForm(action: actionClientAdmin) {
    if (action) {
      if (this.form.valid) {
        this.loadingService.setLoading(true, 'Creando Cliente ...');
        const { gender, ...rest } = this.form.getRawValue();
        const updatedGender = gender === 'M' ? true : false;
        const form = { ...rest, gender: updatedGender};
        this.service.createClient(form).subscribe({
          next: () => {
            this.close();
            this.loadingService.setLoading(false, '');
            this.service.setFetchClient(true);
            SuccessErrorToast(`Cliente ${form.names} ${form.lastnames} Creado correctamente`, "success");
          },
          error: (error) => {
            this.loadingService.setLoading(
              true,
              `Ha ocurrido un error: ${error.error.message}`
            );

            this.loadingService.setLoading(false, '');
            this.handleErrorToast(error);
          },
        });
      } else {
        this.form.markAllAsTouched();
      }
    } else {
      if (this.form.valid) {
        this.loadingService.setLoading(true, 'Editando Cliente ...');
        const { gender, ...rest } = this.form.getRawValue();
        const updatedGender = gender === 'M' ? true : false;
        const form = { ...rest, gender: updatedGender,user:this.dataClient.user,business:this.dataClient.business};
        this.service.updateClient(this.dataClient.id, form).subscribe({
          next: () => {
            this.close();
            this.loadingService.setLoading(false, '');
            this.service.setFetchClient(true);
          },
          error: (error) => {
            this.loadingService.setLoading(
              true,
              `Ha ocurrido un error: ${error.error.message}`
            );

            this.loadingService.setLoading(false, '');
            this.handleErrorToast(error);
          },
        });
      } else {
        this.form.markAllAsTouched();
      }
    }
  }
  close() {
    this.dialogRef.close();
  }

  handleErrorToast(error:any) {
    this.loadingService.setLoading(false, ``);
    if (HttpStatusCode.Unauthorized === error.status) {
      SuccessErrorToast(error.error, "error");
    }else{
      SuccessErrorToast(error.error.message, "error");
    }
  }
  
}
