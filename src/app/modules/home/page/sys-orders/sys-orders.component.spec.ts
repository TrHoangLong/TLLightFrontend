import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysOrdersComponent } from './sys-orders.component';

describe('SysOrdersComponent', () => {
  let component: SysOrdersComponent;
  let fixture: ComponentFixture<SysOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
