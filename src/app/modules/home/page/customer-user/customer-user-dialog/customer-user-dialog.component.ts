import { Component, OnInit, Inject } from '@angular/core';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { CustService } from 'src/app/core/service/cust.service';
import { CUST_USER_STATUS, CUST_USER_GENDER } from 'src/app/core/constants/customer';
import { CustomerUserComponent } from '../customer-user.component';


@Component({
  selector: 'app-customer-user-dialog',
  templateUrl: './customer-user-dialog.component.html',
  styleUrls: ['./customer-user-dialog.component.css']
})
export class CustomerUserDialogComponent implements OnInit {

  ACTION_INSERT: string = 'insert';
  ACTION_UPDATE: string = 'update';
  ACTION_DELETE: string = 'delete';
  action: string;

  genderList: any;
  userList: any;
  statusList: any;

  title = null;
  titleYes = null;
  message = null;

  custName: string;
  mobileNo: string;
  gender: number;
  birthday: Date;
  email: string;
  password: string;
  address: string;
  remarks: string;
  custUserId: string;
  status: number;

  constructor(public dialogRef: MatDialogRef<CustomerUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private custService: CustService) {
    this.action = data.action;
    this.statusList = CUST_USER_STATUS;
    this.genderList = CUST_USER_GENDER;

    if (this.action === this.ACTION_INSERT) {
      this.title = 'Thêm Tài khoản';
      this.titleYes = 'Thêm';
    } else if (this.action === this.ACTION_UPDATE) {
      this.title = 'Sửa Thông Tin Tài khoản';
      this.titleYes = 'Sửa';
    } else if (this.action === this.ACTION_DELETE) {
      this.title = 'Đóng Tài khoản';
      this.titleYes = 'Đóng TK';
      this.message = 'Đóng tài khoản?'
    }

    if (this.action !== this.ACTION_INSERT) {
      this.custName = data.data.custName;
      this.gender = this.getGender(data.data.gender).value;
      this.birthday = data.data.birthday;
      this.mobileNo = data.data.mobileNo;
      this.email = data.data.email;
      this.address = data.data.address;
      this.remarks = data.data.remarks;
      this.custUserId = data.data.custUserId;
      this.status = this.getStatus(data.data.status).value;
    }
  }

  ngOnInit(): void {
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

  getGender(gender: any): any {
    if (this.genderList == undefined) {
      return '';
    }
    if (typeof gender === 'string') {
      for (const data of this.genderList) {
        if (data.value === gender) {
          return data;
        }
      }
    } else {
      for (const data of this.genderList) {
        if (data.data === gender) {
          return data;
        }
      }
    }
    return '';
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    if (this.action === this.ACTION_INSERT) {
      const payload = {
        custName: this.custName,
        mobileNo: this.mobileNo,
        gender: this.getGender(this.gender).data,
        birthday: this.birthday,
        email: this.email,
        password: this.password,
        address: this.address,
        remarks: this.remarks
      }

      this.custService.insertCustUser(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Thêm thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    } else if (this.action === this.ACTION_UPDATE) {
      const payload = {
        custName: this.custName,
        mobileNo: this.mobileNo,
        gender: this.getGender(this.gender).data,
        birthday: this.birthday,
        email: this.email,
        address: this.address,
        remarks: this.remarks,
        custUserId: this.custUserId
      }

      this.custService.updateCustUser(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Sửa thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    } else if (this.action === this.ACTION_DELETE) {
      const payload = {
        custUserId: this.custUserId
      }

      this.custService.deleteCustUser(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Đóng tài khoản thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    }
  }

}
