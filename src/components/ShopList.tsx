import React, { useState } from 'react';

const ShopList = () => {
    // State to store the product name
    const [productName, setProductName] = useState('');

    // Sample options for the dropdown
    const categories = ['קטגוריה 1', 'קטגוריה 2', 'קטגוריה 3'];

    return (
        <div>

            <h1>רשימת קניות</h1>
            <div style={{ marginRight: '60%' }}>
                <h3>סה"כ: X מוצרים</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }} dir="rtl">
                <div>
                    <input style={{ width: '120px', height: '25px' }}
                        type="text"
                        id="productName"
                        placeholder='מוצר'
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div style={{ marginRight: '20px' }}>
                    <select id="category" style={{ width: '150px', height: '25px' }}>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ marginRight: '20px' }}>
                    <button style={{ width: '100px', height: '25px' }}>הוסף</button>
                </div>

            </div>

        </div>
    );
}

export default ShopList;
