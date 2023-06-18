import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { ProductService } from 'src/app/core/service/product.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

  offset = 0;
  limit = 8;

  totalRow: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productSevice: ProductService) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProduct(this.limit, this.limit * this.offset);
  }

  search(event: PageEvent) {
    if (event) { // next page
      this.limit = event.pageSize;
      this.offset = event.pageIndex;
    } else {
      this.limit = 8;
      this.offset = 0;
    }

    this.getAllProduct(this.limit, this.limit * this.offset)
  }

  getAllProduct(_limit: number, _offset: number) {
    const payload = {
      productId: this.productId,
      categoryId: this.categoryId,
      status: 1,
      offset: _offset,
      limit: _limit
    }
    this.productSevice.getProduct(payload).subscribe(response => {
      if (response.resultCode == 0) {
        this.productList = response.data;
        this.productListSearch = response.data;
        this.totalRow = response.data[0].totalRows;
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
    });
  }
}


