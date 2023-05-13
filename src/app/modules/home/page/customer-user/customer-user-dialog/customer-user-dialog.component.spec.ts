import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUserDialogComponent } from './customer-user-dialog.component';

describe('CustomerUserDialogComponent', () => {
  let component: CustomerUserDialogComponent;
  let fixture: ComponentFixture<CustomerUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
