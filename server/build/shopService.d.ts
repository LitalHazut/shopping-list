declare class ShopService {
    getAllCategories(): Promise<any>;
    getAllProducts(): Promise<any>;
    createProduct(ProductName: string, CategoryID: number, Count: number): Promise<any>;
    updateProductCount(productId: string, count: number): Promise<import("mssql").IRecordSet<any>>;
}
export default ShopService;
