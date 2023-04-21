import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SYS_USER_STATUS } from 'src/app/core/constants/sys-user';
import { PAGINATOR_SIZE } from 'src/app/core/constants/css';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { ProductService } from 'src/app/core/service/product.service';
import { ProductCategories } from 'src/app/data/schema/product/product-categories';
import { ProductCategoriesDialogComponent } from './product-categories-dialog/product-categories-dialog.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  displayedColumns: string[] = ['action', 'categoryId', 'categoryName', 'status', 'createdUserId', 'createdTime', 'updatedUserId', 'updatedTime'];
  dataSource: MatTableDataSource<ProductCategories>;

  categoryId: string;
  categorList: any;
  statusSelected: number;
  statusList: any;

  data: any;

  paginatorSize: number[] = PAGINATOR_SIZE;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productSevice: ProductService) {
    this.statusList = SYS_USER_STATUS;
  }

  ngOnInit(): void {
    this.search();
    this.getAllCategory();
  }

  getAllCategory() {
    const payload = {};

    this.productSevice.getCategories(payload).subscribe(response => {
      if (response.resultCode == 0) {
        this.categorList = response.data;
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  search() {
    const payload = {
      categoryId: this.categoryId,
      status: this.getStatus(this.statusSelected).data
    }

    this.productSevice.getCategories(payload).subscribe(response => {
      if (response.resultCode == 0) {
        this.dataSource = new MatTableDataSource(response.data);
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

  insert() {
    const dialogRef = this.dialog.open(ProductCategoriesDialogComponent, {
      width: '700px',
      data: {
        action: 'add'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  update(row: any) {
    const dialogRef = this.dialog.open(ProductCategoriesDialogComponent, {
      width: '700px',
      data: {
        action: 'update',
        data: row
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  Input() {
    document.getElementById('importExcel').click();
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) {
        throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
        const bstr: string = e.target.result;

        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        const wsname: string = wb.SheetNames[0];

        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        // console.log(ws);

        this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        let x: string[][] = this.data.slice(1);

        let tempArray = x.map(t => {
            return {
              categoryId: t[0], categoryName: t[1], status: t[2]
            };
        });
        this.productSevice.excelCategories(tempArray).subscribe(response => {
          if (response.resultCode === 0) {
            this.utilsService.processResponseError(response, 'Nhập thành công! ');
            this.search();
        } else {
            this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
        });
    };
    reader.readAsBinaryString(target.files[0]);
  }

}
