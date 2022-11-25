import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import ProductsBtn from './ProductsBtn';
import OrdersBtn from './CustomerOrdersBtn';
import LogOutBtn from './LogOutBtn';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userRole, setUserRole] = useState();
  const renderBtn = (role) => {
    if (role === 'customer') {
      return (
        <>
          <OrdersBtn role={ role } />
          <ProductsBtn role={ role } />
        </>
      );
    }
    return <OrdersBtn role={ role } />;
  };

  useEffect(() => {
    setUserRole(user.role);
  }, []);

  return (
    <header className="buttons-content bg-secondary px-3 mb-3 shadow">
      <Navbar expand="lg">
        <Navbar.Brand href="#home">App de Delivery</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse>
          <Navbar.Text className="ms-auto pe-5 fw-bold">
            {user.name}
          </Navbar.Text>
          <Nav>
            {renderBtn(userRole)}
            <LogOutBtn />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
