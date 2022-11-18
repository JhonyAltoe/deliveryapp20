import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RegisterBtn() {
  return (
    <div className="text-center">
      <Link to="/register">
        <Button
          className="text-light"
          variant="link"
          size="sm"
          type="button"
          name="register-button"
        >
          Ainda não tenho conta
        </Button>
      </Link>
    </div>
  );
}

export default RegisterBtn;
