import axios from 'axios';
import { IProduct } from './types';

export const fetchProducts = () => axios.get('/api/get');

export async function createProduct(product: IProduct) {
    const response = await axios.post('/api/post', product);
}
export const fetchCategories = async () => {
    try {
        const response = await axios.get('/api/get');
        return response.data.categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};