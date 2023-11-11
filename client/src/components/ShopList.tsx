import React, { useState, useEffect } from 'react';
import { fetchProducts, createProduct, fetchCategories } from '../shop-service';
import { v4 as uuid } from 'uuid';
import { ICategory, IProduct } from '../types';


const ShopList = () => {
    const [productName, setProductName] = useState('');
    const [categories, setCategories] = useState<ICategory[]>([]); // Specify the type of elements in the array
    const [products, setProducts] = useState<IProduct[]>([]); // Specify the type of elements in the array
    const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>();

    const [buttonText, setButtonText] = useState('קטגוריה');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allCategories = await fetchCategories();
                const allProducts = await fetchProducts();
                setCategories(allCategories);
                setProducts(allProducts);

            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);


    const findCategoryById = (categoryId: number): ICategory | undefined => {
        return categories.find((category) => category.CategoryID === categoryId);
    };

    const totalItems = products.length;

    const handleAddProduct = async () => {
        try {
            const existingProduct = products.find(product => product.ProductName === productName);

            if (existingProduct) {
                const updatedProduct = {
                    ...existingProduct,
                    Count: existingProduct.Count + 1,
                };


            } else {
                const unique_id = uuid();
                let productId = parseInt(unique_id);

                const newProduct: IProduct = {
                    ProductID: productId,
                    ProductName: productName,
                    Count: 1,
                    CategoryID: selectedCategory?.CategoryID || 0,
                };

                await createProduct(newProduct);
            }

            // After either adding a new product or updating the count, update the categories and reset the input
            const updatedCategories = await fetchCategories();
            setCategories(updatedCategories.data);
            setProductName('');

        } catch (error) {
            console.error('Error adding/updating product:', error);
        }
    };

    const handleCategoryClick = (category: ICategory) => {
        setSelectedCategory(findCategoryById(category.CategoryID));
        setButtonText(category.CategoryName);
    };
    return (
        <div>
            <h1>רשימת קניות</h1>
            <div style={{ marginRight: '80%' }}>
                <h4>סה"כ: {totalItems} מוצרים</h4>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }} dir="rtl">
                <div>
                    <input className="form-control"
                        style={{ width: '200px', height: '45px' }}
                        type="text"
                        id="productName"
                        placeholder="שם המוצר"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div style={{ marginRight: '90px' }} className="dropdown">
                    <button
                        style={{ width: '200px' }}
                        dir="rtl"
                        className="btn btn-info dropdown-toggle"
                        type="button"
                        id="categoryDropdown"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {buttonText}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="categoryDropdown" style={{ alignItems: 'center' }}>
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className="dropdown-item"
                                type="button"
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category.CategoryName}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ marginRight: '90px' }}>

                    <button type="button" className="btn btn-info"
                        style={{ width: '120px', height: '40px' }}
                        onClick={handleAddProduct}
                    >
                        הוסף
                    </button>
                </div>
            </div>
            <hr style={{ border: '1px solid #ccc', marginTop: '90px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                {categories.map((category, index) => (
                    <div key={index} style={{ border: '1px solid gray', padding: '10px', width: '170px', textAlign: 'center', margin: '0 40px' }}>
                        <div style={{ fontWeight: 'bold' }}>{category.CategoryName}</div>
                        {products
                            .filter(product => product.CategoryID === category.CategoryID)
                            .map((product, productIndex) => (
                                <div key={productIndex}>
                                    {product.Count > 1 && <label>({product.Count})</label>}
                                    <label style={{ marginLeft: '7px' }}>{product.ProductName}</label>
                                </div>
                            ))}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ShopList;
