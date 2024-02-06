import { Component, inject } from '@angular/core';
import {
  DatePipe, NgFor, CurrencyPipe,
  NgIf,
  NgSwitchCase,
  NgSwitch,
  NgSwitchDefault,
} from '@angular/common'
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
import { catchError, debounceTime, of, switchMap } from 'rxjs';

import { DialogModule, Dialog } from '@angular/cdk/dialog';
import { DialogAdminProductsComponent } from '../../components/dialog-admin-products/dialog-admin-products.component';
import { SpinnerComponent } from 'src/app/website/components/spinner/spinner.component';
import { DataSourceProductAdmin } from './dataSourceProductsAdmin';
import { ProductServiceService } from 'src/app/website/services/admin/product/product-service.service';
import { LoadingService } from 'src/app/website/services/loading.service';

import { Swal, SuccessErrorToast, objByDefaultAlertSwal, fireActionSwal } from 'src/app/website/utils/ActionToastAlert';
import { HttpStatusCode } from '@angular/common/http';
@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  standalone: true,
  styleUrls: ['./products-admin.component.sass'],
  imports: [
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
    DatePipe,
    CurrencyPipe
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
  constructor(private dialog: Dialog) { }
  private serviceProduct = inject(ProductServiceService);
  private LoadingService = inject(LoadingService);

  dataSource = new DataSourceProductAdmin();

  ngOnInit(): void {
    this.serviceProduct.dataProduct$.subscribe((data) => {
      this.dataProducts = data;
      this.dataSource.init(this.dataProducts);
    });
    this.loading = true;
    this.LoadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.LoadingService.loadingMsj$.subscribe((msg) => {
      this.textSpinner = msg;
    });
    this.serviceProduct.fetchProduct$.subscribe((find) => {
      if (find) {
        this.fetchProducts();
      } else {
        if (this.dataSource.getData().length === 0) {
          this.fetchProducts();
        }
      }
    });
    this.textSpinner = 'Cargando Información de Productos';
    this.inputSearch.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => {
          if (value) {
            this.LoadingService.setLoading(true, `Realizando Busqueda ...`);
            return this.serviceProduct.searchProduct(value).pipe(
              catchError((error) => {
                this.handleErrorToast(error);
                // Retornar un observable vacío en caso de error
                return of(null);
              })
            );
          } else {
            this.LoadingService.setLoading(false, ``);
            // Si el valor está vacío, retornar un observable vacío
            this.serviceProduct.setFetchProduct(true);
            return of(null);
          }
        })
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.LoadingService.setLoading(false, ``);
            this.dataProducts = data;
            this.dataSource.init(this.dataProducts);
            this.serviceProduct.setdataProduct(this.dataProducts);
          }
        },
      });
  }

  // Función para manejar errores de búsqueda
handleErrorToast(error:any) {
  if (HttpStatusCode.Unauthorized === error.status) {
    this.LoadingService.setLoading(false, ``);
    SuccessErrorToast(error.error, "error");
  }
}

  fetchProducts() {
    this.LoadingService.setLoading(true, `Consultando Productos`);
    this.serviceProduct.search('', []).subscribe({
      next: (data) => {
        this.dataProducts = data;
        this.dataSource.init(this.dataProducts);
        this.serviceProduct.setdataProduct(this.dataProducts);
        this.LoadingService.setLoading(false, ``);
      },
      error: (error) => {
        this.LoadingService.setLoading(false, ``);
      },
    });
  }


  openDialog(create: boolean, product: productAdminModel | null) {
    const dialogRef = this.dialog.open(DialogAdminProductsComponent, {
      width: '400px', // Ancho del dialog
      // height: '300px', // Alto del dialog
      // maxWidth: '90vw', // Máximo ancho en relación al viewport
      maxHeight: '90vh', // Máximo alto en relación al viewport
      data: {
        action: create,
        dataProduct: product,
      },
    });
  }

  deleteProduct(data: productAdminModel) {
    objByDefaultAlertSwal.title = `Estas seguro de eliminar el producto ${data.name}?`;
    objByDefaultAlertSwal.text = `No podrás revertir esto!`;
    objByDefaultAlertSwal.icon = `warning`;
    objByDefaultAlertSwal.confirmButtonText = "Si,Eliminar!";

    const fireSwal = fireActionSwal(objByDefaultAlertSwal);
    fireSwal.then((result) => {
      if (result.isConfirmed) {
        this.LoadingService.setLoading(true, `Eliminando Categoria`);
        this.serviceProduct.delete(data.id).subscribe({
          next: (dataRta) => {
            this.LoadingService.setLoading(false, ``);
            this.serviceProduct.setFetchProduct(true);
            SuccessErrorToast(`Producto ${data.name} eliminado correctamente`, "success");
          },
          error: (error) => {
            this.LoadingService.setLoading(false, '');
            this.handleErrorToast(error);
          },
        });
      }
    })
  }
}
