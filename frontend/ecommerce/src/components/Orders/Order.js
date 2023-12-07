import React, { useState, useEffect } from "react";
import "../../styles/Style.css";
import OrderDetail from "./OrderDetails";

export default function Order({ order }) {
  const { orderDateTime, totalAmount, items } = order;
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [viewDetail, setViewDetail] = useState(false);

  // const firstItemImage =
  //   items && items.length > 0 && items[0].images && items[0].images.length > 0
  //     ? items[0].images[0]
  //     : null;

  console.log("order: ", order);
  console.log("items: ", order.items);

  useEffect(() => {
    const itemsArray = items;
    if (Array.isArray(itemsArray)) {
      setItemList(itemsArray);
      console.log("item List: ", itemsArray);
    }
  }, [order.items]);

  const handleViewOrderDetail = () => {
    setShowOrderDetail(!showOrderDetail);
  };

  console.log("item lsist", itemList);

  return (
    <div className="order-container">
      <div className="order-detail-div">
        <div className="order-details">
          <p className="order-date">
            Order Date: {new Date(orderDateTime).toLocaleString()}
          </p>
          <p>Number of items: {Array.isArray(items) ? items.length : 0}</p>
          <p className="total-amount">
            Total Amount: ${totalAmount.toFixed(2)}
          </p>
          <button className="view-order-button" onClick={handleViewOrderDetail}>
            {!showOrderDetail ? "View Order" : "Hide Order"}
          </button>
        </div>
        {showOrderDetail && (
          <div className="order-detail-container">
            {itemList.map((item) => (
              <div className="item-detail">
                <p>Name: {item.name}</p>
                <p>Price: {item.price}</p>
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt="Product"
                    className="product-image"
                  />
                ) : (
                  ""
                )}
                <button className="review-button">Write a Review</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
// <button className="review-button">Write a Review</button>
