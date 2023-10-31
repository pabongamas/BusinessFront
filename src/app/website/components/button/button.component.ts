import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  COLORS,
  Colors,
  COLORSNOACTION,
  COLORS_FOR_BUTTONS,
} from './../../models/colors.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPenToSquare,
  faEraser,
  faUserPlus,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: true,
  styleUrls: ['./button.component.sass'],
  imports: [NgClass, FontAwesomeModule],
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button';
  @Input() color: string = 'primary';
  @Input() classData: string = '';
  @Input() colorNoAction = false;
  // faSpinner = faSpinner;

  mapColors = COLORS;
  mapColorsNoAction = COLORSNOACTION;
  mapColorsButtons = COLORS_FOR_BUTTONS;

  constructor() {}

  get colors() {
    var colors = {};
    if (this.colorNoAction) {
      colors = this.mapColorsNoAction[this.color];
    } else {
      colors = this.mapColorsButtons[this.color];
    }
    if (colors) {
      return colors;
    }
    return {};
  }
}
