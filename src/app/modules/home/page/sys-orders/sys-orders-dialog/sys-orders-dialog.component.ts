import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
import { SysOrdersComponent } from '../sys-orders.component';

@Component({
  selector: 'app-sys-orders-dialog',
  templateUrl: './sys-orders-dialog.component.html',
  styleUrls: ['./sys-orders-dialog.component.css']
})
export class SysOrdersDialogComponent implements OnInit {

  ACTION_UPDATE_STATUS = 'updateStatus';
  ACTION_CANCEL = 'cancel';
  action: string;

  statusList: any;
  productList: any;
  orderList: any;
  orderStatusList: any

  title = null;
  titleYes = null;
  message = null;

  sysOrderDate: Date;
  sysOrderId: number;
  orderStatus: number;

  constructor(public dialogRef: MatDialogRef<SysOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productSevice: ProductService,
    private sysService: SysService) {
    this.action = data.action;
    this.statusList = SYS_ORDER_STATUS;
    this.orderList = data.data;

    if (this.action === this.ACTION_UPDATE_STATUS) {
      this.title = 'Câp nhật trạng thái đơn hàng';
      this.titleYes = 'Cập nhật';
    } else if (this.action === this.ACTION_CANCEL) {
      this.title = 'Hủy đơn hàng';
      this.titleYes = 'Hủy';
      this.message = 'Bạn đồng ý hủy đơn hàng? ';
    }
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    if (this.action === this.ACTION_UPDATE_STATUS) {
      const payload = [];

      this.orderList.forEach(response => {
        payload.push({
          sysOrderDate: response.sysOrderDate,
          sysOrderId: response.sysOrderId,
          orderStatus: this.orderStatus
        });
      });

      this.sysService.updateStatusSysOrder(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Cập nhật trạng thái thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    } else if (this.action === this.ACTION_CANCEL) {
      const payload = [];

      this.orderList.forEach(response => {
        payload.push({
          sysOrderDate: response.sysOrderDate,
          sysOrderId: response.sysOrderId
        });
      });

      this.sysService.cancelSysOrder(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Hủy đơn hàng thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    }
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
