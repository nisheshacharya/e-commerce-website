import React, { useContext, useEffect, useState } from "react";
import CartItems from "./CartItems";
import GlobalContext from "../../context";

export default function Cart() {
//   const [cartData, setCartData] = useState([]);
  const {cartData, setCartData} = useContext(GlobalContext);


  useEffect(() => {
    const localCartData = JSON.parse(localStorage.getItem("cart"));
    setCartData(localCartData);
    console.log(localCartData);
  }, []);

  return (
    <div>
        <h3>Cart</h3>
     {cartData.map((cartProduct)=> (
        <div className="cart-product-container">
     <CartItems cartProduct = {cartProduct}/>
     </div>
     ) )}
    </div>
  );
}
