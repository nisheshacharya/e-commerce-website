# E-Commerce Website

An e-commerce website built with a modern web stack using React, Node.js, Express, MongoDB, and RESTful APIs. This platform allows customers to browse products, manage their cart, and make purchases. Admins can manage products, monitor customer activity, and handle inventory.

## Features

### Customer
- **Signup/Login**: Create an account and securely log in with JWT-based authentication.
- **Add/Remove Products from Cart**: Easily add items to your cart, update quantities, or remove products.
- **Checkout**: Seamless checkout process, with integrated PayPal payment option.
- **Review and Rate Products**: Leave a review and give a rating on purchased products. Edit your reviews if needed.

### Admin
- **Product Management**: Admins can add new products, edit existing product details, and delete products from the inventory.

### Additional Features
- **JWT Authorization and Authentication**: Secure authentication for both customers and admins.
- **Email Notifications**: Automated email notifications for order confirmations using Nodemailer.
- **PayPal Integration**: Integrated PayPal button for secure online payments.

## Technologies Used
- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express, MongoDB
- **API**: REST API for handling backend services
- **Authentication**: JWT (JSON Web Token) for secure user authentication and authorization
- **Payment**: PayPal button integration for secure payments
- **Email Service**: Nodemailer for email notifications

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- PayPal account for payment integration

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/nisheshacharya/e-commerce-website.git
    ```
2. Navigate to the project directory:
    ```bash
    cd e-commerce-website
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables for MongoDB, JWT secret, and Nodemailer:
    ```
    MONGO_URI=your_mongoDB_URI
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email_address
    EMAIL_PASS=your_email_password
    ```

5. Run the backend server:
    ```bash
    npm run server
    ```
6. Run the React frontend:
    ```bash
    npm start
    ```


