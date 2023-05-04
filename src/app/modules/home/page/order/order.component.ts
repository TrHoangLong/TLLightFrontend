import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/data/schema/product/product';
import { ProductZoomImageComponent } from '../product/product-dialog/product-zoom-image/product-zoom-image.component';
import { ProductDescribeComponent } from './product-describe/product-describe.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  productList: any;
  categoryList: any;

  productId: string;
  categoryId: string;
  productListSearch: any;

  previews1: string = 'assets/images/no_picture.jpeg';

  constructor(private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productSevice: ProductService) { }

  ngOnInit(): void {
    this.search();
    this.getAllCategory();
    this.getAllProduct();
  }

  search() {
    const payload = {
      productId: this.productId,
      categoryId: this.categoryId,
      status: 1
    }

    this.productSevice.getProduct(payload).subscribe(response => {
      if (response.resultCode == 0) {
        this.productListSearch = response.data;
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  getAllProduct() {
    const payload = {};

    this.productSevice.getProduct(payload).subscribe(response => {
      if (response.resultCode == 0) {
        this.productList = response.data;
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  getAllCategory() {
    const payload = {};

    this.productSevice.getCategories(payload).subscribe(response => {
      if (response.resultCode == 0) {
        this.categoryList = response.data;
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  openImageZoom(previews) {
    this.dialog.open(ProductZoomImageComponent, {
      data: previews
    });
  }

  descriptionDetail(description: any) {
    const dialogRef = this.dialog.open(ProductDescribeComponent, {
      width: '800px',
      data: {
        action: 'detail',
        data: description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  addCart(product: any) {
    const dialogRef = this.dialog.open(ProductDescribeComponent, {
      width: '800px',
      data: {
        action: 'addCart',
        data: product
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  order(product: any) {
    const dialogRef = this.dialog.open(ProductDescribeComponent, {
      width: '800px',
      data: {
        action: 'order',
        data: product
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }
}


