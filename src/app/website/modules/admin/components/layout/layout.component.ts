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
} from '@fortawesome/free-solid-svg-icons';

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
  ],
})
export class LayoutComponent {
  faBars = faBars;
  faUserGear = faUserGear;
  faChartLine = faChartLine;
  faUsersGear = faUsersGear;
  faUsersLine = faUsersLine;
  faRightFromBracket = faRightFromBracket;
  collapsedSidebar = false;

  toggleCollapsedBar() {
    console.log('aca');
    this.collapsedSidebar = !this.collapsedSidebar;
    console.log(this.collapsedSidebar);
  }
}
