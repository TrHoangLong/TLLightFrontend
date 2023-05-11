import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysOrdersHistComponent } from './sys-orders-hist.component';

describe('SysOrdersHistComponent', () => {
  let component: SysOrdersHistComponent;
  let fixture: ComponentFixture<SysOrdersHistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysOrdersHistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysOrdersHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
