export interface CustOrders {
    custOrderDate: Date;
    custOrderId: number;
    orderStatus: number;
    custUserId: string;
    productId: string;
    productName: string;
    quantity: number;
    productPrice: number;
    totalPrice: number;
    updatedUserId: string;
    updatedTime: Date;
  }