import React, { useEffect, useState } from "react";
import CartItems from "./CartItems";

export default function Cart() {
  const [cartData, setCartData] = useState([]);


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
