import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { UserAdminComponent } from './modules/users/pages/user-admin/user-admin.component';
import { DialogAdminUserComponent } from './modules/users/components/dialog-admin-user/dialog-admin-user.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RolAdminComponent } from './modules/rols/pages/rol-admin/rol-admin.component';
import { DialogAdminRolComponent } from './modules/rols/components/dialog-admin-rol/dialog-admin-rol.component';
import { BusinessAdminComponent } from './modules/business/pages/business-admin/business-admin.component';
import { DialogAdminBusinessComponent } from './modules/business/components/dialog-admin-business/dialog-admin-business.component';
import { ButtonComponent } from './components/button/button.component';
import { DialogRolAsignationComponent } from './modules/users/components/dialog-rol-asignation/dialog-rol-asignation.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent,
    RolAdminComponent,
    DialogAdminRolComponent,
    BusinessAdminComponent,
    DialogAdminBusinessComponent,
    ButtonComponent,
    DialogRolAsignationComponent,
    CheckboxComponent,
    InputComponent,
    // SpinnerComponent
  ],
  imports: [CommonModule],
  exports: [],
})
export class WebsiteModule {}
