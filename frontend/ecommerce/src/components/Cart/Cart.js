import React, { useContext, useEffect, useState } from "react";
import CartItems from "./CartItems";
import GlobalContext from "../../context";
import Header from "../Header";


export default function Cart() {
  const {cartData, setCartData} = useContext(GlobalContext);
  const [totalAmount, setTotalAmount] = useState(0);
  let localCartData;
  let total = 0;


  useEffect(() => {
    localCartData = JSON.parse(localStorage.getItem("cart"))
    let copyLocalData = [...localCartData]
    setCartData(localCartData); 
    copyLocalData.forEach(item =>(total+=item.price))
    setTotalAmount(total.toFixed(2))

;
  },[]);
 
  
    
 console.log("cart total", totalAmount)

  

  return (
    <div>
        <Header/>
        <h3>Cart</h3>
    <div className="cart-total">
        <h4> Total- $ {totalAmount}</h4>
        <button>Checkout</button>
    </div>

    {!cartData? <h3> Cart empty</h3>:
        <div>
     {cartData.map((cartProduct)=> (
        <div className="cart-product-container">
     <CartItems cartProduct = {cartProduct}/>
     </div>
     ) )}
     </div>
}
<div className="cart-total">
        <h4> Total- $ {totalAmount}</h4>
        <button>Checkout</button>
    </div>


    </div>
  );
}

