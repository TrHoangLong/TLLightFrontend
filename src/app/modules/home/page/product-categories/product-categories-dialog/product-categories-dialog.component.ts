import { Component, OnInit, Inject } from '@angular/core';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { SYS_USER_STATUS } from 'src/app/core/constants/sys-user';
import { ProductService } from 'src/app/core/service/product.service';
import { ProductCategories } from 'src/app/data/schema/product/product-categories';
import { ProductCategoriesComponent } from '../product-categories.component';
@Component({
  selector: 'app-product-categories-dialog',
  templateUrl: './product-categories-dialog.component.html',
  styleUrls: ['./product-categories-dialog.component.css']
})
export class ProductCategoriesDialogComponent implements OnInit {

  ACTION_ADD: string = 'add';
  ACTION_UPDATE: string = 'update';
  action: string;

  status: number;
  categoryName: string;
  categoryId: string;

  statusList: any;

  title = null;
  titleYes = null;
  message = null;

  constructor(public dialogRef: MatDialogRef<ProductCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productService: ProductService) {
    this.action = data.action;
    this.statusList = SYS_USER_STATUS;

    if (this.action === this.ACTION_ADD) {
      this.title = 'Thêm Loại Sản Phẩm';
      this.titleYes = 'Thêm';
    } else if (this.action === this.ACTION_UPDATE) {
      this.title = 'Sửa Loại Sản Phẩm';
      this.titleYes = 'Sửa';
    }

    if (this.action === this.ACTION_UPDATE) {
      this.status = this.getStatus(data.data.status).value;
      this.categoryId = data.data.categoryId;
      this.categoryName = data.data.categoryName;
    }
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    if (this.action === this.ACTION_ADD) {
      const payload = {
        status: this.getStatus(this.status).data,
        categoryName: this.categoryName,
        categoryId: this.categoryId
      }

      this.productService.insertCategories(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Thêm thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    } else if (this.action === this.ACTION_UPDATE) {
      const payload = {
        status: this.getStatus(this.status).data,
        categoryName: this.categoryName,
        categoryId: this.categoryId
      }

      this.productService.updateCategories(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Sửa thành công');
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
