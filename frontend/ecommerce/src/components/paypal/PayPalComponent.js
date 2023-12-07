import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default function PayPalComponent({ checkOutData, cartTotalPrice }) {

  // const navigate = useNavigate();
 
 
  // const [address, setAddress] = useState({
  //   street: "",
  //   city: "",
  //   state: "",
  //   zip: "",
  // });

  const onSuccess = (details, data) => {


    // console.log("Transaction completed by " + details.payer.name.given_name);
    
  };

  const onCancel = (data) => {
    console.log("Transaction canceled");
  };

  const onError = (err) => {
    console.error("Error during transaction:", err);
  };

  return (
    <PayPalButton
      amount="10.00"
      currency="USD"
      onSuccess={onSuccess}
      onCancel={onCancel}
      onError={onError}
      options={{
        clientId:
          "AUMOtuqPoE1wh-7WsGsUwZFZ1OAnfnHRlPnpVp77CYW02WE_qxllUDkUArKjieNpB7dB-Sdlcz08vMfa",
      }}
    />
  );
}
