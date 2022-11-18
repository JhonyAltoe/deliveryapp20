import React from 'react';
import { Container } from 'react-bootstrap';
import MyOrders from '../components/MyOrders';
import Header from '../components/Header';

function ClientOrders() {
  return (
    <div>
      <Header />
      <Container>
        <MyOrders />
      </Container>
    </div>
  );
}

export default ClientOrders;
