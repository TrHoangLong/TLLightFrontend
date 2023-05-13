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
import { CustOrdersDialogComponent } from './cust-orders-dialog/cust-orders-dialog.component';

@Component({
  selector: 'app-cust-orders',
  templateUrl: './cust-orders.component.html',
  styleUrls: ['./cust-orders.component.css']
})
export class CustOrdersComponent implements OnInit {

  displayedColumns: string[] = [
    'check',
    'action',
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

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const temp = this.dataSource.data.filter(row => {
      return row.orderStatus !== 9 || row.orderStatus !== 8 || row.orderStatus !== 3;
    });
    let numRows = 0;
    if (temp === undefined) {
      return false; 
    } else {
      numRows = temp.length;
    }

    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => {
      if (row.orderStatus !== 9 || row.orderStatus !== 8 || row.orderStatus !== 3) {
        this.selection.select(row);
      }
    });
  }

  onChangeSelected(element): void {
    this.selection.toggle(element);
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
      custUserId: this.custUserId,
      productId: this.productSelected,
      orderStatus: this.getStatus(this.orderStatusSelected).data
    }

    this.custService.getCustOrders(payload).subscribe(response => {
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

  updateStatus() {
    const row = this.selection.selected;
    const dialogRef = this.dialog.open(CustOrdersDialogComponent, {
      width: '400px',
      data: {
        action: 'updateStatus',
        data: row
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  cancel(row: any) {
    const dialogRef = this.dialog.open(CustOrdersDialogComponent, {
      width: '400px',
      data: {
        action: 'cancel',
        data: row
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  confirmCancel(row: any) {
    const dialogRef = this.dialog.open(CustOrdersDialogComponent, {
      width: '400px',
      data: {
        action: 'confirmCancel',
        data: row
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

}
