import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
export default function Welcome() {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    (async () => {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
    })();
  }, []);
  return (
    <Container>
      <h4 style={{ fontSize: '1.8rem', marginBottom: '0.4rem'}}>
        Welcome, <span>{userName}!</span>
      </h4>
      <p style={{ fontSize: '1.05rem'}}>Please select a chat to Start messaging.</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  background: #1d3557;
  span {
    color: #a8dadc;
  }
`;
