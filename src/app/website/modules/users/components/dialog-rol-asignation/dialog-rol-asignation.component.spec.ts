import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRolAsignationComponent } from './dialog-rol-asignation.component';

describe('DialogRolAsignationComponent', () => {
  let component: DialogRolAsignationComponent;
  let fixture: ComponentFixture<DialogRolAsignationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogRolAsignationComponent]
    });
    fixture = TestBed.createComponent(DialogRolAsignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
