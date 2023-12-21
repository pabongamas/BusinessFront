import { Component, OnInit } from '@angular/core';
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
  faAngleDown,faUserTie,faShop,faList,faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import {
  CdkAccordion,
  CdkAccordionItem,
  CdkAccordionModule,
} from '@angular/cdk/accordion';

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
export class LayoutComponent implements OnInit {
  currentPath: string = '';
  routesAdmin = ['/admin/rols', '/admin/users','/admin/business'];
  faBars = faBars;
  faShop=faShop;
  faUserGear = faUserGear;
  faUserTie=faUserTie;
  faChartLine = faChartLine;
  faUsersGear = faUsersGear;
  faUsersLine = faUsersLine;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faRightFromBracket = faRightFromBracket;
  faList=faList;
  faLayerGroup=faLayerGroup;
  collapsedSidebar = false;
  menuAdminOpen = false;
  constructor(private router: Router) {
    this.currentPath = this.router.url;
  }
  ngOnInit(): void {
    const adminAccordion: HTMLElement = document.getElementById(
      'adminAccordion'
    ) as HTMLElement;
    if (this.routesAdmin.includes(this.currentPath)) {
      adminAccordion.click();
      this.menuAdminOpen = true;
    }
  }
  toggleCollapsedBar() {
    this.collapsedSidebar = !this.collapsedSidebar;
  }
}
