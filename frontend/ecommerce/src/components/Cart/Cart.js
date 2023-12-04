import React, { useContext, useEffect, useState } from "react";
import CartItems from "./CartItems";
import GlobalContext from "../../context";
import Header from "../Header";


export default function Cart() {
//   const [cartData, setCartData] = useState([]);
  const {cartData, setCartData} = useContext(GlobalContext);


  useEffect(() => {
    const localCartData = JSON.parse(localStorage.getItem("cart"));
    setCartData(localCartData);
    // console.log("from local Storage in cart", localCartData);
  }, []);

  return (
    <div>
        <Header/>
       
        <h3>Cart</h3>
    {!cartData? <h3> Cart empty</h3>:
        <div>
     {cartData.map((cartProduct)=> (
        <div className="cart-product-container">
     <CartItems cartProduct = {cartProduct}/>
     </div>
     ) )}
     </div>
}

    </div>
  );
}
