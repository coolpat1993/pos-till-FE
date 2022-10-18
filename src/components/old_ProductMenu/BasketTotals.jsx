import React from 'react';

const BasketTotals = ({ items }) => {


    let sum = 0;

    for (let i = 0; i < items.length; i++) {
        sum += items[i].price * items[i].quantity;
    }

    return (
        <nav className="center">
            <h1>£{sum.toFixed(2)}</h1>
        </nav>
    );
};

export default BasketTotals;
