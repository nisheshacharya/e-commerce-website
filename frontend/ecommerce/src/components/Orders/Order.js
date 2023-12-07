import React, { useState, useEffect } from "react";
import "../../styles/Style.css";
import OrderDetail from "./OrderDetails";
import { useNavigate, Link } from "react-router-dom";

export default function Order({ order }) {
  const { orderDateTime, totalAmount, items } = order;
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [viewDetail, setViewDetail] = useState(false);

  const navigate = useNavigate();

  // const firstItemImage =
  //   items && items.length > 0 && items[0].images && items[0].images.length > 0
  //     ? items[0].images[0]
  //     : null;

  // console.log("order: ", order);
  // console.log("items: ", order.items);

  useEffect(() => {
    const itemsArray = items;
    if (Array.isArray(itemsArray)) {
      const uniqueItemsArray = itemsArray.reduce((acc, obj) => {
        const existingObj = acc.find(
          (item) => item.productId === obj.productId
        );

        if (!existingObj) {
          acc.push({ obj, count: 1 });
        } else {
          existingObj.count += 1;
        }
        return acc;
      }, []);
      // console.log("unique items array", uniqueItemsArray);

      setItemList(uniqueItemsArray);
      console.log("item List: ", uniqueItemsArray);
    }
  }, [order.items]);

  const handleViewOrderDetail = () => {
    setShowOrderDetail(!showOrderDetail);
  };

  // console.log("item lsist", itemList);

  // itemList.map((item) => {
  //   console.log(item.obj._id);
  // });

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
                <p>Name: {item.obj.name}</p>
                <p>Price: {item.obj.price}</p>
                <p>Count: {item.count}</p>

                {item.obj.images && item.obj.images.length > 0 ? (
                  <img
                    src={item.obj.images[0]}
                    alt="Product"
                    className="product-image"
                  />
                ) : (
                  ""
                )}

                <Link to={{ pathname: "/product/addreview" }} state={{ item }}>
                  Write a Review
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
// <button className="review-button">Write a Review</button>
