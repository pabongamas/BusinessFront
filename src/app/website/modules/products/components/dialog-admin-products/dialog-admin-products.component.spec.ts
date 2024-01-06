import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdminProductsComponent } from './dialog-admin-products.component';

describe('DialogAdminProductsComponent', () => {
  let component: DialogAdminProductsComponent;
  let fixture: ComponentFixture<DialogAdminProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAdminProductsComponent]
    });
    fixture = TestBed.createComponent(DialogAdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
