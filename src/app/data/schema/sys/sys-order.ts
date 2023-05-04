export interface SysOrder {
    sysOrderDate: Date;
    sysOrderId: number;
    sysUserId: string;
    orderStatus: number;
    custName: string;
    mobileNo: string;
    address: string;
    productId: string;
    quantity: number;
    productPrice: number;
    totalPrice: number;
    updatedUserId: string;
    updatedTime: Date;
    productName: string;
}