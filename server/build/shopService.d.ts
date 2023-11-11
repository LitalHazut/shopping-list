declare class ShopService {
    getAllCategories(): Promise<any>;
    getAllProducts(): Promise<any>;
    createProduct(name: string, categoryId: boolean, count: number): Promise<any>;
    updateProductCount(productId: string, count: number): Promise<import("mssql").IRecordSet<any>>;
}
export default ShopService;
