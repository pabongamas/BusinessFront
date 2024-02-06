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
  faAngleDown, faUserTie, faShop, faList, faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import {
  CdkAccordion,
  CdkAccordionItem,
  CdkAccordionModule,
} from '@angular/cdk/accordion';
import { TokenService } from '../../../../services/token/token.service';



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
  routesAdmin = ['/admin/rols', '/admin/users', '/admin/business'];
  faBars = faBars;
  faShop = faShop;
  faUserGear = faUserGear;
  faUserTie = faUserTie;
  faChartLine = faChartLine;
  faUsersGear = faUsersGear;
  faUsersLine = faUsersLine;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faRightFromBracket = faRightFromBracket;
  faList = faList;
  faLayerGroup = faLayerGroup;
  collapsedSidebar = false;
  menuAdminOpen = false;
  userRoles:number[]=[];

  constructor(private router: Router,
    private tokenService: TokenService) {
    this.currentPath = this.router.url;
  }
  ngOnInit(): void {
    const token = this.tokenService.getToken();
    this.userRoles=this.tokenService.getUserRoles();
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
  isAdmin(): boolean {
    // Verificar si el usuario tiene el rol con ID 2 (por ejemplo, el ID del rol de 'Admin')
    return this.tokenService.hasRole(2);
  }
  isSuperUser():boolean{
     // Verificar si el usuario tiene el rol con ID 2 (por ejemplo, el ID del rol de 'SuperUser')
     return this.tokenService.hasRole(1);
  }
  isCustomer():boolean{
   // Verificar si el usuario tiene el rol con ID 2 (por ejemplo, el ID del rol de 'Customer')
   return this.tokenService.hasRole(3);
  }
}
