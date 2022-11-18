import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestOrderDetails } from '../services/requests';

function TableDetails() {
  const [table, setTable] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getOrders = async () => {
      const result = await requestOrderDetails(`/orders/${id}`, id);
      setTable(result.products);
      console.log(result.products);
    };
    getOrders();
  }, []);

  return (
    <div>
      <thead>
        <th>Item</th>
        <th>Descrição</th>
        <th>Quantidade</th>
        <th>Valor Unitário</th>
        <th>Sub-total</th>
      </thead>

      {
        table.map((ele) => (
          <tbody key={ ele.id }>
            <th>
              {ele.id}

            </th>
            <th>
              {ele.name}

            </th>
            <th>
              {ele.quantity}

            </th>
            <th>
              {ele.price}

            </th>
            <th>
              {ele.price * ele.quantity}

            </th>
          </tbody>
        ))
      }
    </div>
  );
}

export default TableDetails;
