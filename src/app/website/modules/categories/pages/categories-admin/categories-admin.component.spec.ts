import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesAdminComponent } from './categories-admin.component';

describe('CategoriesAdminComponent', () => {
  let component: CategoriesAdminComponent;
  let fixture: ComponentFixture<CategoriesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesAdminComponent]
    });
    fixture = TestBed.createComponent(CategoriesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
