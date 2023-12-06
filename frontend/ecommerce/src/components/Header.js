import React, { useContext, useEffect, useState } from "react";
import "../styles/Style.css";
// import { useNavigate } from "react-router-dom";
import GlobalContext from "../context";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Header() {
  const { cartData, setCartData, state, setState } = useContext(GlobalContext);
  const [cartCount, setCartCount] = useState(0);
  // const navigate = useNavigate();
  const navigate = useNavigate();

  useEffect(() => {
    setCartCount(JSON.parse(localStorage.getItem("cart"))?.length);
   
    const decodedToken = jwtDecode(localStorage.getItem("user"));
    console.log(decodedToken.userName);
  }, [cartData]);

  const handleLogout = () => {
    localStorage.clear();
    setState({ ...state, user: null });
    console.log("User logged out");
    navigate("/login");
    window.location.reload();
  };
  const getDecryptedToken = ()=>(jwtDecode(localStorage.getItem("user")))

  return (
    <div className="header-container">
      <div
        className="logo-container"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="/path/to/your/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="search-bar-container">
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="search-button">&#128269;</button>
      </div>

      <div
        className="welcome-text-container"
        onClick={() => {
          navigate("/profile");
        }}
      >
        <p className="welcome-text">Hello, {getDecryptedToken().userName}!</p>
      </div>
      <div className="orders-container">
        <p className="orders-text">Your Orders</p>
      </div>
      <div
        className="cart-container"
        onClick={() => {
          navigate("/cart");
        }}
      >
        <p className="cart-count">{cartCount}</p>
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
}

export default Header;
