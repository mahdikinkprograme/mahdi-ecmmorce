import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import CheckoutSteps from "../Components/CheckoutSteps";
import { cartClear, setPrices } from "../redux/features/cartSlice";
import "../styles/PlaceOrder.css";

function PlaceOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { shippingAdress } = useSelector((state) => state.cart);
  const { paymentMethod } = useSelector((state) => state.cart);
  const { itemsPrice } = useSelector((state) => state.cart);
  const { shippingPrice } = useSelector((state) => state.cart);
  const { taxPrice } = useSelector((state) => state.cart);
  const { totalPrice } = useSelector((state) => state.cart);
  const { userId } = useSelector((state) => state.auth);
  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/orders", {
        orderItems: cartItems,
        shippingAdress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        userId,
      });
      localStorage.setItem("order", JSON.stringify(response.data));
      dispatch(cartClear());
      navigate("/order/" + response.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!paymentMethod) navigate("/payment");
  }, [paymentMethod, navigate]);
  useEffect(() => {
    dispatch(setPrices());
  }, [dispatch]);
  return (
    <div className="order-container">
      <div className="order-row">
        <div className="order-col">
          <h2 className="order-title">Order Preview</h2>
        </div>
        <div className="order-col">
          <CheckoutSteps step1 step2 step3 step4 />
        </div>
      </div>
      <div className="order-row">
        <div className="order-col">
          <div className="order-shipping">
            <h2 className="order-shipping-title">Shipping</h2>
            <p className="order-shipping-info">
              {shippingAdress.fullName}, {shippingAdress.adress},{" "}
              {shippingAdress.city}, {shippingAdress.postalCode},{" "}
              {shippingAdress.country}{" "}
              <NavLink to="/shipping">
                <i className="fa fa-pencil"></i> Edit
              </NavLink>
            </p>
          </div>
          <div className="order-payment">
            <h2>Payment:</h2>
            <span>{paymentMethod}</span>
          </div>
          <div className="order-items">
            <h2 className="order-items-title">Items:</h2>
            <div className="order-cards">
              {cartItems.map((item) => (
                <div className="order-card" key={item._id}>
                  <div className="order-card-body">
                    <img src={item.image} />
                    <NavLink to={`/product/${item._id}`}>{item.name}</NavLink>
                  </div>
                  <div className="order-card-footer">
                    <span>Quantity: {item.qty}</span>
                    <span>${item.newprice}</span>
                  </div>
                </div>
              ))}
            </div>
            <NavLink className="order-edit" to="/cart">
              <i className="fa fa-pencil"></i> Edit
            </NavLink>
          </div>
        </div>
        <div className="order-col">
          <h2 className="order-summary">Order Summary</h2>
          <div className="order-summary-info">
            <h4>Items</h4>
            <span>${itemsPrice.toFixed(2)}</span>
          </div>
          <div className="order-summary-info">
            <h4>Shipping</h4>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div className="order-summary-info">
            <h4>Tax</h4>
            <span>${taxPrice.toFixed(2)}</span>
          </div>
          <div className="order-summary-info">
            <h4>Total</h4>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="order-summary-button">
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
