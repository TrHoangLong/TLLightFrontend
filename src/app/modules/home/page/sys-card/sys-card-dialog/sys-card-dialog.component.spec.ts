import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysCardDialogComponent } from './sys-card-dialog.component';

describe('SysCardDialogComponent', () => {
  let component: SysCardDialogComponent;
  let fixture: ComponentFixture<SysCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysCardDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
