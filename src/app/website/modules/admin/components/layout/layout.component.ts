import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrls: ['./layout.component.sass'],
  imports: [RouterLink, RouterOutlet],
})
export class LayoutComponent {}
