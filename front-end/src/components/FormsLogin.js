import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import RegisterBtn from './RegisterBtn';
import { requestLogin, setToken } from '../services/requests';

export default function FormsLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const history = useHistory();

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      // Substituimos a desconstrução do token e roles pelo data;
      const data = await requestLogin('/login', { email, password });
      setToken(data.token);
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);

      const user = JSON.parse(localStorage.getItem('user'));

      if (user.role === 'customer') {
        history.push('/customer/products');
      } else if (user.role === 'seller') {
        history.push('/seller/orders');
      }
      setFailedTryLogin(true);
      setErrorMsg('Não foi possível efetuar login');
    } catch (error) {
      setFailedTryLogin(true);
      setErrorMsg('Não foi possível efetuar login');
    }
  };

  const handleBtn = () => {
    const regexEmail = /^\S+@\S+\.\S+$/;
    const emailValid = regexEmail.test(email);

    const five = 5;
    const pwdValid = password.length > five;

    return emailValid && pwdValid;
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Login</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
          id="email"
          placeholder="Email"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="senha">Senha</Form.Label>
        <Form.Control
          type="password"
          name="senha"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
          id="senha"
          placeholder="Senha"
        />
        {
          failedTryLogin ? (
            <Form.Text className="text-warning">
              { errorMsg }
            </Form.Text>
          ) : ''
        }
      </Form.Group>
      <Button
        className="mb-3"
        type="button"
        name="login-button"
        onClick={ (event) => handleClick(event) }
        disabled={ !handleBtn() }
      >
        Login
      </Button>
      <RegisterBtn />
    </Form>
  );
}
