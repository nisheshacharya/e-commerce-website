import React, { useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { addOrder, sendEmail } from "../../network/network";

export default function PayPalComponent(prop) {
  const navigate = useNavigate();
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

  useEffect(() => {
    console.log(prop);
    console.log(prop.prop.cartTotalPrice);
    console.log(prop.prop.checkOutData.cartData);
    // console.log(prop.prop)
  });

  const onSuccess = (details, data) => {
    sendEmail(userEmail);
    addOrder(order, localStorage.getItem("user"));
    localStorage.removeItem("cart");
    alert("Checkout successful");
    navigate("/");
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
