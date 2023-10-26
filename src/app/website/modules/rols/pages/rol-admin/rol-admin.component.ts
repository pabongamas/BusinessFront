import { Component, inject, OnInit } from '@angular/core';
import { rolAdminModel } from './../../models/rolAdmin.model';
import { DataSourceRolAdmin } from './dataSourceRolAdmin';
import { RolService } from './../../../../services/rol.service';
import { LoadingService } from './../../../../services/loading.service';
import { NgFor } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPenToSquare,
  faEraser,
  faUserPlus,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { DialogModule, Dialog } from '@angular/cdk/dialog';
import { DialogAdminRolComponent } from '../../components/dialog-admin-rol/dialog-admin-rol.component';
import { SpinnerComponent } from 'src/app/website/components/spinner/spinner.component';
@Component({
  selector: 'app-rol-admin',
  standalone: true,
  templateUrl: './rol-admin.component.html',
  styleUrls: ['./rol-admin.component.sass'],
  imports: [
    CdkTableModule,
    NgFor,
    MatIconModule,
    FontAwesomeModule,
    DialogModule,
    SpinnerComponent,
  ],
})
export class RolAdminComponent {
  faPenToSquare = faPenToSquare;
  faEraser = faEraser;
  faUserPlus = faUserPlus;
  faMagnifyingGlass = faMagnifyingGlass;
  dataRol: rolAdminModel[] = [];
  loading = false;
  textSpinner = '';
  private service = inject(RolService);
  private LoadingService = inject(LoadingService);
  constructor(private dialog: Dialog) {}
  dataSource = new DataSourceRolAdmin();
  ngOnInit(): void {
    this.service.dataRol$.subscribe((data) => {
      this.dataRol = data;
      this.dataSource.init(this.dataRol);
    });
    this.loading = true;
    this.LoadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.LoadingService.loadingMsj$.subscribe((msg) => {
      this.textSpinner = msg;
    });
    this.service.fechRol$.subscribe((find) => {
      if (find) {
        this.fetchRoles();
      } else {
        if (this.dataSource.getData().length === 0) {
          this.fetchRoles();
        }
      }
    });
    this.textSpinner = 'Cargando Información de Roles';
  }
  fetchRoles() {
    this.LoadingService.setLoading(true, `Consultando Roles`);
    this.service.search('', []).subscribe({
      next: (data) => {
        this.dataRol = data;
        this.dataSource.init(this.dataRol);
        this.service.setdataRol(this.dataRol);
        this.LoadingService.setLoading(false, ``);
      },
      error: (error) => {
        this.LoadingService.setLoading(false, ``);
      },
    });
  }
  openDialog(create: boolean, rol: rolAdminModel | null) {
    const dialogRef = this.dialog.open(DialogAdminRolComponent, {
      width: '400px', // Ancho del dialog
      height: '300px', // Alto del dialog
      maxWidth: '90vw', // Máximo ancho en relación al viewport
      maxHeight: '90vh', // Máximo alto en relación al viewport
      data: {
        action: create,
        dataRol: rol,
      },
    });
  }

  deleteRol(id: string) {
    // this.LoadingService.setLoading(true, `Eliminando usuario`);
    // this.service.delete(id).subscribe({
    //   next: (data) => {
    //     this.LoadingService.setLoading(false, ``);
    //     this.service.setFetchUsers(true);
    //   },
    //   error: (error) => {
    //     this.LoadingService.setLoading(false, ``);
    //   },
    // });
  }
}
