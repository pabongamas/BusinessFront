import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
})
export class AuthComponent {

}
