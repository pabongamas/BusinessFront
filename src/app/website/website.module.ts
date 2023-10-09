import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';



@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WebsiteModule { }
