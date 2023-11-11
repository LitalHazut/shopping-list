declare class ShopService {
    getAllCategories(): Promise<any>;
    getAllProducts(): Promise<any>;
    addProduct(name: string, categoryId: boolean, count: number): Promise<any>;
}
export default ShopService;
