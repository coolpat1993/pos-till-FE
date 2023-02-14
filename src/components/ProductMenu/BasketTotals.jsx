import React, { useEffect } from 'react';

const BasketTotals = ({ items, setBasketTotal, basketTotal }) => {
  let sum = 0;

  for (let i = 0; i < items.length; i++) {
    sum += items[i].price * items[i].quantity;
  }

  useEffect(() => {
    setBasketTotal(sum);
  }, [sum]);

  return (
    <div>
      <p className="heading-2 u-margin-top-small">£{sum.toFixed(2)}</p>
    </div>
  );
};

export default BasketTotals;
