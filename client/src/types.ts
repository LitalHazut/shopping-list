export interface IProduct {
  ProductID: number;
  ProductName: string;
  Count: number;
  CategoryID: number;
}
export interface ICategory {
  CategoryID: number;
  CategoryName: string;

}
export type ShopContextType = {
  products: IProduct[];

};
