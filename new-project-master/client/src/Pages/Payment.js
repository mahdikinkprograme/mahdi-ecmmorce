import React, { useEffect, useState } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Payment.css";
import { savePaymentMethod } from "../redux/features/cartSlice";

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state) => state.cart);
  const { shippingAdress } = useSelector((state) => state.cart);
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "Cash"
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodName));
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  useEffect(() => {
    if (!shippingAdress.adress) navigate("/shipping");
  }, [navigate, shippingAdress]);
  return (
    <div className="payment-container">
      <div className="payment-row">
        <div className="payment-col">
          <h2 className="payment-title">Payment Method</h2>
        </div>
        <div className="payment-col">
          <CheckoutSteps step1 step2 step3 />
        </div>
      </div>
      <div className="payment-row">
        <div className="payment-col">
          <form onSubmit={handleSubmit}>
            {/* <div className="form-group">
              <label htmlFor="paypal">PayPal</label>
              <input
                type="radio"
                value="PayPal"
                checked={paymentMethodName === "PayPal"}
                className="radio"
                name=""
                id="paypal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="adress">Cash</label>
              <input
                type="radio"
                value="Cash"
                checked={paymentMethodName === "Cash"}
                className="radio"
                name=""
                id="cash"
                onChange={(e) => setPaymentMethodName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit">Continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
