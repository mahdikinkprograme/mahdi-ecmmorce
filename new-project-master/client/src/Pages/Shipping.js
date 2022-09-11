import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Shipping.css";
import { saveShippingAdress } from "../redux/features/cartSlice";
import CheckoutSteps from "../Components/CheckoutSteps";

function Shipping() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAdress } = useSelector((state) => state.cart);
  const [info, setInfo] = useState({
    fullName: shippingAdress.fullName || "",
    adress: shippingAdress.adress || "",
    city: shippingAdress.city || "",
    postalCode: shippingAdress.postalCode || "",
    country: shippingAdress.country || "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAdress({
        fullName: info.fullName,
        adress: info.adress,
        city: info.city,
        postalCode: info.postalCode,
        country: info.country,
      })
    );
    localStorage.setItem(
      "shippingAdress",
      JSON.stringify({
        fullName: info.fullName,
        adress: info.adress,
        city: info.city,
        postalCode: info.postalCode,
        country: info.country,
      })
    );
    navigate("/payment");
  };
  return (
    <div className="shipping-container">
      <div className="shipping-row">
        <div className="shipping-col">
          <h2 className="shipping-title">Shipping Adress</h2>
        </div>
        <div className="shipping-col">
          <CheckoutSteps step1 step2 />
        </div>
      </div>
      <div className="shipping-row">
        <div className="shipping-col">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                value={info.fullName}
                id="name"
                required
                onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="adress">Adress</label>
              <input
                type="text"
                value={info.adress}
                id="adress"
                required
                onChange={(e) => setInfo({ ...info, adress: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                value={info.city}
                id="city"
                required
                onChange={(e) => setInfo({ ...info, city: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="code">Postal Code</label>
              <input
                type="text"
                value={info.postalCode}
                id="code"
                required
                onChange={(e) =>
                  setInfo({ ...info, postalCode: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                value={info.country}
                id="country"
                required
                onChange={(e) => setInfo({ ...info, country: e.target.value })}
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

export default Shipping;
