import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdminCategoriesComponent } from './dialog-admin-categories.component';

describe('DialogAdminCategoriesComponent', () => {
  let component: DialogAdminCategoriesComponent;
  let fixture: ComponentFixture<DialogAdminCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAdminCategoriesComponent]
    });
    fixture = TestBed.createComponent(DialogAdminCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
