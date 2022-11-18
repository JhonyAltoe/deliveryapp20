import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestOrderDetails } from '../services/requests';

const moment = require('moment');

export default function FunctionCustomerOrderDetails() {
  const { id } = useParams();
  const [currOrder, setCurrOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const formatPrice = (value) => parseFloat(value)
    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  const value = (JSON.parse(localStorage.getItem('selectedSeller'))).name;

  useEffect(() => {
    const getOrderDetail = async () => {
      const result = await requestOrderDetails(`/orders/${id}`, id);
      setCurrOrder(result);
      setProduct(result.products);
    };
    getOrderDetail();
  }, []);

  return (
    <div>
      { currOrder && (
        <div>
          <p>
            { currOrder.id }
          </p>
          <br />
          <p>
            {value}
          </p>
          <br />
          <p>
            { moment(currOrder.saleDate).locale('pt-br').format('DD/MM/YYYY') }
          </p>
          <br />
          <p>
            { currOrder.status }
          </p>
          <br />
          <button
            type="button"
            disabled={ currOrder.status !== 'Em Trânsito' }
          >
            Marcar como entregue
          </button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>
              Item
            </th>
            <th>
              Description
            </th>
            <th>
              Quantity
            </th>
            <th>
              Unit value
            </th>
            <th>
              Sub-total
            </th>
          </tr>
        </thead>
        {
          product.map((prod) => (
            <tbody
              key={ prod.id }
            >
              <th>
                {prod.id}
              </th>
              <th>
                {prod.name}
              </th>
              <th>
                {prod.quantity}
              </th>
              <th>
                {
                  `${formatPrice(prod.price)}`
                }
              </th>
              <th>
                {
                  `${formatPrice(prod.price * prod.quantity)}`
                }
              </th>
            </tbody>
          ))
        }
      </table>

      <div>
        {
          `${formatPrice(currOrder.totalPrice)}`
        }
      </div>
    </div>
  );
}
