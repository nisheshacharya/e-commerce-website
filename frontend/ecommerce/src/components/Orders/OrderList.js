import React from 'react';
import Order from './Order'; // Import the Order component

const OrderList = ({ orders }) => {
    
  return (
    <div>
      <h2>Order List</h2>
      {/* {orders.map((order) => (
        <Order key={order.orderId} order={order} />
      ))} */}
    </div>
  );
};

export default OrderList;
