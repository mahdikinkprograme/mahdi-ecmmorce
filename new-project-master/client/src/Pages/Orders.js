import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Orders.css";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(
    localStorage.getItem("orders")
      ? JSON.parse(localStorage.getItem("orders"))
      : []
  );
  console.log(orders);
  const handleNavigete = (_id) => {
    navigate(`/order/${_id}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="orderhistory-container">
      <div className="orderhistory-row">
        <div className="orderhistory-col">
          <h2 className="orderhistory-title">Order History</h2>
        </div>
      </div>
      <div className="orderhistory-row">
        <div className="orderhistory-col">
          <div className="tables">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVRED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.createdAt.substring(0, 10)}</td>
                    <td>{item.totalPrice.toFixed(2)}</td>
                    <td>
                      {orders.isPaid ? orders.paidAt.substring(0, 10) : "No"}
                    </td>
                    <td>
                      {orders.isDelivered
                        ? orders.deliveredAt.substring(0, 10)
                        : "No"}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleNavigete(item._id)}
                      >
                        Details
                      </button>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
