import '../../styles/Style.css';
import { useEffect, useState } from "react";
import { getUserName } from "../../network/network";

export default function Product({ product }) {
  console.log("product: ", product);
  const [averageRating, setAverageRating] = useState(null);
  const [showReview, setShowReview] = useState(false);

  let totalRating = 0;

  console.log(product);

  useEffect(() => {
    product.reviews.map((review) => (totalRating += review.rating));
    console.log(totalRating);
    setAverageRating(totalRating / product.reviews.length);
    console.log("average rating", averageRating);
  });

  const toggleReview = () => {
    setShowReview(!showReview);
    console.log("fda",showReview);
  };

  const hello = () =>{

    console.log("hello");
  }

  const addToCart = ()=>{
    console.log("add to cart clicked");
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    localCart.push(product)
    localStorage.setItem("cart", JSON.stringify(localCart));
    console.log("saved in Local Storage")
    console.log("from local storage: ", JSON.parse(localStorage.getItem("cart")))
    }
  

  return (
    <div className="product-container">
      <div className="product-description-container">

        <h2>{product.name}</h2>
        <h3>Rating: {averageRating}</h3>

        <div>
          {product.images.map((image, index) => (
            <img key={index} src={image} alt={`Product Image ${index + 1} ${image}`} />
          ))}
        </div>
        
        <button onClick={addToCart}>Add to cart</button>
        <button onClick={toggleReview}>{showReview ? "Hide Review" : "Show Review"}</button>
        

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
