import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faUserGear,
  faChartLine,
  faUsersGear,
  faUsersLine,
  faRightFromBracket,
  faAngleUp,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrls: ['./layout.component.sass'],
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    FontAwesomeModule,
    NgClass,
    CdkAccordionModule,
  ],
})
export class LayoutComponent {
  currentPath: string = '';
  routesAdmin = ['/admin/rols', '/admin/users'];
  faBars = faBars;
  faUserGear = faUserGear;
  faChartLine = faChartLine;
  faUsersGear = faUsersGear;
  faUsersLine = faUsersLine;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faRightFromBracket = faRightFromBracket;
  collapsedSidebar = false;
  menuAdminOpen = false;
  constructor(private router: Router) {
    this.currentPath = this.router.url;
    this.routesAdmin.includes(this.currentPath)
      ? (this.menuAdminOpen = true)
      : '';
    // if(this.routesAdmin.includes(this.currentPath)){

    // }
  }
  toggleCollapsedBar() {
    console.log('aca');
    this.collapsedSidebar = !this.collapsedSidebar;
    console.log(this.collapsedSidebar);
  }
}
