import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductZoomImageComponent } from './product-zoom-image.component';

describe('ProductZoomImageComponent', () => {
  let component: ProductZoomImageComponent;
  let fixture: ComponentFixture<ProductZoomImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductZoomImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductZoomImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
