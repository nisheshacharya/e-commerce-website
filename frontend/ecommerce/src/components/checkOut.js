import { useEffect, useState } from "react";
import "../styles/Style.css";
import { useLocation } from "react-router-dom";

export default function CheckOut() {
  const [checkOutData, setCheckOutData] = useState(0);
  const [payMethod, setPayMethod] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const location = useLocation();
  let orderData = [];
  let copyFromLocation = [];
  let cartTotal = 0;

  useEffect(
    () => {
      setCheckOutData(location.state);
      console.log(location.state.cartData);
      console.log("location.state: ", location.state);
    },
    [location.state],
    [address]
  );

  const getCartTotal = () => {
    location.state.cartData.map((cartItem) => (cartTotal += cartItem.price));
    return cartTotal;
  };

  const addressOnChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    console.log(address);
  };

  const handlePaySelect = (e) => {
    setPayMethod(e.target.value);
    console.log("selected", e.target.value);
  };

  const handleCheckOut = () => {
    copyFromLocation = [...location.state.cartData];
    console.log(copyFromLocation);
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
                <form onSubmit={handleAddressSubmit}>
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
                  <input type="submit" value="Set Address" />
                </form>
                <h4> Your current Address: </h4>
                <p>
                  {address.street == "" ||
                  address.city == "" ||
                  address.zip == "" ||
                  address.state == "" ? (
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

/*
const order = {
  _id: ObjectId,
  userId: ObjectId,
  items: [
    {
      productId: ObjectId,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  orderDateTime: string,
  payment: {
    method: string, //cash, debit, credit
    amount: number
  },
  status: string,

*/
