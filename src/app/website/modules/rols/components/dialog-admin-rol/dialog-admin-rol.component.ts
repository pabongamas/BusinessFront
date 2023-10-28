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
import { UpdateRolDTO, actionRolAdmin } from '../../models/rolAdmin.model';
import { rolAdminModel, CreateAdminRolDTO } from '../../models/rolAdmin.model';
import { RolService } from 'src/app/website/services/rol.service';
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
  action: actionRolAdmin;
  dataRol: rolAdminModel;
}

@Component({
  selector: 'app-dialog-admin-rol',
  templateUrl: './dialog-admin-rol.component.html',
  standalone: true,
  styleUrls: ['./dialog-admin-rol.component.sass'],
  imports: [NgIf, ReactiveFormsModule, FontAwesomeModule],
})
export class DialogAdminRolComponent {
  faUserPlus = faUserPlus;
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  isEditing = false;
  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
  });
  action: actionRolAdmin;
  dataRol: rolAdminModel;
  private service = inject(RolService);
  private loadingService = inject(LoadingService);
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.action = data.action;
    this.dataRol = data.dataRol;
    if (!this.action) {
      this.isEditing = true;
      this.form = this.formBuilder.nonNullable.group({
        name: ['', [Validators.required]],
      });
      this.form.patchValue({
        name: data.dataRol.name,
      });
    } else {
    }
  }
  actionForm(action: actionRolAdmin) {
    if (action) {
      if (this.form.valid) {
        this.loadingService.setLoading(true, 'Creando Rol ...');
        const { name } = this.form.getRawValue();
        const nameData: CreateAdminRolDTO = { name };
        this.service.create(nameData).subscribe({
          next: () => {
            this.close();
            this.loadingService.setLoading(false, '');
            this.service.setfechRols(true);
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
        this.loadingService.setLoading(true, 'Editando usuario ...');
        const { name } = this.form.getRawValue();
        const nameData: UpdateRolDTO = { name };
        this.service.update(this.dataRol.id, nameData).subscribe({
          next: () => {
            this.close();
            this.loadingService.setLoading(false, '');
            this.service.setfechRols(true);
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
