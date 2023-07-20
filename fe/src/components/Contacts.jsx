import React, { useState } from 'react';
import styled from 'styled-components';

export default function Contacts({ contacts, changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <Container>
      <div className='brand'>
        <h3>Contacts</h3>
      </div>
      <div className='contacts'>
        {contacts.map((contact, index) => {
          return (
            <div
              key={contact._id}
              className={`contact ${
                index === currentSelected ? 'selected' : ''
              }`}
              onClick={() => changeCurrentChat(index, contact)}>
              <div className='avatar'>
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt=''
                />
              </div>
              <div className='username'>
                <h3>{contact.username}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  overflow: hidden;
  background-color: #457b9d;
  .brand {
    padding: 1rem 0.6rem;
    h3 {
      color: white;
      font-weight: 500;
    }
  }
  .contacts {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 4rem;
      cursor: pointer;
      width: 95%;
      border-radius: 0.2rem;
      border: 1px solid transparent;
      padding: 0.4rem;
      display: flex;
      gap: 0.6rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 2.5rem;
        }
      }
      .username {
        h3 {
          color: #f1faee;
          font-weight: 500;
        }
      }
    }
    .selected {
      border-color: #1d3557;
    }
  }
`;
