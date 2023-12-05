import React, { useContext, useEffect, useState } from "react";
import CartItems from "./CartItems";
import GlobalContext from "../../context";
import Header from "../Header";


export default function Cart() {
  const {cartData, setCartData, totalAmount, setTotalAmount} = useContext(GlobalContext);
    
  let localCartData=[];
  let total = 0;


  useEffect(() => {
    localCartData = JSON.parse(localStorage.getItem("cart"));
    if(localCartData){
    let copyLocalData = [...localCartData];
    setCartData(localCartData); 
    copyLocalData.forEach(item =>(total+=item.price));
    setTotalAmount(total.toFixed(2))
    console.log("total amount set: ", total.toFixed(2))
    }
  },[totalAmount]);

  const getTotal = ()=>{
    let tAmount= 0; 
    let copyCartData = [...cartData];
    copyCartData.map(item =>(tAmount+= item.price))
    tAmount = tAmount.toFixed(2);
    return tAmount;

  }

  return (
    <div>
        <Header/>
        <h3>Cart</h3>
    <div className="cart-total">
        <h4> Total- $ {getTotal()}</h4>
        <button> {getTotal() >0? "Checkout":""}</button>
    </div>
   

    {cartData.length === 0? <h3> Cart empty</h3>:
        <div>
     {cartData.map((cartProduct)=> (
        <div className="cart-product-container">
     <CartItems cartProduct = {cartProduct}/>
     </div>
     ) )}
     </div>
}
<div className="cart-total">
        <h4> Total- $ {getTotal()}</h4>
        {getTotal() >0 && <button>Checkout</button>}
        
    </div>
  </div>
  );
}

