import { useEffect, useState } from "react";
import { getUserName } from "../../network/network";

export default function Product({ product }) {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        console.log();
        const userObject = await getUserName(product.reviews[0].userId);
        console.log("name: ", userObject.user.userName)
        setUserName(userObject.user.userName);
      } catch (error) {
        console.error("Error getting name", error);
      }
    };

    fetchUserName();
  }, [product.reviews]); // Make sure to include the dependency array to prevent unnecessary re-renders

  console.log("product::::", product.reviews[0].text);

  return (
    <div>
      <div className="product-description-container">
        <h2>{product.name}</h2>
        <p>{userName ? `Reviewed by: ${userName}` : "Loading..."}</p>
      </div>
      <div className="review-container">
        <h3> Reviews</h3>
        <p>{product.reviews.map((review) => <div key={review._id}>{review.text}</div>)}</p>
      </div>
    </div>
  );
}
