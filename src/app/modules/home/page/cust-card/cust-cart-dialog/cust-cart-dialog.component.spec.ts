import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustCartDialogComponent } from './cust-cart-dialog.component';

describe('CustCartDialogComponent', () => {
  let component: CustCartDialogComponent;
  let fixture: ComponentFixture<CustCartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustCartDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
