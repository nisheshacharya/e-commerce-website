import React, { useContext, useEffect, useState } from "react";
import "../styles/Style.css";
import GlobalContext from "../context";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LocalContext from "../context/localContext";
import { getProductByName } from "../network/network";

function Header() {
  const { cartData, setCartData, state, setState } = useContext(GlobalContext);
  const { products, setProducts } = useContext(LocalContext);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearch = async () => {
    try {
      const res = await getProductByName(searchQuery);
      const toArray = res;
      console.log(" search querry", searchQuery);

      if (Array.isArray(toArray)) {
        setProducts(toArray);
        console.log("set in products");
      }
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  const getDecryptedToken = () => jwtDecode(localStorage.getItem("user"));

  return (
    <div className="header-container">
      <div
        className="logo-container"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src="https://tse3.mm.bing.net/th?id=OIP.qqjTs7jvKi_6zKhI4sTRjAHaGy&pid=Api&P=0&h=220"
          alt="Logo"
          className="logo"
        />
      </div>

      <div className="title-container">
        <h1>OrganicMart </h1>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch();
          }}
        />
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
      <div
        className="orders-container"
        onClick={() => {
          navigate("/orders");
        }}
      >
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
