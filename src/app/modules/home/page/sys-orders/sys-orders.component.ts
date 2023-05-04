import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
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
import { SysService } from 'src/app/core/service/sys.service';
import { SysOrder } from 'src/app/data/schema/sys/sys-order';
import { SYS_ORDER_STATUS } from 'src/app/core/constants/sysOrder';
import { SysOrdersDialogComponent } from './sys-orders-dialog/sys-orders-dialog.component';

@Component({
  selector: 'app-sys-orders',
  templateUrl: './sys-orders.component.html',
  styleUrls: ['./sys-orders.component.css']
})
export class SysOrdersComponent implements OnInit {

  displayedColumns: string[] = [
    'check',
    'sysOrderDate',
    'sysOrderId',
    'sysUserId',
    'orderStatus',
    'custName',
    'mobileNo',
    'address',
    'productName',
    'quantity',
    'productPrice',
    'totalPrice',
    'updatedUserId',
    'updatedTime'
  ];
  dataSource: MatTableDataSource<SysOrder>;
  selection = new SelectionModel<SysOrder>(true, []);

  sysUserId: string;
  productId: string;
  status: number;

  statusList: any;
  productList: any;


  constructor(private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productSevice: ProductService,
    private sysService: SysService) {
    this.statusList = SYS_ORDER_STATUS;
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.search();
  }

  search() {
    const payload = {
      sysUserId: this.sysUserId,
      productId: this.productId,
      orderStatus: this.getStatus(this.status).data
    }

    this.sysService.getSysOrder(payload).subscribe(response => {
      if (response.resultCode == 0) {
        this.dataSource = new MatTableDataSource(response.data);
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const temp = this.dataSource.data.filter(row => {
      return row.orderStatus !== 9;
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
      if (row.orderStatus !== 9) {
        this.selection.select(row);
      }
    });
  }

  onChangeSelected(element): void {
    this.selection.toggle(element);
  }

  updateStatus() {
    const row = this.selection.selected;
    const dialogRef = this.dialog.open(SysOrdersDialogComponent, {
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

  cancel() {
    const row = this.selection.selected;
    const dialogRef = this.dialog.open(SysOrdersDialogComponent, {
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
