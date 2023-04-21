import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoriesDialogComponent } from './product-categories-dialog.component';

describe('ProductCategoriesDialogComponent', () => {
  let component: ProductCategoriesDialogComponent;
  let fixture: ComponentFixture<ProductCategoriesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoriesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
