import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysUserDialogComponent } from './sys-user-dialog.component';

describe('SysUserDialogComponent', () => {
  let component: SysUserDialogComponent;
  let fixture: ComponentFixture<SysUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
