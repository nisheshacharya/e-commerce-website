// OrderList.js

import React, { useEffect, useState } from "react";
import Order from "./Order";
import { getAllOrders } from "../../network/network";
import Header from "../Header";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderData = await getAllOrders();
        console.log(orderData);
        setOrders(orderData);
      } catch (error) {
        console.error("Error getting orders");
      }
    };
    getOrders();
  }, []);

  return (
    <div>
      <Header />
      <h2>Order List</h2>
      {orders.map((order) => (
        <Order key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
