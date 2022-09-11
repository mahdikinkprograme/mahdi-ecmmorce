import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/OrderDetails.css";
function OrderDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const { token } = useSelector((state) => state.auth);
  const [order, setOrder] = useState(
    localStorage.getItem("order")
      ? JSON.parse(localStorage.getItem("order"))
      : {}
  );
  useEffect(() => {
    const fetchData = async (id) => {
      const response = await axios.get(
        `http://localhost:5000/api/orders/${id}`
      );
      setOrder(response.data);
    };
    fetchData(params._id);
  }, [params._id, localStorage.getItem("order"), token, navigate]);
  return (
    <div className="order-details-container">
      <div className="order-details-row">
        <div className="order-details-col">
          <h2 className="order-details-title">Your Order</h2>
          <h4 className="order-details-subtitle">Order Id: {order._id}</h4>
        </div>
      </div>
      <div className="order-row">
        <div className="order-col">
          <div className="order-shipping">
            <h2 className="order-shipping-title">Shipping</h2>
            <p className="order-shipping-info">
              {order.shippingAdress.fullName}, {order.shippingAdress.adress},{" "}
              {order.shippingAdress.city}, {order.shippingAdress.postalCode},{" "}
              {order.shippingAdress.country}{" "}
              <NavLink to="/shipping">
                <i className="fa fa-pencil"></i> Edit
              </NavLink>
            </p>
          </div>
          <div className="order-payment">
            <h2>Payment:</h2>
            <span>{order.paymentMethod} - </span>
            {order.isPaid ? (
              <span>Paid At {order.paidAt}</span>
            ) : (
              <span>
                Not Paid <br />
                <span className="after">* You will pay after delivrey</span>
              </span>
            )}
          </div>
          <div className="order-items">
            <h2 className="order-items-title">Items:</h2>
            <div className="order-cards">
              {order.orderItems.map((item) => (
                <div className="order-card" key={item._id}>
                  <div className="order-card-body">
                    <img src={item.image} />
                  </div>
                  <div className="order-card-footer">
                    <span>Quantity: {item.qty}</span>
                    <span>${item.newprice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="order-col">
          <h2 className="order-summary">Order Summary</h2>
          <div className="order-summary-info">
            <h4>Items</h4>
            <span>${order.itemsPrice.toFixed(2)}</span>
          </div>
          <div className="order-summary-info">
            <h4>Shipping</h4>
            <span>${order.shippingPrice.toFixed(2)}</span>
          </div>
          <div className="order-summary-info">
            <h4>Tax</h4>
            <span>${order.taxPrice.toFixed(2)}</span>
          </div>
          <div className="order-summary-info">
            <h4>Total</h4>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
