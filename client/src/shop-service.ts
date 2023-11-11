import axios from 'axios';
import { IProduct } from './types';

export const fetchCategories = async () => {
    try {
        const response = await axios.get('/api/get');
        return response.data.categories;
    } catch (error) {
        throw error;
    }
};
export const fetchProducts = async () => {
    try {
        const response = await axios.get('/api/getProducts');
        return response.data.products;
    } catch (error) {
        throw error;
    }
};


export async function createProduct(product: IProduct) {
    try {
        const response = await axios.post('/api/post', product);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}
// const updateProduct = async (updatedProduct: IProduct) => {
//     try {
//         await axios.put(`/api/products/${updatedProduct.ProductID}`, updatedProduct);
//     } catch (error) {
//         console.error('Error updating product:', error);
//         throw error;
//     }
// };
