import React from 'react';
import { useHistory } from 'react-router-dom';
import { Nav, CloseButton } from 'react-bootstrap';

function LogOutBtn() {
  const history = useHistory();

  const clearLocalStorage = async () => {
    localStorage.clear();
    history.push('/login');
  };

  const linkProduct = (
    <Nav.Link
      type="button"
      onClick={ clearLocalStorage }
    >
      <CloseButton aria-label="Hide" className="d-none d-lg-block" />
      <span className="d-lg-none">Sair</span>
    </Nav.Link>
  );
  return (linkProduct);
}
export default LogOutBtn;
