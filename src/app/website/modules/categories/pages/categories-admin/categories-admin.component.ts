import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'

import { LoadingService } from './../../../../services/loading.service';
import { CategorieServiceService } from 'src/app/website/services/admin/categorie/categorie-service.service';
import {
  NgFor,
  NgIf,
  NgSwitchCase,
  NgSwitch,
  NgSwitchDefault,
} from '@angular/common';

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

import { SpinnerComponent } from 'src/app/website/components/spinner/spinner.component';
import { ButtonComponent } from 'src/app/website/components/button/button.component';

import { categorieAdminModel } from '../../models/CategoriesAdmin.model';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, of, switchMap } from 'rxjs';
import { DataSourceCategorieAdmin } from './dataSourceCategorieAdmin';

import { DialogModule, Dialog } from '@angular/cdk/dialog';
import { DialogAdminCategoriesComponent } from '../../components/dialog-admin-categories/dialog-admin-categories.component';

import {buttonsClasses} from '../../../../models/ButtonClasses.model';

import {Swal,SuccessErrorToast,objByDefaultAlertSwal,fireActionSwal } from 'src/app/website/utils/ActionToastAlert';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  standalone: true,
  styleUrls: ['./categories-admin.component.sass'],
  imports: [
    NgFor,
    NgIf,
    NgSwitchCase,
    NgSwitch,
    NgSwitchDefault,
    MatIconModule,
    FontAwesomeModule,
    SpinnerComponent,
    ReactiveFormsModule,
    DatePipe,
    DialogModule,
    ButtonComponent,
  ],
})
export class CategoriesAdminComponent {
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
  dataCategorie: categorieAdminModel[] = [];
  constructor(private dialog: Dialog) { }
  private serviceCategorie = inject(CategorieServiceService);
  private LoadingService = inject(LoadingService);

  dataSource = new DataSourceCategorieAdmin();

  buttonsClasses=buttonsClasses.buttons;
  textClasses=buttonsClasses.texts;

  ngOnInit(): void {
    this.serviceCategorie.dataCategorie$.subscribe((data) => {
      this.dataCategorie = data;
      this.dataSource.init(this.dataCategorie);
    });
    this.loading = true;
    this.LoadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.LoadingService.loadingMsj$.subscribe((msg) => {
      this.textSpinner = msg;
    });
    this.serviceCategorie.fetchCategorie$.subscribe((find) => {
      if (find) {
        this.fetchCategories();
      } else {
        if (this.dataSource.getData().length === 0) {
          this.fetchCategories();
        }
      }
    });
    this.textSpinner = 'Cargando Información de Categorias';
    this.inputSearch.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => {
          if (value) {
            this.LoadingService.setLoading(true, `Realizando Busqueda ...`);
            return this.serviceCategorie.searchCategorie(value);
          } else {
            this.LoadingService.setLoading(false, ``);
            // Si el valor está vacío, retornar un observable vacío
            this.serviceCategorie.setFetchCategorie(true);
            return of(null);
          }
        })
      )
      .subscribe((data) => {
        if (data) {
          this.LoadingService.setLoading(false, ``);
          this.dataCategorie = data;
          this.dataSource.init(this.dataCategorie);
          this.serviceCategorie.setdataCategorie(this.dataCategorie);
        }
      });
  }

  fetchCategories() {
    this.LoadingService.setLoading(true, `Consultando Categorias`);
    this.serviceCategorie.search('', []).subscribe({
      next: (data) => {
        this.dataCategorie = data;
        this.dataSource.init(this.dataCategorie);
        this.serviceCategorie.setdataCategorie(this.dataCategorie);
        this.LoadingService.setLoading(false, ``);
      },
      error: (error) => {
        this.LoadingService.setLoading(false, ``);
      },
    });
  }

  openDialog(create: boolean, categorie: categorieAdminModel | null) {
    const dialogRef = this.dialog.open(DialogAdminCategoriesComponent, {
      width: '400px', // Ancho del dialog
      height: '300px', // Alto del dialog
      maxWidth: '90vw', // Máximo ancho en relación al viewport
      maxHeight: '90vh', // Máximo alto en relación al viewport
      data: {
        action: create,
        dataCategorie: categorie,
      },
    });
  }
  deleteCategorie(data: categorieAdminModel) {
    objByDefaultAlertSwal.title=`Estas seguro de eliminar la Categoria ${data.name}?`;
    objByDefaultAlertSwal.text=`No podrás revertir esto!`;
    objByDefaultAlertSwal.icon=`warning`;
    objByDefaultAlertSwal.confirmButtonText="Si,Eliminar!";

    const fireSwal=fireActionSwal(objByDefaultAlertSwal);
    fireSwal.then((result)=>{
      if (result.isConfirmed) {
        this.LoadingService.setLoading(true, `Eliminando Categoria`);
        this.serviceCategorie.delete(data.category_id).subscribe({
          next: (dataRta) => {
            this.LoadingService.setLoading(false, ``);
            this.serviceCategorie.setFetchCategorie(true);
            SuccessErrorToast(`Categoria ${data.name} eliminada correctamente`,"success");
          },
          error: (error) => {
            this.LoadingService.setLoading(false, '');
            SuccessErrorToast(error.error.message,"error");
          },
        });
      }
    })
  }
}
