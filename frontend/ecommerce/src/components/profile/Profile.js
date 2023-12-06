import React from "react";
import "../../styles/Style.css"; // Import your CSS file
import Header from "../Header";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const userName = "User";
  const userEmail = "user@example.com";

  const handleEditDetails = () => {
    console.log("Edit details clicked");
  };

  const getDecryptedToken = () => jwtDecode(localStorage.getItem("user"));

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h2 className="greeting">Greetings, {getDecryptedToken().userName}!</h2>
        <p className="email">User name: {getDecryptedToken().userName}</p>
        <p className="email">Email: {getDecryptedToken().email}</p>
        <button className="edit-button" onClick={handleEditDetails}>
          Edit Details
        </button>
      </div>
    </div>
  );
}
