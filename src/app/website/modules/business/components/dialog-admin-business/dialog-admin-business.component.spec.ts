import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdminBusinessComponent } from './dialog-admin-business.component';

describe('DialogAdminBusinessComponent', () => {
  let component: DialogAdminBusinessComponent;
  let fixture: ComponentFixture<DialogAdminBusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAdminBusinessComponent]
    });
    fixture = TestBed.createComponent(DialogAdminBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
