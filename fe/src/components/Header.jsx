import React from 'react';
import Logo from '../assets/logo.png';
import Logout from './Logout';

const Header = () => {
  return (
    <header
      style={{
        width: '100%',
        padding: "0.4rem 0.6rem",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <img src={Logo} alt='logo' width={'40px'} />
        <h3 style={{ color: '#457b9d' }}>Chat App</h3>
      </div>
      <Logout />
    </header>
  );
};

export default Header;
