import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/Style.css";
import GlobalContext from "../../context";
import { jwtDecode } from "jwt-decode";
import { addReview } from "../../network/network";
import { useNavigate } from "react-router-dom";

export default function AddReview() {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.state.item.obj);
    console.log(jwtDecode(localStorage.getItem("user")).userName);
  });

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
    console.log(e.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleAddReview = async () => {
    if (reviewText && rating >= 1 && rating <= 5) {
      const productId = location.state.item.obj._id;
      const token = localStorage.getItem("user");
      const userId = jwtDecode(localStorage.getItem("user")).userId;
      const textReview = reviewText;
      const productRating = rating;
      const userName = jwtDecode(localStorage.getItem("user")).userName;

      const review = {
        userId: userId,
        text: textReview,
        rating: productRating,
        userName: userName,
      };

      try {
        const result = await addReview(productId, review, token);
        console.log("Review added successfully", result);
        navigate("/orders");
      } catch (error) {
        console.error("Error adding review", error);
      }
    } else {
      alert("Please provide a valid review and rating (between 1 and 5).");
    }
  };

  return (
    <div className="add-review-container">
      <h2>Add Review</h2>
      <label>
        Review:
        <input
          type="text"
          value={reviewText}
          name="review"
          onChange={handleReviewTextChange}
        />
      </label>
      <br />
      <label>
        Rating (out of 10):
        <input
          type="number"
          value={rating}
          onChange={handleRatingChange}
          min="1"
          max="10"
        />
      </label>
      <br />
      <button onClick={handleAddReview}>Submit Review</button>
    </div>
  );
}
