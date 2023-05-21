import React from "react";
import { STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY } from "../API";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const Cart = () => {
  const SERVER_URL = "http://localhost:4000/payment";
  const successPayment = (data) => {
    alert("Payment Successful");
    console.log(JSON.stringify(data));
  };

  const errorPayment = (data) => {
    alert("Payment Error");
    console.log("Payment Error Occurs");
  };

  const onToken = (token) => {
    
    axios
      .post(SERVER_URL, {
        body: {
          description: "Stripe ",
          source: token,
          currency: "USD",
          amount: 10 * 100,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then(successPayment)
      .catch(errorPayment);
  };
  return (
    <React.Fragment>
      <h3>Stripe Payment Gateway</h3>
      <StripeCheckout
        name="Buy Your Success Path in Only 29/-"
        description="This course is Placement Assistent course"
        amount={100}
        currency="USD"
        billingAddress={true}
        stripeKey={STRIPE_PUBLIC_KEY}
        email="mayuradlak030@gmail.com"
        token={onToken}
        shippingAddress
        zipCode={true}
      />
    </React.Fragment>
  );
};
export default Cart;
