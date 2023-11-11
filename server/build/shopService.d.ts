declare class ShopService {
    getAllCategories(): Promise<any>;
    getAllProducts(): Promise<any>;
    createProduct(productId: number, name: string, categoryId: boolean, count: number): Promise<any>;
}
export default ShopService;
