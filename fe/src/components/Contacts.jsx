import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.png';

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    (async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    })();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
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
          <div className='current-user'>
            <div className='avatar'>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt='avatar'
              />
            </div>
            <div className='username'>
              <h3>Login as {currentUserName}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
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

  .current-user {
    padding: 0.5rem 0.6rem;
    background-color: #f1faee;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .avatar {
      img {
        height: 2rem;
      }
    }
    .username {
      h3 {
        color: #457b9d;
        font-weight: 500;
      }
    }
  }
`;
