import { Component, inject, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  standalone:true,
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
    ReactiveFormsModule
  ]
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
  private serviceCategorie = inject(CategorieServiceService);
  private LoadingService = inject(LoadingService);

  dataSource = new DataSourceCategorieAdmin();

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
          console.log(data);
          // data.map((item) => {
          //   item.business = item.BusinessxUser.map((obj) => obj.name).join(',');
          //   item.rolesData = item.roles.map((obj) => obj.name).join(',');
          //   return item;
          // });
          this.dataCategorie = data;
          this.dataSource.init(this.dataCategorie);
          this.serviceCategorie.setdataCategorie(this.dataCategorie);
        }
      });
  }

  fetchCategories(){
    this.LoadingService.setLoading(true, `Consultando usuarios`);
    this.serviceCategorie.search('', []).subscribe({
      next: (data) => {
        // data.map((item) => {
        //   item.business = item.BusinessxUser.map((obj) => obj.name).join(',');
        //   item.rolesData = item.roles.map((obj) => obj.name).join(',');
        //   return item;
        // });
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

  openDialog(create: boolean, user: categorieAdminModel | null) {
    // const dialogRef = this.dialog.open(DialogAdminUserComponent, {
    //   width: '400px', // Ancho del dialog
    //   height: '300px', // Alto del dialog
    //   maxWidth: '90vw', // Máximo ancho en relación al viewport
    //   maxHeight: '90vh', // Máximo alto en relación al viewport
    //   data: {
    //     action: create,
    //     dataUser: user,
    //   },
    // });
  }
}
