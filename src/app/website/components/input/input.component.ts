import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { COLORS, Colors, COLORSNOACTION } from './../../models/colors.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone:true,
  styleUrls: ['./input.component.sass'],
  imports:[NgClass]
})
export class InputComponent {
  @Input() disabled = false;
  @Input() typeInput:string='';
  @Input() color: string = 'primary';
  @Input() classData: string = '';
  @Input() checked:boolean=false;
  @Input() colorNoAction = false;
  // faSpinner = faSpinner;

  mapColors = COLORS;
  mapColorsNoAction = COLORSNOACTION;

  constructor() {}

  get colors() {
    var colors = {};
    if (this.colorNoAction) {
      colors = this.mapColorsNoAction[this.color];
    } else {
      colors = this.mapColors[this.color];
    }
    if (colors) {
      return colors;
    }
    return {};
  }
}
