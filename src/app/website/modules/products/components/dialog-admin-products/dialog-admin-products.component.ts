import { actionProductAdmin, productAdminModel, CreateAdminProductDTO, UpdateProductDTO } from '../../models/ProductsAdmin.model';


import { Component, Inject, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoadingService } from 'src/app/website/services/loading.service';
import {
  FormBuilder, Validators, FormControl, FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomValidators } from '../../../../utils/validators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus, faPenToSquare, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ProductServiceService } from 'src/app/website/services/admin/product/product-service.service';
import {BusinessService} from './../../../../services/admin/business/business.service';
import {CategorieServiceService} from './../../../../services/admin/categorie/categorie-service.service';


import { SuccessErrorToast } from 'src/app/website/utils/ActionToastAlert';
import { buttonsClasses } from '../../../../models/ButtonClasses.model';
import { businessAdminModel } from '../../../business/models/businessAdmin.model';
import { categorieAdminModel } from '../../../categories/models/CategoriesAdmin.model';

interface OutputData {
  rta: boolean;
}
interface InputData {
  action: actionProductAdmin;
  dataProduct: productAdminModel;
}


@Component({
  selector: 'app-dialog-admin-products',
  templateUrl: './dialog-admin-products.component.html',
  styleUrls: ['./dialog-admin-products.component.sass'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, FontAwesomeModule],
})
export class DialogAdminProductsComponent {
  faUserPlus = faUserPlus;
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  isEditing = false;
  form = this.formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required]],
      description: ['',],
      price: ['', [Validators.required]],
      business_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
    },
  );
  dataBusiness: businessAdminModel[] = [];
  dataCategorie:categorieAdminModel[]=[];
  action: actionProductAdmin;
  dataProduct: productAdminModel;
  buttonsClasses = buttonsClasses.buttons;
  textClasses = buttonsClasses.texts;
  private service = inject(ProductServiceService);
  private businessService = inject(BusinessService);
  private serviceCategorie=inject(CategorieServiceService);

  private loadingService = inject(LoadingService);
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.businessService.search('', []).subscribe({
      next: (data) => {
        this.dataBusiness = data;
        this.loadingService.setLoading(false, ``);
      },
      error: (error) => {
        this.loadingService.setLoading(false, ``);
      },
    });
    this.serviceCategorie.search('', []).subscribe({
      next: (data) => {
        this.dataCategorie = data;
        this.loadingService.setLoading(false, ``);
      },
      error: (error) => {
        this.loadingService.setLoading(false, ``);
      },
    });
    this.action = data.action;
    this.dataProduct = data.dataProduct;
    console.log(this.action);
    if (!this.action) {
      this.isEditing = true;
      this.form = this.formBuilder.nonNullable.group({
        name: ['', [Validators.required]],
        description: ['',],
        price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
        business_id: ['', [Validators.required]],
        category_id: ['', [Validators.required]],
      });
      this.form.patchValue({
        name: data.dataProduct.name,
        description: data.dataProduct.description,
        price: data.dataProduct.price,
        business_id: data.dataProduct.business_id,
        category_id: data.dataProduct.category_id
      });
    } else {
    }
  }
  keyPress(event: any) {
    const pattern = /[0-9\.\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // Si el carácter es un punto, verifica si ya hay un punto en el valor actual
    if (inputChar === '.' && event.target.value.includes('.')) {
      event.preventDefault();
    }
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  actionForm(action: actionProductAdmin) {
    if (action) {
      if (this.form.valid) {
        this.loadingService.setLoading(true, 'Creando categoria ...');
        const { name, description, price,business_id,category_id } = this.form.getRawValue();
        const nameData: CreateAdminProductDTO = { name, description, price ,business_id,category_id};
        this.service.create(nameData).subscribe({
          next: () => {
            this.close();
            this.loadingService.setLoading(false, '');
            this.service.setFetchProduct(true);
            SuccessErrorToast(`Categoria ${nameData.name} Creada correctamente`, "success");
          },
          error: (error) => {
            this.loadingService.setLoading(
              false,
              ``
            );
            SuccessErrorToast(error.error.message, 'error');
          },
        });
      } else {
        this.form.markAllAsTouched();
      }
    } else {
      if (this.form.valid) {
        this.loadingService.setLoading(true, 'Editando Categoria ...');
        const { name, description, price,business_id,category_id } = this.form.getRawValue();
        const data: UpdateProductDTO = { name, description, price,business_id,category_id  };
        this.service.update(this.dataProduct.id, data).subscribe({
          next: () => {
            this.close();
            this.loadingService.setLoading(false, '');
            this.service.setFetchProduct(true);
            SuccessErrorToast(`Producto ${data.name} Actualizado correctamente`, "success");
          },
          error: (error) => {
            this.loadingService.setLoading(
              true,
              ``
            );
            SuccessErrorToast(error.error.message, 'error');
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
