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
import { CustService } from 'src/app/core/service/cust.service';
import { CustOrders } from 'src/app/data/schema/cust/cust-orders';
import { CUST_ORDER_STATUS } from 'src/app/core/constants/customer';
import { CustOrdersComponent } from '../cust-orders.component';

@Component({
  selector: 'app-cust-orders-dialog',
  templateUrl: './cust-orders-dialog.component.html',
  styleUrls: ['./cust-orders-dialog.component.css']
})
export class CustOrdersDialogComponent implements OnInit {

  ACTION_UPDATE_STATUS = 'updateStatus';
  ACTION_CANCEL = 'cancel';
  ACTION_CONFIRM_CANCEL = 'confirmCancel';
  action: string;

  statusList: any;
  productList: any;
  orderList: any;
  orderStatusList: any;

  custOrderDate: Date;
  custOrderId: number;
  orderStatus: number;

  title = null;
  titleYes = null;
  message = null;

  constructor(public dialogRef: MatDialogRef<CustOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productSevice: ProductService,
    private custService: CustService) {
    this.action = data.action;
    this.statusList = CUST_ORDER_STATUS;
    if (this.action === this.ACTION_UPDATE_STATUS) {
      this.orderList = data.data;
    } else {
      this.custOrderDate = data.data.custOrderDate;
      this.custOrderId = data.data.custOrderId;
    }

    if (this.action === this.ACTION_UPDATE_STATUS) {
      this.title = 'Câp nhật trạng thái đơn hàng';
      this.titleYes = 'Cập nhật';
    } else if (this.action === this.ACTION_CANCEL) {
      this.title = 'Yêu cầu hủy đơn hàng';
      this.titleYes = 'Hủy';
      this.message = 'Yêu cầu hủy đơn hàng? ';
    } else if (this.action === this.ACTION_CONFIRM_CANCEL) {
      this.title = 'Đồng ý hủy đơn hàng';
      this.titleYes = 'Hủy';
      this.message = 'Đồng ý hủy đơn hàng? ';
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
      if (this.orderList.size() === 0) {
        this.utilsService.processResponseError('', 'Chưa chọn đơn hàng nào để cập nhật');
      } else {
        this.orderList.forEach(response => {
          payload.push({
            custOrderDate: response.custOrderDate,
            custOrderId: response.custOrderId,
            orderStatus: this.orderStatus
          });
        });

        this.custService.updateStatusCustOrders(payload).subscribe(response => {
          if (response.resultCode === 0) {
            this.dialogRef.close();
            this.utilsService.processResponseError(response, 'Cập nhật trạng thái thành công');
          } else {
            this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
          }
        });
      }
    } else if (this.action === this.ACTION_CANCEL) {
      const payload = {
        custOrderDate: this.custOrderDate,
        custOrderId: this.custOrderId
      }

      this.custService.cancelCustOrders(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Yêu cầu hủy thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    } else if (this.action === this.ACTION_CONFIRM_CANCEL) {
      const payload = {
        custOrderDate: this.custOrderDate,
        custOrderId: this.custOrderId
      }

      this.custService.updateStatusCustOrders(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Đồng ý hủy thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    }
  }

}
