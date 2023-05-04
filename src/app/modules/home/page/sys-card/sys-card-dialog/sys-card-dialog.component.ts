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
import { SysCart } from 'src/app/data/schema/sys/sys-cart';
import { SYS_CART_STATUS } from 'src/app/core/constants/sysCart';
import { SysCardComponent } from '../sys-card.component';

@Component({
  selector: 'app-sys-card-dialog',
  templateUrl: './sys-card-dialog.component.html',
  styleUrls: ['./sys-card-dialog.component.css']
})
export class SysCardDialogComponent implements OnInit {

  ACTION_ORDER = 'order';
  ACTION_UPDATE = 'update';
  ACTION_DELETE = 'delete';
  action: string;

  sysCartID: number;
  sysUserId: string;
  productId: string;
  quantity: number;
  productPrice: number;
  custName: string;
  mobileNo: string;
  address: string;
  productName: string;

  statusList: any;
  productList: any;
  cartList: any;

  title = null;
  titleYes = null;
  message = null;

  constructor(public dialogRef: MatDialogRef<SysCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productSevice: ProductService,
    private sysService: SysService) {
    this.action = data.action;
    this.statusList = SYS_CART_STATUS;

    if (this.action === this.ACTION_ORDER) {
      this.title = 'Đặt hàng';
      this.titleYes = 'Đặt hàng';
    } else if (this.action === this.ACTION_UPDATE) {
      this.title = 'Sửa thông tin giỏ hàng';
      this.titleYes = 'Sửa';
    } else if (this.action === this.ACTION_DELETE) {
      this.title = 'Xóa sản phẩm';
      this.titleYes = 'xóa';
      this.message = 'Bạn đồng ý xóa sản phẩm khỏi giỏ hàng?';
    }

    if (this.action === this.ACTION_ORDER) {
      this.cartList = data.data;
    } else if (this.action === this.ACTION_UPDATE) {
      this.sysCartID = data.data.sysCartID;
      this.productId = data.data.productId;
      this.quantity = data.data.quantity;
      this.productPrice = data.data.productPrice;
      this.productName = data.data.productName;
    } else if (this.action === this.ACTION_DELETE) {
      this.cartList = data.data;
    }
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    if (this.action === this.ACTION_ORDER) {
      const payload = [];
      this.cartList.forEach(response => {
        payload.push({
          sysCartID: response.sysCartID,
          productId: response.productId,
          quantity: response.quantity,
          productPrice: response.productPrice,
          custName: this.custName,
          mobileNo: this.mobileNo,
          address: this.address
        });
      });
      
      this.sysService.orderCart(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Đặt hàng thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });

    } else if (this.action === this.ACTION_UPDATE) {
      const payload = {
        sysCartID: this.sysCartID,
        productId: this.productId,
        quantity: this.quantity,
        productPrice: this.productPrice,
      }

      this.sysService.updateCart(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Sửa thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });

    } else if (this.action === this.ACTION_DELETE) {
      const payload = []
      this.cartList.forEach(response => {
        payload.push({ sysCartID: response.sysCartID })
      });

      this.sysService.deleteCart(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Xóa thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });

    }
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
