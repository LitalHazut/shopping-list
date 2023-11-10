export interface IProduct {
  id: number;
  name: string;
  count: number;
  categoryId: string;
}
export type ShopContextType = {
  products: IProduct[];

};
