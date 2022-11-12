import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { requestCheckout, setToken } from '../services/requests';

function CheckOutBtn() {
  const history = useHistory();

  const checkoutFunc = async () => {
    try {
      const getCarrinho = JSON.parse(localStorage.getItem('carrinho'));
      const qty = getCarrinho.filter((elP) => elP.qty > 0).map((elP) => ({
        productId: Number(elP.id),
        quantity: Number(elP.qty),
      }));
      localStorage.setItem('produtos', JSON.stringify(qty));
      const getUserId = JSON.parse(localStorage.getItem('user'));
      const getSellerId = JSON.parse(localStorage.getItem('selectedSeller'));
      const getTotalPrice = JSON.parse(localStorage.getItem('valorTotal'));
      const getDeliveryAddress = JSON.parse(localStorage.getItem('address'));
      const getDeliveryNumber = JSON.parse(localStorage.getItem('number'));

      const bodyCheckout = {
        userId: Number(getUserId.id),
        sellerId: Number(getSellerId.id),
        totalPrice: Number(parseFloat(getTotalPrice).toFixed(2)),
        deliveryAddress: getDeliveryAddress,
        deliveryNumber: getDeliveryNumber,
        products: qty,
      };

      setToken(getUserId.token);

      const getCheckout = await requestCheckout(
        '/customer/checkout',
        bodyCheckout,
      );

      history.push(`/customer/orders/${getCheckout}`);
    } catch (error) {
      console.log(error);
    }
  };

  const linkProduct = (
    <Button
      className="align-self-start fw-bold"
      type="button"
      data-testid="customer_checkout__button-submit-order"
      onClick={ () => checkoutFunc() }
    >
      FINALIZAR PEDIDO
    </Button>);
  return (linkProduct);
}

export default CheckOutBtn;
