import { Component, Inject, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { CreateAdminCategorieDTO, actionCategorieAdmin, categorieAdminModel, UpdateCategorieDTO } from '../../models/CategoriesAdmin.model';
import { LoadingService } from 'src/app/website/services/loading.service';
import {
  FormBuilder, Validators, FormControl, FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomValidators } from '../../../../utils/validators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus, faPenToSquare, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CategorieServiceService } from 'src/app/website/services/admin/categorie/categorie-service.service';


interface OutputData {
  rta: boolean;
}
interface InputData {
  action: actionCategorieAdmin;
  dataCategorie: categorieAdminModel;
}

@Component({
  selector: 'app-dialog-admin-categories',
  templateUrl: './dialog-admin-categories.component.html',
  standalone: true,
  styleUrls: ['./dialog-admin-categories.component.sass'],
  imports: [NgIf, ReactiveFormsModule, FontAwesomeModule],
})

export class DialogAdminCategoriesComponent {
  faUserPlus = faUserPlus;
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  isEditing = false;
  form = this.formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required]],
    },

  );
  action: actionCategorieAdmin;
  dataCategorie: categorieAdminModel;
  showPassword = false;
  private service = inject(CategorieServiceService);
  private loadingService = inject(LoadingService);
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.action = data.action;
    this.dataCategorie = data.dataCategorie;
    if (!this.action) {
      this.isEditing = true;
      this.form = this.formBuilder.nonNullable.group({
        name: ['', [Validators.required]],
      });
      this.form.patchValue({
        name: data.dataCategorie.name
      });
    } else {
    }
  }

  actionForm(action: actionCategorieAdmin) {
    if (action) {
      if (this.form.valid) {
        this.loadingService.setLoading(true, 'Creando categoria ...');
        const { name } = this.form.getRawValue();
        const nameData: CreateAdminCategorieDTO = { name };
        this.service.create(nameData).subscribe({
          next: () => {
            this.close();
            this.loadingService.setLoading(false, '');
            this.service.setFetchCategorie(true);
          },
          error: (error) => {
            console.log(error);
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
        this.loadingService.setLoading(true, 'Editando Categoria ...');
        const { name } = this.form.getRawValue();
        const data: UpdateCategorieDTO = { name };
        this.service.update(this.dataCategorie.category_id, data).subscribe({
          next: () => {
            this.close();
            this.loadingService.setLoading(false, '');
            this.service.setFetchCategorie(true);
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
