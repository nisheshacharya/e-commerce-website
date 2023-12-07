import React from "react";
import "../../styles/Style.css";
import Header from "../Header";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export default function Profile() {
  const handleEditDetails = () => {
    console.log("Edit details clicked");
  };

  const getDecryptedToken = () => jwtDecode(localStorage.getItem("user"));
  const readableToken = getDecryptedToken();

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h2 className="greeting">Greetings, {readableToken.userName}!</h2>
        <p className="email">User name: {readableToken.userName}</p>
        <p className="email">Email: {readableToken.email}</p>

        <Link
          to={{
            pathname: "/editprofile",
          }}
          state={{ readableToken }}
        >
          <button>Edit details</button>
        </Link>
      </div>
    </div>
  );
}
