import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysOrdersDialogComponent } from './sys-orders-dialog.component';

describe('SysOrdersDialogComponent', () => {
  let component: SysOrdersDialogComponent;
  let fixture: ComponentFixture<SysOrdersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysOrdersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysOrdersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
