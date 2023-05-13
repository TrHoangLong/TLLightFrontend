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
import { CustService } from 'src/app/core/service/cust.service';
import { CUST_USER_STATUS, CUST_USER_GENDER } from 'src/app/core/constants/customer';
import { CustomerUserDialogComponent } from './customer-user-dialog/customer-user-dialog.component';

@Component({
  selector: 'app-customer-user',
  templateUrl: './customer-user.component.html',
  styleUrls: ['./customer-user.component.css']
})
export class CustomerUserComponent implements OnInit {

  displayedColumns: string[] = [
    'action',
    'custUserId',
    'custName',
    'gender',
    'birthday',
    'mobileNo',
    'email',
    'address',
    'status',
    'remarks'
  ];
  dataSource: any;

  custUserId: string;
  statusSelected: number;
  statusList: any;
  genderList: any;

  constructor(private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private custService: CustService) {
    this.statusList = CUST_USER_STATUS;
    this.genderList = CUST_USER_GENDER;
  }

  ngOnInit(): void {
    this.search();
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

  search() {
    const payload = {
      custUserId: this.custUserId,
      status: this.getStatus(this.statusSelected).data
    }

    this.custService.getCustUser(payload).subscribe(response => {
      if (response.resultCode == 0) {
        this.dataSource = new MatTableDataSource(response.data);
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  insert() {
    const dialogRef = this.dialog.open(CustomerUserDialogComponent, {
      width: '1000px',
      data: {
        action: 'insert'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  update(row: any) {
    const dialogRef = this.dialog.open(CustomerUserDialogComponent, {
      width: '1000px',
      data: {
        action: 'update',
        data: row
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  delete(row: any) {
    const dialogRef = this.dialog.open(CustomerUserDialogComponent, {
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
