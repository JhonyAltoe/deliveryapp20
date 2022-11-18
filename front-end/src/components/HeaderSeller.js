import React, { useState, useEffect } from 'react';
import SellerOrdersBtn from './SellerOrdersBtn';
import LogOutBtn from './LogOutBtn';

function HeaderSeller() {
  const [userName, setName] = useState();
  useEffect(() => {
    async function sales() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setName(user.name);
      } catch (error) {
        console.log(error);
      }
    }
    sales();
  }, [userName]);
  return (
    <div className="buttons-content">
      <SellerOrdersBtn />
      <h3>
        {userName}
      </h3>
      <LogOutBtn />
    </div>
  );
}
export default HeaderSeller;
