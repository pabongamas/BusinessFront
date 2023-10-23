import { Component, Inject,inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { actionUserAdmin } from '../../models/userAdmin.model';
import { userAdminModel } from '../../models/userAdmin.model';
import {
  FormBuilder, Validators, FormControl, FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomValidators } from '../../../../utils/validators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus, faPenToSquare,faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { UserService } from './../../../../services/user.service';
import { LoadingService } from './../../../../services/loading.service';

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
  imports: [NgIf, ReactiveFormsModule, FontAwesomeModule],
})
export class DialogAdminUserComponent {
  faUserPlus = faUserPlus;
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  isEditing = false;
  form = this.formBuilder.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('password', 'confirmPassword'),
      ],
    }
  );
  action: actionUserAdmin;
  dataUser: userAdminModel;
  showPassword = false;
  private service = inject(UserService);
  private loadingService = inject(LoadingService);
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.action = data.action;
    this.dataUser = data.dataUser;
    if (!this.action) {
      this.isEditing = true;
      this.form = this.formBuilder.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: [''],
        confirmPassword: [''],
      });
      this.form.patchValue({
        email: data.dataUser.email,
      });
    } else {
    }
  }

  actionForm(action: actionUserAdmin) {
    if (action) {
      if (this.form.valid) {
        this.loadingService.setLoading(true, 'Creando usuario ...');
        const { email, password } = this.form.getRawValue();
        this.service.create(email, password).subscribe({
          next: () => {
            this.close();
            this.loadingService.setLoading(false, '');
          },
          error: (error) => {
            this.loadingService.setLoading(
              true,
              `Ha ocurrido un error ${error.message}...`
            );
          },
        });
      } else {
        this.form.markAllAsTouched();
      }
    } else {
      if (this.form.valid) {
        this.loadingService.setLoading(true, 'Editando usuario ...');
        const { email } = this.form.getRawValue();
        this.service.update(this.dataUser.id, email).subscribe({
          next: () => {
            this.close();
            this.loadingService.setLoading(false, '');
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
