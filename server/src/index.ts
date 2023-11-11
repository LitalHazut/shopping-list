import ShopService from './shopService';
import express from 'express';
import cors from 'cors';
import * as path from 'path';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

if (process.env.NONE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['*'],
        credentials: true,
    };
    app.use(cors(corsOptions));
}


const shopService = new ShopService();

// Route to get all posts
app.get('/api/get', async (req, res) => {
    res.send({ categories: await shopService.getAllCategories() });
});
app.get('/api/getProducts', async (req, res) => {
    res.send({ products: await shopService.getAllProducts() });
});

app.post('/api/post', async (req, res) => {
    try {
        const { ProductName, CategoryID, Count } = req.body;
        res.send({ product: await shopService.createProduct(ProductName, CategoryID, Count) });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.put('/api/products/:productId', async (req, res) => {
    try {
        const { Count } = req.body;
        const ProductID = req.params.productId;

        const result = await shopService.updateProductCount(ProductID, Count);
        console.log(result);

        res.send({ product: result });
    } catch (error) {
        console.error('Error updating product count:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
