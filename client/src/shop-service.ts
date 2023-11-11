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
        console.log(response)
        return response.data.products;
    } catch (error) {
        throw error;
    }
};


export async function createProduct(product: IProduct) {
    try {
        const response = await axios.post('/api/post', product);
        return response.data;  // Assuming the server returns data, adjust as needed
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;  // Rethrow the error to handle it in the calling code
    }
}
