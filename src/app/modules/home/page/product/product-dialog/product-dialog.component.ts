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
import { Product } from 'src/app/data/schema/product/product';
import { ProductComponent } from '../product.component';
import { ProductZoomImageComponent } from './product-zoom-image/product-zoom-image.component';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  ACTION_ADD: string = 'add';
  ACTION_UPDATE: string = 'update';
  action: string;

  productId: string;
  categoryId: string;
  productName: string;
  productPrice: number;
  wattage: string;
  material: string;
  battery: string;
  batterySize: string;
  lightingTime: string;
  chargingTime: string;
  quantity: number;
  status: number;

  categoryList: any;
  statusList: any;

  title = null;
  titleYes = null;
  message = null;

  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr1 = 'Ảnh sản phẩm';
  previews1: string = 'assets/images/no_picture.jpeg';
  previews1check: boolean = false;

  constructor(public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productSevice: ProductService) {
    this.action = data.action;
    this.statusList = SYS_USER_STATUS;

    if (this.action === this.ACTION_ADD) {
      this.title = 'Thêm sản phẩm';
      this.titleYes = 'Thêm';
    } else if (this.action === this.ACTION_UPDATE) {
      this.title = 'Sửa thông tin sản phẩm';
      this.titleYes = 'Sửa';
    }


    if (this.action !== this.ACTION_ADD) {
      const payload = {
        productId: data.data.productId,
        categoryId: data.data.categoryId,
        status: this.getStatus(data.data.status).data
      }
      this.productSevice.reloadProduct(payload).subscribe(response => {
        this.productId = response.data.productId;
        this.categoryId = response.data.categoryId;
        this.productName = response.data.productName;
        this.productPrice = response.data.productPrice;
        this.wattage = response.data.wattage;
        this.material = response.data.material;
        this.battery = response.data.battery;
        this.batterySize = response.data.batterySize;
        this.lightingTime = response.data.lightingTime;
        this.chargingTime = response.data.chargingTime;
        this.quantity = response.data.quantity;
        this.status = this.getStatus(response.data.status).value;
        this.previews1 = response.data.linkProductImage;
      });
    }
  }

  ngOnInit(): void {
    this.getAllCategory();
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

  openImageZoom(previews) {
    this.dialog.open(ProductZoomImageComponent, {
      data: previews
    });
  }

  openChooseFile(path) {
    document.getElementById(path).click();
  }

  imageProduct: File;

  uploadFile(imgFile: any) {
    this.previews1check = true;
    this.imageProduct = imgFile.target.files.item(0);
    if (imgFile.target.files && imgFile.target.files[0]) {
      // HTML5 FileReader API
      let reader1 = new FileReader();
      reader1.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.previews1 = e.target.result;
        };
      };
      reader1.readAsDataURL(imgFile.target.files[0]);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {

    const formData = new FormData();
    if (this.imageProduct) {
      formData.append("imageProduct", this.imageProduct);
    }

    const product = {
      productId: this.productId,
      categoryId: this.categoryId,
      productName: this.productName,
      productPrice: this.productPrice,
      wattage: this.wattage,
      material: this.material,
      battery: this.battery,
      batterySize: this.batterySize,
      lightingTime: this.lightingTime,
      chargingTime: this.chargingTime,
      quantity: this.quantity,
      status: this.getStatus(this.status).data
    }

    formData.append("info", JSON.stringify(product));

    if (this.action === this.ACTION_ADD) {
      this.productSevice.insertProduct(formData).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close(true);
          this.utilsService.processResponseError(response, 'Thêm thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    }

    if (this.action === this.ACTION_UPDATE) {
      this.productSevice.updateProduct(formData).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close(true);
          this.utilsService.processResponseError(response, 'Sửa thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    }
  }

}
