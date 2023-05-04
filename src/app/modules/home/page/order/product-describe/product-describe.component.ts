import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/share/service/utils.service';
import { RoleService } from 'src/app/share/service/role.service';
import { SysService } from 'src/app/core/service/sys.service';
import { OrderComponent } from '../order.component';

@Component({
  selector: 'app-product-describe',
  templateUrl: './product-describe.component.html',
  styleUrls: ['./product-describe.component.css']
})
export class ProductDescribeComponent implements OnInit {

  ACTION_DETAIL: string = 'detail';
  ACTION_ADD_CART: string = 'addCart';
  ACTION_ORDER: string = 'order';

  action: string;

  description: string;
  product: any;

  productId: number;
  productPrice: number;
  productName: string;
  quantity: number;
  custName: string;
  mobileNo: string;
  address: string;

  title = null;
  titleYes = null;
  message = null;

  constructor(public dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private sysService: SysService) {
    this.action = data.action;

    if (this.action === this.ACTION_DETAIL) {
      this.title = 'Thông số sản phẩm';
    } else if (this.action === this.ACTION_ADD_CART) {
      this.title = 'Thêm giỏ hàng';
      this.titleYes = 'Thêm';
    } else if (this.action === this.ACTION_ORDER) {
      this.title = 'Đặt hàng';
      this.titleYes = 'Đặt hàng';
    }

    if (this.action === this.ACTION_DETAIL) {
      this.description = data.data;
    } else if (this.action !== this.ACTION_DETAIL) {
      this.productId = data.data.productId;
      this.productPrice = data.data.productPrice;
      this.productName = data.data.productName;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    if (this.action === this.ACTION_ADD_CART) {
      const payload = {
        productId: this.productId,
        productPrice: this.productPrice,
        quantity: this.quantity
      }

      this.sysService.addCart(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close(true);
          this.utilsService.processResponseError(response, 'Thêm thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    } else if (this.action === this.ACTION_ORDER) {
      const payload = {
        productId: this.productId,
        productPrice: this.productPrice,
        quantity: this.quantity,
        custName: this.custName,
        mobileNo: this.mobileNo,
        address: this.address
      }

      this.sysService.orderSysOrder(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close(true);
          this.utilsService.processResponseError(response, 'Đặt hàng thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    }
  }

  ngOnInit(): void {
  }

  getDescription(description: string): any {
    let result = description.split(';')
    return result
  }

}
