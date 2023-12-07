import React from "react";
import "../../styles/Style.css";

export default function OrderDetail({ items }) {
  return (
    <div className="order-detail-container">
      {items &&
        items.map((item, index) => (
          <div key={index} className="order-item">
            <p>Name: {item.name}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <div className="item-image">
              {item.images && item.images.length > 0 && (
                <img src={item.images[0]} alt={`Product ${index + 1}`} />
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
