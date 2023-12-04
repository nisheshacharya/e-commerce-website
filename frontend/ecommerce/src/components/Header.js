import React, { useContext, useState } from 'react';
import '../styles/Style.css'; 
import {useNavigate} from 'react-router-dom';
import GlobalContext from '../context';

function Header(){
const { cartData, setCartData} = useContext(GlobalContext);
const [cartCount, setCartCount] = useState(0);

const navigate = useNavigate();

// useState(()=>{
// setCartCount(JSON.parse(localStorage.getItem("cart")).length);

// },[cartData])

  const handleLogout = () => {
   localStorage.clear();
    console.log('User logged out');
    navigate('/');
  };



  return (
    <div className="header-container">
      <div className="logo-container">
        <img src="/path/to/your/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="search-bar-container">
       
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="search-button">&#128269;</button>
      </div>

      <div className="welcome-text-container">
        <p className="welcome-text">Hello, User!</p>
      </div>
      <div className="orders-container">
        <p className="orders-text">Your Orders</p>
      </div>
      <div className="cart-container">
        <p className='cart-count'>CHange later</p>
        {/* will put item number here later*/}
        <span role="img" aria-label="Cart Emoticon" className="cart-emoticon">
          🛒
        </span>
      </div>
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
