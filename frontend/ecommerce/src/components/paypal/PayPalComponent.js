import React, { useContext, useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  addOrder,
  getProductById,
  sendEmail,
  updateProduct,
  updateProductQuantity,
} from "../../network/network";
import GlobalContext from "../../context";

export default function PayPalComponent(prop) {
  const navigate = useNavigate();
  const { cartData, setCartData } = useContext(GlobalContext);
  console.log(prop.prop);

  const token = localStorage.getItem("user");
  const items = prop.prop.checkOutData.cartData;
  const totalAmount = prop.prop.cartTotalPrice;
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

  // console.log(order);
  // console.log("item, ", items);

  useEffect(() => {
    console.log(prop);
    console.log(prop.prop.cartTotalPrice);
    console.log(prop.prop.checkOutData.cartData);
  });
  const updateQuantities = async () => {
    try {
      for (const item of items) {
        const { productId, quantity } = item;

        await updateProductQuantity(
          productId,
          quantity - 1,
          localStorage.getItem("user")
        );
      }
    } catch (error) {
      console.error("Error updating product quantities:", error);
      throw error;
    }
  };

  const onSuccess = (details, data) => {
    console.time(sendEmail);
    sendEmail(userEmail);
    console.timeEnd(sendEmail);

    console.time(decreaseCount);
    decreaseCount();
    console.timeEnd(decreaseCount);

    console.time(addOrder);
    addOrder(order, localStorage.getItem("user"));
    console.timeEnd(addOrder);

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

  const decreaseCount = async () => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    let id;

    await Promise.all(
      cartItems.map(async (item) => {
        id = item._id;

        try {
          const res = await getProductById(id);
          console.log(res);

          const name = res.name;
          const description = res.description;
          const quantity = res.quantity - 1;
          const price = res.price;
          const category = res.category;
          const deleted = res.deleted;

          const dataToUpdate = {
            name: name,
            description: description,
            quantity: quantity,
            price: price,
            category: category,
            deleted: quantity > 0 ? true : false,
          };

          const updated = await updateProduct(id, dataToUpdate, token);
          // const update = await updateProduct

          console.log(updated);
        } catch (error) {
          console.error(error);
        }
      })
    );
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
