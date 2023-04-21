import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustCardComponent } from './cust-card.component';

describe('CustCardComponent', () => {
  let component: CustCardComponent;
  let fixture: ComponentFixture<CustCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
