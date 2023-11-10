declare class ShopService {
    getAllCategories(): Promise<any>;
    addProduct(name: string, categoryId: boolean, count: number): Promise<any>;
}
export default ShopService;
