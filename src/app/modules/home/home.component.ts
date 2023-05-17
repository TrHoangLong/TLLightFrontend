import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { ProductService } from 'src/app/core/service/product.service';
import { SysService } from 'src/app/core/service/sys.service';
import { CustService } from 'src/app/core/service/cust.service';
import { CUST_USER_STATUS } from 'src/app/core/constants/customer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumnsCate: string[] = [
    'categoryName'
  ];
  dataSourceCate: any;

  displayedColumnsPro: string[] = [
    'productName',
    'productPrice',
    'quantity',
  ];
  dataSourcePro: any;

  displayedColumnsOrd: string[] = [
    'custOrderDate',
    'custOrderId',
    'custUserId',
    'orderStatus'
  ];
  dataSourceOrd: any;

  statusList: any;

  constructor(private router: Router,
    private http: HttpClient,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productService: ProductService,
    private sysService: SysService,
    private custService: CustService) {
    this.statusList = CUST_USER_STATUS;
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProduct();
    this.getOrder();
  }

  getCategories() {
    this.productService.getCategories({}).subscribe(response => {
      if (response.resultCode == 0) {
        this.dataSourceCate = new MatTableDataSource(response.data);
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  getProduct() {
    this.productService.getProduct({}).subscribe(response => {
      if (response.resultCode == 0) {
        this.dataSourcePro = new MatTableDataSource(response.data);
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  getOrder() {
    this.custService.getCustOrders({}).subscribe(response => {
      if (response.resultCode == 0) {
        this.dataSourceOrd = new MatTableDataSource(response.data);
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
