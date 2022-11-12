import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import SelectSellers from './SelectSellers';

function ClientCheckoutAddress() {
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  const getAddress = ({ target }) => {
    setAddress(target.value);
    localStorage.setItem('address', JSON.stringify(target.value));
  };

  const getNumber = ({ target }) => {
    setNumber(target.value);
    localStorage.setItem('number', JSON.stringify(target.value));
  };

  return (
    <Table
      className="client-checkout-address"
      striped
      bordered
      hover
      size="sm"
      responsive
    >
      <thead>
        <tr>
          <th>Vendedor Responsável</th>
          <th>Endereço</th>
          <th>Número</th>
        </tr>
      </thead>
      <tbody>
        <tr key="table">
          <td
            className="vendedora"
            style={ { minWidth: '220px' } }
          >
            <SelectSellers />
          </td>
          <td
            className="endereco"
            style={ { minWidth: '220px' } }
          >
            <Form.Control
              onChange={ getAddress }
              value={ address }
              data-testid="customer_checkout__input-address"
              type="text"
              name="input"
              placeholder="digite aqui"
            />
          </td>
          <td
            className="numero"
            style={ { minWidth: '120px' } }
          >
            <Form.Control
              onChange={ getNumber }
              value={ number }
              data-testid="customer_checkout__input-address-number"
              type="text"
              name="input"
              placeholder="digite aqui"
            />
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ClientCheckoutAddress;
