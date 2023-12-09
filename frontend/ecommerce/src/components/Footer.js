import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Welcome to OrganicMart, your one-stop shop for organic products.
          </p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@organicmart.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>Stay connected on social media:</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 OrganicMart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
