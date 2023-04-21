import { Component, OnInit, Inject } from '@angular/core';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { SysService } from 'src/app/core/service/sys.service';
import { SysUser } from 'src/app/data/schema/sys/sys-user';
import { SYS_USER_STATUS, SYS_USER_GENDER } from 'src/app/core/constants/sys-user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { SysUserComponent } from '../sys-user.component';

@Component({
  selector: 'app-sys-user-dialog',
  templateUrl: './sys-user-dialog.component.html',
  styleUrls: ['./sys-user-dialog.component.css']
})
export class SysUserDialogComponent implements OnInit {

  ACTION_ADD: string = 'add';
  ACTION_DELETE: string = 'delete';
  action: string;

  statusList: any;
  genderList: any;
  hide = true;

  sysUserId: string;
  userName: string;
  mobileNo: string;
  gender: number;
  birthday: Date;
  email: string;
  password: string;
  status: number;
  address: string;
  remarks: string;

  title = null;
  titleYes = null;
  message = null;

  constructor(public dialogRef: MatDialogRef<SysUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private sysService: SysService) {
    this.action = data.action;
    this.statusList = SYS_USER_STATUS;
    this.genderList = SYS_USER_GENDER;

    if (this.action === this.ACTION_ADD) {
      this.title = 'Thêm Tài khoản';
      this.titleYes = 'Thêm';
    } else if (this.action === this.ACTION_DELETE) {
      this.title = 'Đóng Tài khoản';
      this.titleYes = 'Đóng TK';
      this.message = 'Đóng tài khoản?'
    }
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
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

  getGender(status: any): any {
    if (this.genderList == undefined) {
      return '';
    }
    if (typeof status === 'string') {
      for (const data of this.genderList) {
        if (data.value === status) {
          return data;
        }
      }
    } else {
      for (const data of this.genderList) {
        if (data.data === status) {
          return data;
        }
      }
    }
    return '';
  }

  onYesClick() {
    if (this.action === this.ACTION_ADD) {
      const payload = {
        sysUserId: this.sysUserId,
        userName: this.userName,
        mobileNo: this.mobileNo,
        gender: this.getGender(this.gender).data,
        birthday: this.birthday,
        email: this.email,
        password: this.password,
        status: this.getStatus(this.status).data,
        address: this.address,
        remarks: this.remarks
      }

      this.sysService.insertSysUser(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Thêm thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    } else if (this.action === this.ACTION_DELETE) {
      const payload = {
        sysUserId: this.data.data.sysUserId
      }

      this.sysService.deleteSysUser(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Đóng thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    }

  }
}
