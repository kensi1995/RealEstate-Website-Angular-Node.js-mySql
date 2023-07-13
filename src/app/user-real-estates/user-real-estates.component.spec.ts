import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRealEstatesComponent } from './user-real-estates.component';

describe('UserRealEstatesComponent', () => {
  let component: UserRealEstatesComponent;
  let fixture: ComponentFixture<UserRealEstatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRealEstatesComponent]
    });
    fixture = TestBed.createComponent(UserRealEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
