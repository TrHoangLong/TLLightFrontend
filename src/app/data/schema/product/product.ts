export interface Product{
    productId: string,
    categoryId: string,
    productName: string,
    categoryName: string,
    productPrice: number,
    description: string,
    quantity: number,
    productImage: string,
    status: number,
    createdUserId: string,
    createdTime: Date,
    updatedUserId: string,
    updatedTime: Date
}