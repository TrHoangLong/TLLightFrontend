import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysCardComponent } from './sys-card.component';

describe('SysCardComponent', () => {
  let component: SysCardComponent;
  let fixture: ComponentFixture<SysCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
