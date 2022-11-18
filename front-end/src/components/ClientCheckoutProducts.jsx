import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';

function ClientCheckoutProducts({
  productsArray,
  formatPrice,
  onClick,
}) {
  const verifyQty = productsArray.filter((elP) => elP.qty > 0);

  return (
    <Table className="score-board-table" striped bordered hover size="sm" responsive>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
      </thead>
      <tbody>
        {
          verifyQty.map((
            {
              name,
              qty,
              price,
            },
            index,
          ) => (
            <tr key="tableTr">
              <td
                className="id"
                data-testid={ 'customer_checkout__element-order-table-item-number-'
                 + `${index}` }
              >
                {index + 1}
              </td>
              <td
                style={ { minWidth: '245px' } }
                className="name"
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {name}
              </td>
              <td
                className="quantity"
                data-testid={ 'customer_checkout__element-order-table-quantity-'
                + `${index}` }
              >
                {qty}
              </td>
              <td
                className="unitValue"
                data-testid={ 'customer_checkout__element-order-table-unit-price-'
                + `${index}` }
              >
                {formatPrice(price)}
              </td>
              <td
                className="subTotal"
                data-testid={ 'customer_checkout__element-order-table-sub-total-'
                + `${index}` }
              >
                {formatPrice(price * qty)}
              </td>
              <td
                className="removeButton text-center"
                data-testid={ 'customer_checkout__element-order-table-remove-'
                + `${index}` }
              >
                <FaTrashAlt
                  type="button"
                  onClick={ () => onClick(name) }
                  color="red"
                  title="remove"
                  size={ 20 }
                />
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}

ClientCheckoutProducts.propTypes = {
  productsArray: PropTypes.elementType.isRequired,
  formatPrice: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ClientCheckoutProducts;
