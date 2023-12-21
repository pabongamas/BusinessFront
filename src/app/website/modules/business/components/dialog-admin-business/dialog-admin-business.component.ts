import { Component, Inject, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { UpdateBusinessDTO, actionBusinessAdmin,businessAdminModel,CreateAdminBusinessDTO } from '../../models/businessAdmin.model';
import { BusinessService } from 'src/app/website/services/admin/business/business.service';
import { LoadingService } from 'src/app/website/services/loading.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUserPlus,
  faPenToSquare,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
interface OutputData {
  rta: boolean;
}
interface InputData {
  action: actionBusinessAdmin;
  dataBusiness: businessAdminModel;
}


@Component({
  selector: 'app-dialog-admin-business',
  standalone:true,
  templateUrl: './dialog-admin-business.component.html',
  styleUrls: ['./dialog-admin-business.component.sass'],
  imports: [NgIf, ReactiveFormsModule, FontAwesomeModule],
})
export class DialogAdminBusinessComponent {
  faUserPlus = faUserPlus;
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  isEditing = false;
  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
  });
  action: actionBusinessAdmin;
  dataBusiness: businessAdminModel;
  private service = inject(BusinessService);
  private loadingService = inject(LoadingService);
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.action = data.action;
    this.dataBusiness = data.dataBusiness;
    if (!this.action) {
      this.isEditing = true;
      this.form = this.formBuilder.nonNullable.group({
        name: ['', [Validators.required]],
      });
      console.log(data);
      this.form.patchValue({
        name: data.dataBusiness.name,
      });
    } else {
    }
  }
  actionForm(action: actionBusinessAdmin) {
    if (action) {
      if (this.form.valid) {
        this.loadingService.setLoading(true, 'Creando Negocio ...');
        const { name } = this.form.getRawValue();
        const nameData: CreateAdminBusinessDTO = { name };
        this.service.create(nameData).subscribe({
          next: () => {
            this.close();
            this.loadingService.setLoading(false, '');
            this.service.setfetchBusiness(true);
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
    } else {
      if (this.form.valid) {
        this.loadingService.setLoading(true, 'Editando Negocio ...');
        const { name } = this.form.getRawValue();
        const nameData: UpdateBusinessDTO = { name };
        this.service.update(this.dataBusiness.id, nameData).subscribe({
          next: () => {
            this.close();
            this.loadingService.setLoading(false, '');
            this.service.setfetchBusiness(true);
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
  }
  close() {
    this.dialogRef.close();
  }

}
