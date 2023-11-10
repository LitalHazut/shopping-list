declare class ShopService {
    getAllCategories(): Promise<any>;
    addProduct(name: string, categoryId: boolean): Promise<any>;
}
export default ShopService;
