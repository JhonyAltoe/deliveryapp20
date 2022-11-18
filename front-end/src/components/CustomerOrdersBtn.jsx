import React from 'react';
import { Link } from 'react-router-dom';

function OrdersBtn() {
  const linkProduct = (
    <Link to="/customer/orders">
      MEUS PERDIDOS
    </Link>);
  return (linkProduct);
}

export default OrdersBtn;
