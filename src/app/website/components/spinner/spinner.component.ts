import { Component,Input } from '@angular/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  standalone:true,
  styleUrls: ['./spinner.component.sass'],
  imports:[NgIf]
})
export class SpinnerComponent {
  @Input() loading = false;
}
