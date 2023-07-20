import React, { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import styled from 'styled-components';

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState('');

  const sendChat = event => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <Container>
      <form className='input-container' onSubmit={event => sendChat(event)}>
        <input
          type='text'
          autoFocus
          placeholder='Type your message here'
          onChange={e => setMsg(e.target.value)}
          value={msg}
        />
        <button type='submit'>
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.4rem 1rem 1rem 1.5rem;
  .input-container {
    width: 100%;
    border: 1px solid #f1faee;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    input {
      flex: 1;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      font-size: 0.85rem;
      padding: 0 1rem;

      &::selection {
        background-color: #f1faee;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      cursor: pointer;
      padding: 0.3rem 2rem;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 0.9rem;
        }
      }
      svg {
        font-size: 1.5rem;
        color: #f1faee;
      }
    }
  }
`;
