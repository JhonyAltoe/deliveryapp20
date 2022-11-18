import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestData } from '../services/requests';

const moment = require('moment');

function FunctionSellerOrder() {
  const [sales, setSales] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const formatPrice = (value) => parseFloat(value)
    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  useEffect(() => {
    const getSales = async () => {
      const newSales = await requestData('/orders');
      setSales(newSales);
    };
    getSales();
  }, [user.id]);

  return (
    <div>
      {sales.map((sale) => (
        <Link
          key={ sale.id }
          to={ `/seller/orders/${sale.id}` }
        >
          <div>
            <p>
              { sale.id }
            </p>
            <p>
              { sale.status }
            </p>
            <p>
              { moment(sale.saleDate).locale('pt-br').format('DD/MM/YYYY') }
            </p>
            <p>
              {
                `${formatPrice(sale.totalPrice)}`
              }
            </p>
            <p>
              { `${sale.deliveryAddress}, ${sale.deliveryNumber}` }
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default FunctionSellerOrder;
