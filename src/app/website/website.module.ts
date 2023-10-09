import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { UserAdminComponent } from './modules/users/pages/user-admin/user-admin.component';



@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent,
    DashboardComponent,
    UserAdminComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WebsiteModule { }
