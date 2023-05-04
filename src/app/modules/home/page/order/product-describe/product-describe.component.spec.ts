import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDescribeComponent } from './product-describe.component';

describe('ProductDescribeComponent', () => {
  let component: ProductDescribeComponent;
  let fixture: ComponentFixture<ProductDescribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDescribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDescribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
