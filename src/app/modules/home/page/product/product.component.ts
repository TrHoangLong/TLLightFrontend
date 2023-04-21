import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SYS_USER_STATUS } from 'src/app/core/constants/sys-user';
import { PAGINATOR_SIZE } from 'src/app/core/constants/css';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/data/schema/product/product';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = [
    'action',
    'productId',
    'categoryName', 
    'productName', 
    'productPrice',
    'description',
    'quantity',
    'status', 
    'createdUserId', 
    'createdTime', 
    'updatedUserId', 
    'updatedTime'
  ];
  dataSource: MatTableDataSource<Product>;

  productId: string;
  categoryId: string;
  status: number;

  productList: any;
  categoryList: any;
  statusList: any;


  paginatorSize: number[] = PAGINATOR_SIZE;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productSevice: ProductService) {
    this.statusList = SYS_USER_STATUS;
  }

  ngOnInit(): void {
    this.search();
    this.getAllCategory();
    this.getAllProduct();
  }

  search() {
    const payload = {
      productId: this.productId,
      categoryId: this.categoryId,
      status: this.getStatus(this.status).data
    }

    this.productSevice.getProduct(payload).subscribe(response => {
      if (response.resultCode == 0) {
        this.dataSource = new MatTableDataSource(response.data);
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

  getStatus(status: any): any {
    if (this.statusList == undefined) {
      return '';
    }
    if (typeof status === 'string') {
      for (const data of this.statusList) {
        if (data.value === status) {
          return data;
        }
      }
    } else {
      for (const data of this.statusList) {
        if (data.data === status) {
          return data;
        }
      }
    }
    return '';
  }

  getDescription(description: string): any {
      let result = description.split(';')
      return result
  }

  insert() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '1000px',
      data: {
        action: 'add'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  update(row: any) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '1000px',
      data: {
        action: 'update',
        data: row
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

}
