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
import { CUST_CART_STATUS } from 'src/app/core/constants/customer';
import { CustCartDialogComponent } from './cust-cart-dialog/cust-cart-dialog.component';

@Component({
  selector: 'app-cust-card',
  templateUrl: './cust-card.component.html',
  styleUrls: ['./cust-card.component.css']
})
export class CustCardComponent implements OnInit {

  displayedColumns: string[] = [
    'custCartId',
    'custUserId',
    'productName',
    'quantity',
    'productPrice',
    'totalCart',
    'status'
  ];
  dataSource: any;

  custUserId: string;
  statusSelected: number;
  statusList: any;

  constructor(private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private custService: CustService) {
    this.statusList = CUST_CART_STATUS;
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

  search() {
    const payload = {
      custUserId: this.custUserId,
      status: this.getStatus(this.statusSelected).data
    }

    this.custService.getCustCart(payload).subscribe(response => {
      if (response.resultCode == 0) {
        this.dataSource = new MatTableDataSource(response.data);
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

}
