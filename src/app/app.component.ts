import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.sass'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'BusinessFront';
}
