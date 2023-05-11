import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
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
import { SysOrdersHistComponent } from './page/sys-orders-hist/sys-orders-hist.component';
import { CustOrdersHistComponent } from './page/cust-orders-hist/cust-orders-hist.component';

const routes: Routes =[
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path:'order',
                component: OrderComponent
            },
            {
                path: 'sys-card',
                component: SysCardComponent
            },
            {
                path: 'sys-orders',
                component: SysOrdersComponent
            },
            {
                path: 'product-categories',
                component: ProductCategoriesComponent
            },
            {
                path: 'product',
                component: ProductComponent
            },
            {
                path: 'customer-user',
                component: CustomerUserComponent
            },
            {
                path: 'cust-card',
                component: CustCardComponent
            },
            {
                path: 'cust-orders',
                component: CustOrdersComponent
            },
            {
                path: 'shipping',
                component: ShippingComponent
            },
            {
                path: 'sys-users',
                component: SysUserComponent
            },
            {
                path: 'sys-orders-hist',
                component: SysOrdersHistComponent
            },
            {
                path: 'cust-orders-hist',
                component: CustOrdersHistComponent
            }
        ]
      }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {
}