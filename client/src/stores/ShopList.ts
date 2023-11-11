
import { makeAutoObservable } from 'mobx';
import { updateProduct, fetchProducts, createProduct, fetchCategories } from '../shop-service';
import { ICategory, IProduct } from '../types';

class ShopListStore {
    totalItems: number = 0;
    categories: ICategory[] = [];
    products: IProduct[] = [];
    selectedCategory: ICategory | undefined;
    buttonText: string = 'קטגוריה';

    constructor() {
        makeAutoObservable(this);
    }

    async fetchData() {
        try {
            const allCategories = await fetchCategories();
            const allProducts = await fetchProducts();
            this.totalItems = allProducts.length;
            this.categories = allCategories;
            this.products = allProducts;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    findCategoryById(categoryId: number): ICategory | undefined {
        return this.categories.find((category) => category.CategoryID === categoryId);
    }

    async handleAddProduct(productName: string) {
        try {
            if (productName === '') {
                alert('נא לכתוב את שם המוצר כדי להוסיף את המוצר לסל הקניות');
                return;
            }
            if (!this.selectedCategory) {
                alert('לא נבחרה קטגוריה, יש לבחור קטגוריה כדי להוסיף את המוצר לסל הקניות');
                return;
            }

            const existingProduct = this.products.find(
                (product) => product.ProductName === productName && product.CategoryID === this.selectedCategory?.CategoryID
            );

            if (existingProduct) {
                const updatedProduct = {
                    ...existingProduct,
                    Count: existingProduct.Count + 1,
                };
                await updateProduct(updatedProduct);
            } else {
                const newProduct: IProduct = {
                    ProductName: productName,
                    Count: 1,
                    CategoryID: this.selectedCategory?.CategoryID || 0,
                };
                await createProduct(newProduct);
            }

            const updatedProducts = await fetchProducts();
            this.products = updatedProducts;
            this.totalItems = updatedProducts.length;
            this.selectedCategory = undefined;
            this.buttonText = 'קטגוריה';

        } catch (error) {
            console.error('Error adding/updating product:', error);
        }
    }

    getNumberOfProducts(categoryId: number): number {
        return this.products.filter((product) => product.CategoryID === categoryId).length;
    }

    handleCategoryClick(category: ICategory) {
        this.selectedCategory = this.findCategoryById(category.CategoryID);
        this.buttonText = category.CategoryName;
    }
}

const shopListStore = new ShopListStore();
export default shopListStore;
