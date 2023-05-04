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
import { SysCart } from 'src/app/data/schema/sys/sys-cart';
import { SYS_CART_STATUS } from 'src/app/core/constants/sysCart';
import { SysCardDialogComponent } from './sys-card-dialog/sys-card-dialog.component';

@Component({
  selector: 'app-sys-card',
  templateUrl: './sys-card.component.html',
  styleUrls: ['./sys-card.component.css']
})
export class SysCardComponent implements OnInit {

  displayedColumns: string[] = [
    'check',
    'action',
    'sysCartID',
    'sysUserId',
    'productName',
    'quantity',
    'productPrice',
    'toalCart',
    'status'
  ];
  dataSource: MatTableDataSource<SysCart>;
  selection = new SelectionModel<SysCart>(true, []);

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
    this.statusList = SYS_CART_STATUS;
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.search();
  }

  search() {
    const payload = {
      sysUserId: this.sysUserId,
      productId: this.productId,
      status: this.getStatus(this.status).data
    }

    this.sysService.getCart(payload).subscribe(response => {
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
      return row.status !== 0;
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
      if (row.status !== 0) {
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

  order() {
    const row = this.selection.selected;
    const dialogRef = this.dialog.open(SysCardDialogComponent, {
      width: '800px',
      data: {
        action: 'order',
        data: row
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  update(row: any) {
    const dialogRef = this.dialog.open(SysCardDialogComponent, {
      width: '800px',
      data: {
        action: 'update',
        data: row
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  delete() {
    const row = this.selection.selected;
    const dialogRef = this.dialog.open(SysCardDialogComponent, {
      width: '500px',
      data: {
        action: 'delete',
        data: row
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

}
