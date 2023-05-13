import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustOrdersDialogComponent } from './cust-orders-dialog.component';

describe('CustOrdersDialogComponent', () => {
  let component: CustOrdersDialogComponent;
  let fixture: ComponentFixture<CustOrdersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustOrdersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustOrdersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
