import '../../styles/Style.css';
import { useContext, useEffect, useState} from "react";
import { getUserName } from "../../network/network";
import GlobalContext from '../../context';





export default function Product({ product }) {
  // console.log("product: ", product);
  const [averageRating, setAverageRating] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const {cartData, setCartData} = useContext(GlobalContext);


  let totalRating = 0;
  useEffect(() => {
    product.reviews.map((review) => (totalRating += review.rating));
    setAverageRating((totalRating / product.reviews.length).toFixed(1));
  });

  const toggleReview = () => {
    setShowReview(!showReview);
  };


  const addToCart = ()=>{

    let cartProduct = {...product};
     
    cartProduct.cartId = Date.now().toString();

    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    localCart.push(cartProduct)
    localStorage.setItem("cart", JSON.stringify(localCart));
  
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
