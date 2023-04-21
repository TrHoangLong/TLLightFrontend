import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustOrdersComponent } from './cust-orders.component';

describe('CustOrdersComponent', () => {
  let component: CustOrdersComponent;
  let fixture: ComponentFixture<CustOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
