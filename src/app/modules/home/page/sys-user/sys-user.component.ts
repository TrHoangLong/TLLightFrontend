import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PAGINATOR_SIZE } from 'src/app/core/constants/css';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { SysService } from 'src/app/core/service/sys.service';
import { SysUser } from 'src/app/data/schema/sys/sys-user';
import { SYS_USER_STATUS, SYS_USER_GENDER } from 'src/app/core/constants/sys-user';
import { SysUserDialogComponent } from './sys-user-dialog/sys-user-dialog.component';

@Component({
  selector: 'app-sys-user',
  templateUrl: './sys-user.component.html',
  styleUrls: ['./sys-user.component.css']
})
export class SysUserComponent implements OnInit {

  displayedColumns: string[] = ['action', 'sysUserId', 'userName', 'gender', 'mobileNo', 'email', 'address', 'status', 'remarks'];
  dataSource: MatTableDataSource<SysUser>;

  paginatorSize: number[] = PAGINATOR_SIZE;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  statusSelected: number;
  statusList: any;
  genderList: any;

  constructor(private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private sysService: SysService) {
    this.statusList = SYS_USER_STATUS;
    this.genderList = SYS_USER_GENDER;
  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    const payload = {
      status: this.getStatus(this.statusSelected).data
    }

    this.sysService.getSysUser(payload).subscribe(response => {
      if (response.resultCode == 0) {
        this.dataSource = new MatTableDataSource(response.data)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  insert() {
    const dialogRef = this.dialog.open(SysUserDialogComponent, {
      height: '500px',
      width: '500px',
      data: {
        action: 'add'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  delete(row: any) {
    const dialogRef = this.dialog.open(SysUserDialogComponent, {
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
