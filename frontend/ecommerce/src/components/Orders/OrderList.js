import React, { useContext, useEffect, useState } from "react";
import Order from "./Order";
import { getAllOrders, pullOrdersByUsers } from "../../network/network";
import Header from "../Header";
import GlobalContext from "../../context";
import { jwtDecode } from "jwt-decode";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const { state, setState } = useContext(GlobalContext);

  const token = localStorage.getItem("user");
  const userId = jwtDecode(token).userId;
  const role = jwtDecode(token).role;

  let array = [];

  useEffect(() => {
    if (role === "admin") {
      getOrders();
    } else {
      userOrders();
    }
  }, []);

  const getOrders = async () => {
    try {
      const orderData = await getAllOrders();
      setOrders(orderData);
    } catch (error) {
      console.error("Error getting orders");
    }
  };

  const userOrders = async () => {
    try {
      const orderDataByUser = await pullOrdersByUsers(userId, token);
      // console.log(orderDataByUser.data);
      setOrders(orderDataByUser.data);
    } catch (error) {
      console.error("Error getting order");
    }
  };


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
