import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PAGINATOR_SIZE } from 'src/app/core/constants/css';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { ProductService } from 'src/app/core/service/product.service';
import { CustService } from 'src/app/core/service/cust.service';
import { CUST_ORDER_STATUS } from 'src/app/core/constants/customer';
import { CustOrders } from 'src/app/data/schema/cust/cust-orders';

@Component({
  selector: 'app-cust-orders-hist',
  templateUrl: './cust-orders-hist.component.html',
  styleUrls: ['./cust-orders-hist.component.css']
})
export class CustOrdersHistComponent implements OnInit {

  displayedColumns: string[] = [
    'custOrderDate',
    'custOrderId',
    'orderStatus',
    'custUserId',
    'productName',
    'quantity',
    'productPrice',
    'totalPrice',
    'updatedUserId',
    'updatedTime'
  ];
  dataSource: any;

  custOrderDate: Date;
  custUserId: string;
  orderStatusSelected: number;
  productSelected: string;
  statusList: any;
  productList: any;

  selection = new SelectionModel<CustOrders>(true, []);

  constructor(private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productSevice: ProductService,
    private custService: CustService) {
    this.statusList = CUST_ORDER_STATUS;
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.search();
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

  search() {
    const payload = {
      custOrderDate: this.custOrderDate,
      custUserId: this.custUserId,
      productId: this.productSelected,
      orderStatus: this.getStatus(this.orderStatusSelected).data
    }

    this.custService.getHistCustOrders(payload).subscribe(response => {
      if (response.resultCode == 0) {
        this.dataSource = new MatTableDataSource(response.data);
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

}
