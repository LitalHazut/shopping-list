import axios from 'axios';
import { IProduct } from './types';

export const fetchProducts = () => axios.get('/api/get');

export async function createProduct(product: IProduct) {
    const response = await axios.post('/api/post', product);
}
