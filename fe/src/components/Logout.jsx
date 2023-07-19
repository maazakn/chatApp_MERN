import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePoweroff } from 'react-icons/ai';
import styled from 'styled-components';
import axios from 'axios';
import { logoutRoute } from '../utils/APIRoutes';
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate('/login');
    }
  };
  return (
    <Button onClick={handleClick}>
      Logout&ensp;<AiOutlinePoweroff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 10px;
  background-color: #457b9d;
  color: #f1faee;
  border: none;
  cursor: pointer;
  svg {
    font-size: 0.9rem;
  }
`;
