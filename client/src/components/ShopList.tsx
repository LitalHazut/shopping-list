import React, { useState, useEffect } from 'react';
import { fetchProducts, createProduct, fetchCategories } from '../shop-service';
import { v4 as uuid } from 'uuid';

import { ICategory, IProduct } from '../types';


const ShopList = () => {
    const [productName, setProductName] = useState('');
    const [categories, setCategories] = useState<ICategory[]>([]); // Specify the type of elements in the array
    const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const categories = await fetchCategories();
                setCategories(categories);
                console.log(categories)
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);
    const findCategoryById = (categoryId: number): ICategory | undefined => {
        return categories.find((category) => category.CategoryID === categoryId);
    };

    const handleAddProduct = async () => {
        try {
            const unique_id = uuid();
            let productId = parseInt(unique_id);

            const newProduct: IProduct = {
                ProductID: productId,
                ProductName: productName,
                Count: 1,
                CategoryID: selectedCategory?.CategoryID || 0, // Use a default value if CategoryID is undefined
            };

            await createProduct(newProduct);
            const updatedCategories = await fetchProducts();
            setCategories(updatedCategories.data);
            setProductName('');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <h1>רשימת קניות</h1>
            <div style={{ marginRight: '60%' }}>
                <h3>סה"כ: X מוצרים</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }} dir="rtl">
                <div>
                    <input
                        style={{ width: '120px', height: '25px' }}
                        type="text"
                        id="productName"
                        placeholder="מוצר"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div style={{ marginRight: '20px' }}>
                    <select
                        id="category"
                        style={{ width: '150px', height: '25px' }}
                        value={selectedCategory?.CategoryID}
                        onChange={(e) => setSelectedCategory(findCategoryById(Number(e.target.value)))}
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category.CategoryID}>
                                {category.CategoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginRight: '20px' }}>
                    <button
                        style={{ width: '100px', height: '25px' }}
                        onClick={handleAddProduct}
                    >
                        הוסף
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopList;
