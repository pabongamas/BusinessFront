import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdminRolComponent } from './dialog-admin-rol.component';

describe('DialogAdminRolComponent', () => {
  let component: DialogAdminRolComponent;
  let fixture: ComponentFixture<DialogAdminRolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAdminRolComponent]
    });
    fixture = TestBed.createComponent(DialogAdminRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
