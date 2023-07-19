import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { allUsersRoute, host } from '../utils/APIRoutes';
import ChatContainer from '../components/ChatContainer';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import Header from '../components/Header';
import { getRandomInt } from '../utils/functions';
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';
import { setAvatarRoute } from '../utils/APIRoutes';

export default function Chat() {
  const multiavatarApi = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toastOptions = {
    position: 'bottom-center',
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate('/login');
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          try {
            setIsLoading(true)
            const avatorsData = [];
            for (let i = 0; i < 4; i++) {
              const image = await axios.get(
                `${multiavatarApi}/${Math.round(Math.random() * 1000)}`
              );
              const buffer = new Buffer(image.data);
              avatorsData.push(buffer.toString('base64'));
            }
            setAvatars(avatorsData);
          } catch (error) {
            console.log(error);
            toast.error('Failed to get avators', toastOptions);
          }
        }
      }
    })();
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      if (avatars && avatars?.length > 0) {
        try {
          // set Avator randomly
          const num = getRandomInt(0, 3);

          const user = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          );

          const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: avatars[num || 0],
          });

          if (data.isSet) {
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(user)
            );
          }

          toast.info('User avator set successfully', toastOptions);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          toast.error('Something Went Wrong', toastOptions);
        }
      }
    })();
  }, [avatars]);

  const handleChatChange = chat => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      {isLoading ? (
        <h3>Loading ...</h3>
      ) : (
        <>
          <Header />
          <div className='container'>
            <Contacts contacts={contacts} changeChat={handleChatChange} />
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer currentChat={currentChat} socket={socket} />
            )}
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .container {
    height: 100%;
    width: 100%;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
