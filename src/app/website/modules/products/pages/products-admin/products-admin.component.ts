import { Component } from '@angular/core';
import {DatePipe ,NgFor,
  NgIf,
  NgSwitchCase,
  NgSwitch,
  NgSwitchDefault,} from '@angular/common'
import { ButtonComponent } from 'src/app/website/components/button/button.component';

import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPenToSquare,
  faEraser,
  faUserPlus,
  faMagnifyingGlass,
  faUserShield,
  faUserLarge,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { productAdminModel } from '../../models/ProductsAdmin.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, of, switchMap } from 'rxjs';

import { DialogModule, Dialog } from '@angular/cdk/dialog';
import { DialogAdminProductsComponent } from '../../components/dialog-admin-products/dialog-admin-products.component';
import { SpinnerComponent } from 'src/app/website/components/spinner/spinner.component';
@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  standalone:true,
  styleUrls: ['./products-admin.component.sass'],
  imports:[
    NgFor,
    NgIf,
    NgSwitchCase,
    NgSwitch,
    NgSwitchDefault,
    ButtonComponent,
    DialogModule,
    MatIconModule,
    FontAwesomeModule,
    SpinnerComponent,
    ReactiveFormsModule,
    DatePipe
  ]
})
export class ProductsAdminComponent {
  faPenToSquare = faPenToSquare;
  faEraser = faEraser;
  faUser = faUser;
  faUserPlus = faUserPlus;
  faUserShield = faUserShield;
  faUserLarge = faUserLarge;
  faMagnifyingGlass = faMagnifyingGlass;

  inputSearch = new FormControl('', { nonNullable: true });
  loading = false;
  textSpinner = '';
  dataProducts: productAdminModel[] = [];
  constructor(private dialog: Dialog) {}


  openDialog(create: boolean, product: productAdminModel | null) {
    const dialogRef = this.dialog.open(DialogAdminProductsComponent, {
      width: '400px', // Ancho del dialog
      height: '300px', // Alto del dialog
      maxWidth: '90vw', // Máximo ancho en relación al viewport
      maxHeight: '90vh', // Máximo alto en relación al viewport
      data: {
        action: create,
        dataProduct: product,
      },
    });
  }

  deleteProduct(data:productAdminModel){

  }
}
