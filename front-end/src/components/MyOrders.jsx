import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { requestData } from '../services/requests';
import './styles/myOrders.css';

function MyOrders() {
  const [myOrders, setMyOrders] = useState();
  const history = useHistory();

  function dateFormat(orderDate) {
    const date = new Date(orderDate).toLocaleDateString('pt-BR');
    return date;
  }

  function moneyBrFormat(orderPrice) {
    const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(orderPrice);
    const result = `${money}`;

    return result;
  }

  useEffect(() => {
    async function sales() {
      try {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        const getOrders = await requestData('orders');
        const findOrdersUser = getOrders.filter((mine) => mine.userId === userInfo.id);
        setMyOrders(findOrdersUser);
      } catch (error) {
        console.log(error);
      }
    }

    sales();
  }, []);

  const handlerStatus = (status) => {
    const obj = Object.freeze({
      Preparando: 'preparando',
      Pendente: 'pendente',
      Entregue: 'entregue',
    });
    return `order-${obj[status]}`;
  };

  return (
    <Row
      className="order-row"
      xs={ 1 }
      md={ 2 }
      lg={ 3 }
      xxl={ 4 }
    >
      { myOrders
        && myOrders.map((order, index) => {
          const styleStatus = handlerStatus(order.status);
          return (
            <Col key={ index } className="p-0 mb-3">
              <Card
                type="button"
                name="card-order-button"
                onClick={ () => history.push(`/customer/orders/${index + 1}`) }
                className="d-flex flex-row order-card shadow"
              >
                <div
                  data-testid={ `customer_orders__element-order-id-${index + 1}` }
                  className="text-center d-flex align-items-center px-2 bg-white
                  order-border-radius-l"
                >
                  <Card.Title className="h6 m-0">
                    Pedido
                    <br />
                    {`000${index + 1}`}
                  </Card.Title>
                </div>
                <Row
                  className="d-flex justify-content-between w-100 m-0 p-1 bg-light
                  order-border-radius-r"
                >
                  <Col
                    data-testid={
                      `customer_orders__element-delivery-status-${index + 1}`
                    }
                    className={ `col-6 d-flex align-items-center justify-content-center
                    order-col-status rounded h6 m-0 ${styleStatus}` }
                  >
                    {`${order.status}`}
                  </Col>
                  <Col className="col-6 p-0 d-flex flex-column justify-content-between">
                    <div
                      data-testid={ `customer_orders__element-order-date-${index + 1}` }
                      className="col-12 rounded order-card-date ps-1 order-card-cel-info
                      h6"
                    >
                      {`${dateFormat(order.saleDate)}`}
                    </div>
                    <div
                      data-testid={ `customer_orders__element-card-price-${index + 1}` }
                      className="col-12 rounded ps-1 order-card-cel-info h6 m-0"
                    >
                      {`${moneyBrFormat(order.totalPrice)}`}
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
}

export default MyOrders;
