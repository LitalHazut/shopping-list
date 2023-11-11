import React, { useState, useEffect } from 'react';
import { updateProduct, fetchProducts, createProduct, fetchCategories } from '../shop-service';
import { ICategory, IProduct } from '../types';


const ShopList = () => {
    const [productName, setProductName] = useState('');
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
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
                return error
            }
        };
        fetchData();
    }, []);


    const totalItems = products.length;
    const findCategoryById = (categoryId: number): ICategory | undefined => {
        return categories.find((category) => category.CategoryID === categoryId);
    };


    const handleAddProduct = async () => {
        try {
            if (productName === '') {
                alert('נא לכתוב את שם המוצר כדי להוסיף את המוצר לסל הקניות');
                return;
            }
            if (!selectedCategory) {
                alert('לא נבחרה קטגוריה, יש לבחור קטגוריה כדי להוסיף את המוצר לסל הקניות');
                return;
            }

            const existingProduct = products.find(
                product => product.ProductName === productName && product.CategoryID === selectedCategory?.CategoryID
            );

            if (existingProduct) {
                const updatedProduct = {
                    ...existingProduct,
                    Count: existingProduct.Count + 1,
                };
                await updateProduct(updatedProduct);

            }
            else {
                const newProduct: IProduct = {
                    ProductName: productName,
                    Count: 1,
                    CategoryID: selectedCategory?.CategoryID || 0,
                };
                await createProduct(newProduct);
            }
            const updatedProducts = await fetchProducts();
            setProducts(updatedProducts);
            setProductName('');
            setButtonText('קטגוריה')
        } catch (error) {
            console.error('Error adding/updating product:', error);
        }
    };

    const getNumberOfProducts = (categoryId: number) => {
        return products.filter(product => product.CategoryID === categoryId).length;
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
            <h3>יש לאסוף מוצרים אלו במחלקות המתאימות</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                {categories && categories.map((category, index) => (
                    <div key={index} style={{ border: '1px solid gray', padding: '5px', width: '180px', textAlign: 'center', margin: '0 40px' }}>
                        <div style={{ fontWeight: 'bold' }}>{category.CategoryName}- {getNumberOfProducts(category.CategoryID)} מוצרים</div>
                        {products && products
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
