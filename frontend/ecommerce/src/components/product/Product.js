import '../../styles/Style.css'
import { useEffect, useState } from "react";
import { getUserName } from "../../network/network";

export default function Product({ product }) {
  const [averageRating, setAverageRating] = useState(null);
  const [showReview, setShowReview] = useState(false);

  let totalRating = 0;

  console.log(product);

  useEffect(()=>{
    product.reviews.map((review)=>(totalRating += review.rating))
    console.log(totalRating)
    setAverageRating(totalRating/product.reviews.length)
    console.log("average rating", averageRating);
  })
  const toggleReview = ()=>{
    setShowReview(!showReview);
    console.log(showReview)
  }

  return (
    <div className="product-container">
      <div className="product-description-container">
        <h2>{product.name}</h2>
        <h3>Rating: {averageRating}</h3>
        <div>
        {product.images.map(image=> (<img src="${image}" />))}
        </div>
        <button>Add to cart</button>
        <button onClick={toggleReview}> {showReview ? "Hide Review" : "Show Review"}</button>
      </div>

      {showReview && <div className="review-container">
        <h4> Reviews</h4>
        <div className="review">
        {
        product.reviews.map((review) => (<div className="review-each" key={review._id}> 
        <p>{review.text}</p>
        <h5> - {review.name || "Unknown User"}</h5>
        </div>))
        }
        </div>
      </div> }
    </div>
  );
}
