import React from 'react';
import Logo from '../assets/logo.png';
import Logout from './Logout';

const Header = () => {
  const [currentUserName, setCurrentUserName] = React.useState(undefined);
  const [currentUserImage, setCurrentUserImage] = React.useState(undefined);

  React.useEffect(() => {
    (async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    })();
  }, []);

  return (
    <header
      style={{
        width: '100%',
        padding: '0.4rem 0.6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <img src={Logo} alt='logo' width={'40px'} />
        <h3 style={{ color: '#457b9d' }}>Chat App</h3>
      </div>

      <div
        style={{
          padding: '0.5rem 0.6rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
        <Logout />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
          <div>
            <img
              style={{ height: '2rem' }}
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt='avatar'
            />
          </div>
          <div>
            <h3
              style={{
                color: '#457b9d',
                fontWeight: 500,
                fontSize: '0.88rem',
              }}>
              {currentUserName}
            </h3>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
