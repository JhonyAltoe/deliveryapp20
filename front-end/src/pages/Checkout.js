import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import ClientCheckoutProducts from '../components/ClientCheckoutProducts';
import ClientCheckoutAddress from '../components/ClientCheckoutAddress';
import CheckOutBtn from '../components/CheckOutBtn';

function Checkout() {
  const [checkoutArray, setCheckoutArray] = useState([]);
  const totalValue = JSON.parse(localStorage.getItem('valorTotal'));
  const arrayProducts = JSON.parse(localStorage.getItem('carrinho'));
  const formatPrice = (value) => parseFloat(value)
    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  const handleRemove = (name) => {
    const removeArray = arrayProducts.filter((elP) => elP.name !== name);
    setCheckoutArray(removeArray);
    localStorage.setItem('carrinho', JSON.stringify(removeArray));
    console.log(checkoutArray);

    const arrayToCalc = JSON.parse(localStorage.getItem('carrinho'));

    let sum = 0;
    arrayToCalc.forEach((el) => {
      const elSum = el.qty * Number(el.price);
      sum += elSum;
    });
    localStorage.setItem('valorTotal', JSON.stringify(sum));
    return removeArray;
  };

  return (
    <div className="checkout-body">
      <Header />
      <Container>
        <div className="finalize-order d-flex flex-column">
          <h2>Finalizar pedido</h2>
          <ClientCheckoutProducts
            productsArray={ arrayProducts }
            formatPrice={ formatPrice }
            onClick={ handleRemove }
          />
          <p
            data-testid="customer_checkout__element-order-total-price"
            className="align-self-end pe-1 fw-bold"
            style={ { fontSize: '1.5rem' } }
          >
            {`Total: ${formatPrice(totalValue)}`}
          </p>
        </div>
        <div className="details-and-delivery-addres finalize-order d-flex flex-column">
          <h2>Detalhes e Endereço para Entrega</h2>
          <ClientCheckoutAddress />
          <CheckOutBtn />
        </div>
      </Container>
    </div>
  );
}

export default Checkout;
