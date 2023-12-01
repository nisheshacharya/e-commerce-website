import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../context';

const Header = () => {
  const { state, setState } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    setState({ user: null }); 
    navigate('/'); 
  };

  return (
    <div className="header">
      <h1>Your App Name</h1>
      {state.user(
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
