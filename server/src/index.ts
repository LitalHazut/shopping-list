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

app.post('/api/post', async (req, res) => {
  const name = req.body.name;
  const categoryId = req.body.categoryId;
  const count = req.body.count;
  res.send({ product: await shopService.addProduct(name, categoryId, count) });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
