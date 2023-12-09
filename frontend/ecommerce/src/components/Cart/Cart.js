import React, { useContext, useEffect, useState } from "react";
import CartItems from "./CartItems";
import GlobalContext from "../../context";
import Header from "../Header";
import { Link } from "react-router-dom";
import Footer from "../Footer";

export default function Cart() {
  const { cartData, setCartData, totalAmount, setTotalAmount } =
    useContext(GlobalContext);

  let localCartData = [];
  let total = 0;

  useEffect(() => {
    localCartData = JSON.parse(localStorage.getItem("cart"));
    if (localCartData) {
      let copyLocalData = [...localCartData];
      console.log("local cart data: ", localCartData);
      console.log("cart data from cart ", cartData);
      setCartData(localCartData);
      copyLocalData.forEach((item) => (total += item.price));
      setTotalAmount(total);
      console.log("total amount set: ", total);
    }
  }, [totalAmount]);

  const getTotal = () => {
    let tAmount = 0;
    let copyCartData = [...cartData];
    copyCartData.map((item) => (tAmount += item.price));

    return tAmount;
  };

  return (
    <div className="background">
      <Header />
      <div className="heading-div">
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart-items-container">
        <div className="cart-total">
          <h4> Total- $ {getTotal()}</h4>
          {getTotal() > 0 && (
            <Link
              to={{
                pathname: "/checkout",
              }}
              state={{ cartData }}
            >
              <button>CheckOut</button>
            </Link>
          )}
        </div>

        <div className="cart-second-half">
          {cartData.length <= 0 ? (
            <div
              style={{ height: "300px", color: "maroon", textAlign: "center" }}
            >
              <h1> Opps! Cart Empty....</h1>
              <h2>Add something first</h2>
            </div>
          ) : (
            <div className="cart-item-container">
              {cartData.length > 0
                ? cartData.map((cartProduct) => (
                    <div className="cart-product-container">
                      <CartItems cartProduct={cartProduct} />
                    </div>
                  ))
                : localCartData.map((cartProduct) => (
                    <div className="cart-product-container">
                      <CartItems cartProduct={cartProduct} />
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
