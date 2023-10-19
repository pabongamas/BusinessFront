import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdminUserComponent } from './dialog-admin-user.component';

describe('DialogAdminUserComponent', () => {
  let component: DialogAdminUserComponent;
  let fixture: ComponentFixture<DialogAdminUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAdminUserComponent]
    });
    fixture = TestBed.createComponent(DialogAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
