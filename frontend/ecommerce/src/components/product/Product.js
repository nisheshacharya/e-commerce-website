import "../../styles/Style.css";

import { useContext, useEffect, useState } from "react";
import { getUserName } from "../../network/network";
import GlobalContext from "../../context";
import { useNavigate } from "react-router-dom";

export default function Product({ product, isAdmin }) {
 
  const [averageRating, setAverageRating] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const {state, setState, cartData, setCartData } = useContext(GlobalContext);
  const navigate = useNavigate();

  let totalRating = 0;
  useEffect(() => {
    product.reviews.map((review) => (totalRating += review.rating));
    setAverageRating((totalRating / product.reviews.length).toFixed(1));
  }, []);

  const toggleReview = () => {
    setShowReview(!showReview);
  };

  const addToCart = () => {
    let cartProduct = { ...product };

    cartProduct.cartId = Date.now().toString();
    cartProduct.orderDateTime = Date.now().toString();

    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    localCart.push(cartProduct);
    localStorage.setItem("cart", JSON.stringify(localCart));
    setCartData(JSON.stringify(localCart));
    console.log("cart data set");
  };

  return (
    <div className="product-container">
      <div className="product-description-container">
        <div>
          <h3>{product.name}</h3>
        </div>
        <div>
          <img src={product.images[0]} />
          <p>{product.description}</p>
          <p>$ {product.price}</p>
          <h5>Rating: {averageRating}</h5>
        </div>

        {!isAdmin && <button onClick={addToCart}>Add to cart</button>}
        <button onClick={toggleReview}>
          {showReview ? "Hide Review" : "Show Review"}
        </button>

        {isAdmin && (
          <button onClick={() => navigate(`/edit-product/${product._id}`)}>
            Edit Product
          </button>
        )}
      </div>

      {showReview && (
        <div className="review-container">
          <h4> Reviews</h4>
          <div className="review">
            {product.reviews.map((review) => (
              <div className="review-each" key={review._id}>
                <p>{review.text}</p>
                <h5> - {review.name || "Unknown User"}</h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
