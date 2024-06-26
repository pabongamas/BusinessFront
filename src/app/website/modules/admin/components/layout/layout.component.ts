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
  faAngleDown, faUserTie, faShop, faList, faLayerGroup,faUsers,faListCheck,faBoxesStacked,faDollarSign,faHandHoldingDollar
} from '@fortawesome/free-solid-svg-icons';
import {
  CdkAccordion,
  CdkAccordionItem,
  CdkAccordionModule,
} from '@angular/cdk/accordion';
import { TokenService } from '../../../../services/token/token.service';
import { BusinessService } from 'src/app/website/services/admin/business/business.service';
import { LoadingService } from 'src/app/website/services/loading.service';
import { businessAdminModel } from '../../../business/models/businessAdmin.model';
import { Swal, SuccessErrorToast, objByDefaultAlertSwal, fireActionSwal } from 'src/app/website/utils/ActionToastAlert';
import { HttpStatusCode } from '@angular/common/http';


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
  faUsers=faUsers;
  faListCheck=faListCheck;
  faBoxesStacked=faBoxesStacked;
  faDollarSign=faDollarSign;
  faHandHoldingDollar=faHandHoldingDollar;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faRightFromBracket = faRightFromBracket;
  faList = faList;
  faLayerGroup = faLayerGroup;
  collapsedSidebar = false;
  menuAdminOpen = false;
  userRoles: number[] = [];
  userId: string = "";
  dataBusinessUser: businessAdminModel[] | null = null;

  constructor(private router: Router,
    private tokenService: TokenService,
    private businessService: BusinessService,
    private LoadingService: LoadingService) {
    this.currentPath = this.router.url;
  }
  ngOnInit(): void {
    const token = this.tokenService.getToken();
    this.userRoles = this.tokenService.getUserRoles();
    this.userId = this.tokenService.getUserId();
    const adminAccordion: HTMLElement = document.getElementById(
      'adminAccordion'
    ) as HTMLElement;
    if (this.routesAdmin.includes(this.currentPath)) {
      if (adminAccordion !== null) {
        adminAccordion.click();
      }
      this.menuAdminOpen = true;
    }
    if (this.userId !== "") {
      this.businessService.businessByUser(this.userId).subscribe({
        next: (data) => {
          if (data.length > 0) {
            this.dataBusinessUser = data;
          }
        },
        error: (er) => {
          this.handleErrorToast(er);
        }
      }
      )
    }
  }
  toggleCollapsedBar() {
    this.collapsedSidebar = !this.collapsedSidebar;
  }
  isAdmin(): boolean {
    // Verificar si el usuario tiene el rol con ID 2 (por ejemplo, el ID del rol de 'Admin')
    return this.tokenService.hasRole(2);
  }
  isSuperUser(): boolean {
    // Verificar si el usuario tiene el rol con ID 1 (por ejemplo, el ID del rol de 'SuperUser')
    return this.tokenService.hasRole(1);
  }
  isCustomer(): boolean {
    // Verificar si el usuario tiene el rol con ID 3 (por ejemplo, el ID del rol de 'Customer')
    return this.tokenService.hasRole(3);
  }
  handleErrorToast(error: any) {
    if (HttpStatusCode.Unauthorized === error.status) {
      this.LoadingService.setLoading(false, ``);
      SuccessErrorToast(error.error, "error");
    } else if (error.status === 0) {
      SuccessErrorToast("Ha ocurrido un error en la conexion con el servidor", "error");
    }
  }
}
