import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import shopListStore from '../stores/ShopList';
import ItemsTotal from './ItemsTotal';

const ShopList: React.FC = observer(() => {
    const [productName, setProductName] = useState('');
    useEffect(() => {
        shopListStore.fetchData();
    }, []);

    return (
        <div>
            <h1>רשימת קניות</h1>
            <div style={{ marginRight: '80%' }}>
                <ItemsTotal totalItems={shopListStore.totalItems} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }} dir="rtl">
                <div>
                    <input
                        className="form-control"
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
                        {shopListStore.buttonText}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="categoryDropdown" style={{ alignItems: 'center' }}>
                        {shopListStore.categories.map((category, index) => (
                            <button
                                key={index}
                                className="dropdown-item"
                                type="button"
                                onClick={() => shopListStore.handleCategoryClick(category)}
                            >
                                {category.CategoryName}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ marginRight: '90px' }}>
                    <button
                        type="button"
                        className="btn btn-info"
                        style={{ width: '120px', height: '40px' }}
                        onClick={() => {
                            shopListStore.handleAddProduct(productName);
                            setProductName(''); // Clear productName in the component state
                        }}
                    >
                        הוסף
                    </button>
                </div>
            </div>
            <hr style={{ border: '1px solid #ccc', marginTop: '90px' }} />
            <h3>יש לאסוף מוצרים אלו במחלקות המתאימות</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                {shopListStore.categories.map((category, index) => (
                    <div
                        key={index}
                        style={{ border: '1px solid gray', padding: '5px', width: '180px', textAlign: 'center', margin: '0 40px' }}
                    >
                        <div style={{ fontWeight: 'bold' }}>
                            {category.CategoryName}- {shopListStore.getNumberOfProducts(category.CategoryID)} מוצרים
                        </div>
                        {shopListStore.products
                            .filter((product) => product.CategoryID === category.CategoryID)
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
});

export default ShopList;
