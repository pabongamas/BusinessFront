import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { UserAdminComponent } from './modules/users/pages/user-admin/user-admin.component';
import { DialogAdminUserComponent } from './modules/users/components/dialog-admin-user/dialog-admin-user.component';



@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent,
    DashboardComponent,
    UserAdminComponent,
    DialogAdminUserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WebsiteModule { }
