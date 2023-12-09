import React, { useContext, useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { addOrder, sendEmail, updateProductQuantity } from "../../network/network";
import GlobalContext from "../../context";

export default function PayPalComponent(prop) {
  const navigate = useNavigate();
  const { cartData, setCartData } = useContext(GlobalContext);
  console.log(prop.prop);

  const items = prop.prop.checkOutData.cartData;
  const totalAmount = prop.prop.cartTotalPrice.toFixed(2);
  const userId = jwtDecode(localStorage.getItem("user")).userId;
  const userEmail = jwtDecode(localStorage.getItem("user")).email;
  const payment = { method: prop.prop.payMethod };
  const orderDateTime = Date.now();
  const status = "Ordered";

  const order = {
    userId,
    items,
    totalAmount,
    orderDateTime,
    payment,
    status,
  };

  console.log(order);
  console.log("item, ", items);

  useEffect(() => {
    console.log(prop);
    console.log(prop.prop.cartTotalPrice);
    console.log(prop.prop.checkOutData.cartData);
    
  });
  const updateQuantities = async () => {
    try {
      
      for (const item of items) {
        const { productId, quantity } = item;

        
        await updateProductQuantity(productId, quantity - 1, localStorage.getItem("user"));
      }
    } catch (error) {
      console.error("Error updating product quantities:", error);
      throw error;
    }
  };





  const onSuccess = (details, data) => {
    sendEmail(userEmail);
    addOrder(order, localStorage.getItem("user"));
    localStorage.removeItem("cart");
    setCartData([]);
    alert("Checkout successful");
    console.log(details);
    console.log(data);
    navigate("/orders");
  };

  const onCancel = (data) => {
    console.log("Transaction canceled");
  };

  const onError = (err) => {
    console.error("Error during transaction:", err);
  };

  return (
    <PayPalButton
      amount={"0.01"}
      currency="USD"
      onSuccess={onSuccess}
      onCancel={onCancel}
      onError={onError}
      options={{
        clientId:
          "AUMOtuqPoE1wh-7WsGsUwZFZ1OAnfnHRlPnpVp77CYW02WE_qxllUDkUArKjieNpB7dB-Sdlcz08vMfa",
      }}
    />
  );
}
