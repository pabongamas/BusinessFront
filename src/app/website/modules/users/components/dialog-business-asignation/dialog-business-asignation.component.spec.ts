import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBusinessAsignationComponent } from './dialog-business-asignation.component';

describe('DialogBusinessAsignationComponent', () => {
  let component: DialogBusinessAsignationComponent;
  let fixture: ComponentFixture<DialogBusinessAsignationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogBusinessAsignationComponent]
    });
    fixture = TestBed.createComponent(DialogBusinessAsignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
