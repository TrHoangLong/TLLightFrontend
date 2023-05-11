import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustOrdersHistComponent } from './cust-orders-hist.component';

describe('CustOrdersHistComponent', () => {
  let component: CustOrdersHistComponent;
  let fixture: ComponentFixture<CustOrdersHistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustOrdersHistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustOrdersHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
