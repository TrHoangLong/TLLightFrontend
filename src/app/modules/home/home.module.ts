import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import { SysUserComponent } from './page/sys-user/sys-user.component';
import { ProductCategoriesComponent } from './page/product-categories/product-categories.component';
import { ProductComponent } from './page/product/product.component';
import { SysCardComponent } from './page/sys-card/sys-card.component';
import { SysOrdersComponent } from './page/sys-orders/sys-orders.component';
import { CustomerUserComponent } from './page/customer-user/customer-user.component';
import { ShippingComponent } from './page/shipping/shipping.component';
import { CustCardComponent } from './page/cust-card/cust-card.component';
import { CustOrdersComponent } from './page/cust-orders/cust-orders.component';
import { OrderComponent } from './page/order/order.component';
import { SysUserDialogComponent } from './page/sys-user/sys-user-dialog/sys-user-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ProductCategoriesDialogComponent } from './page/product-categories/product-categories-dialog/product-categories-dialog.component';
import { ProductDialogComponent } from './page/product/product-dialog/product-dialog.component';
import { ProductZoomImageComponent } from './page/product/product-dialog/product-zoom-image/product-zoom-image.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProductDescribeComponent } from './page/order/product-describe/product-describe.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SysCardDialogComponent } from './page/sys-card/sys-card-dialog/sys-card-dialog.component';
import { SysOrdersDialogComponent } from './page/sys-orders/sys-orders-dialog/sys-orders-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    SysUserComponent,
    ProductCategoriesComponent,
    ProductComponent,
    SysCardComponent,
    SysOrdersComponent,
    CustomerUserComponent,
    ShippingComponent,
    CustCardComponent,
    CustOrdersComponent,
    OrderComponent,
    SysUserDialogComponent,
    ProductCategoriesDialogComponent,
    ProductDialogComponent,
    ProductZoomImageComponent,
    ProductDescribeComponent,
    SysCardDialogComponent,
    SysOrdersDialogComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    NgbModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule, 
    MatIconModule, 
    FormsModule, 
    MatTableModule, 
    MatPaginatorModule, 
    HttpClientModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatCheckboxModule
  ]
})
export class HomeModule { }
