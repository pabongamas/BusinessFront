import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolAdminComponent } from './rol-admin.component';

describe('RolAdminComponent', () => {
  let component: RolAdminComponent;
  let fixture: ComponentFixture<RolAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolAdminComponent]
    });
    fixture = TestBed.createComponent(RolAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
