import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { UserAdminComponent } from './modules/users/pages/user-admin/user-admin.component';
import { DialogAdminUserComponent } from './modules/users/components/dialog-admin-user/dialog-admin-user.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RolAdminComponent } from './modules/rols/pages/rol-admin/rol-admin.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent,
    RolAdminComponent,
    // SpinnerComponent
  ],
  imports: [CommonModule],
  exports: [],
})
export class WebsiteModule {}
