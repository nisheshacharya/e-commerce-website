import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function EditProfile() {
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state && location.state.readableToken) {
      const { userName, email } = location.state.readableToken;
      setUserName(userName);
      setEmail(email);
      console.log(location.state.readableToken);
    }
  }, [location.state]);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSaveChanges = () => {};

  return (
    <div>
      <h3>Edit Profile</h3>
      <div>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="userName"
          placeholder=""
          value={userName}
          onChange={handleUserNameChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
}
