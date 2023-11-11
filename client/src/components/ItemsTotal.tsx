
import React from 'react';

interface ItemsTotalProps {
    totalItems: number;
}

const ItemsTotal: React.FC<ItemsTotalProps> = ({ totalItems }) => {
    return (
        <div>
            <h5>סה"כ: {totalItems} מוצרים</h5>
        </div>
    );
};

export default ItemsTotal;
