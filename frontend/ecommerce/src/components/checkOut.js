import { useContext, useEffect, useState } from "react";
import "../styles/Style.css";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { addOrder, sendEmail } from "../network/network";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context";
import PayPalComponent from "./paypal/PayPalComponent";

export default function CheckOut() {
  const navigate = useNavigate();
  const { cartData, setCartData } = useContext(GlobalContext);
  const [checkOutData, setCheckOutData] = useState(0);
  const [payMethod, setPayMethod] = useState("");
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const invalidAddress =
    address.street == "" ||
    address.city == "" ||
    address.zip == "" ||
    address.state == "";
  const location = useLocation();

  let cartTotal = 0;

  useEffect(() => {
    setCheckOutData(location.state);
    setCartTotalPrice(getCartTotal());
    // console.log(location.state.cartData);
    // console.log("location.state: ", location.state);
  }, [location.state, payMethod, cartTotalPrice]);

  const getCartTotal = () => {
    location.state.cartData.map((cartItem) => (cartTotal += cartItem.price));
    return cartTotal;
  };

  const addressOnChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePaySelect = (e) => {
    setPayMethod(e.target.value);
    console.log("selected:", e.target.value);
  };

  const handleCheckOut = (e) => {
    console.log("checkout clicked");

    const copyFromLocation = [...location.state.cartData];
    const userId = jwtDecode(localStorage.getItem("user")).userId;
    const userEmail = jwtDecode(localStorage.getItem("user")).email;
    const totalAmount = cartTotalPrice;
    const orderDateTime = Date.now();
    const payment = { method: payMethod };
    console.log(payment);
    const status = "ordered";
    const items = checkOutData.cartData;
    console.log("items: ", items);

    const order = {
      userId,
      items,
      totalAmount,
      orderDateTime,
      payment,
      status,
    };
    sendEmail(userEmail);

    addOrder(order, localStorage.getItem("user"));
    localStorage.removeItem("cart");
    setCartTotalPrice(0);
    setCheckOutData([]);
    setCartData([]);
    alert("Checkout successful");
    navigate("/");
  };

  return (
    <div>
      <div className="checkout-header">
        <h3>Checkout: {location.state.cartData.length} Items</h3>
      </div>
      <div className="checkout-body-container">
        <div className="checkout-container">
          <div className="checkout-details">
            <div className="shipping-container">
              <div className="index">
                <h4>1</h4>
              </div>
              <div className="shipping-container-header">
                <h4> Shipping Address</h4>
              </div>
              <div className="shipping-container-body">
                <form>
                  <input
                    type="text"
                    placeholder="Street Address"
                    name="street"
                    onChange={addressOnChange}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={addressOnChange}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    onChange={addressOnChange}
                  />
                  <input
                    type="text"
                    placeholder="Zip code"
                    name="zip"
                    onChange={addressOnChange}
                  />
                </form>
                <h4> Your current Address: </h4>
                <p>
                  {invalidAddress ? (
                    <p>No valid address entered</p>
                  ) : (
                    <p>
                      {address.street} {address.city} {address.state}{" "}
                      {address.zip}
                    </p>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="checkout-details">
            <div className="shipping-container">
              <div className="index">
                <h4>2</h4>
              </div>
              <div className="shipping-container-header">
                <h4> Payment Method</h4>
              </div>
              <div className="shipping-container-body">
                <div className="payment-container">
                  <h3>Select the payment method</h3>
                  <select
                    className="payment-method-select"
                    onChange={handlePaySelect}
                  >
                    <option value=""></option>
                    <option value="paypal">Paypal</option>
                    <option value="card">Card</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {payMethod === "paypal" && (
            <div className="paypal-setting">
              <PayPalComponent prop = {{checkOutData, cartTotalPrice}} />
            </div>
          )}
        </div>

        <div className="place-order-container">
          <h3>Place Order</h3>
          <button onClick={handleCheckOut}>Place order</button>
          <div className="place-order-summery">
            <p>Number of items: {location.state.cartData.length}</p>
            <p> Total Amount: {getCartTotal()} </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

