import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRealEstatesComponent } from './admin-real-estates.component';

describe('AdminRealEstatesComponent', () => {
  let component: AdminRealEstatesComponent;
  let fixture: ComponentFixture<AdminRealEstatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRealEstatesComponent]
    });
    fixture = TestBed.createComponent(AdminRealEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
