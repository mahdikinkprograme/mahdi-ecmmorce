import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeFromwish } from "../redux/features/wishSlice";
import "../styles/Cart.css";

function Wish() {
  const dispatch = useDispatch();
  const { wishItems } = useSelector((state) => state.wish);
  return (
    <div className="cart-container">
      <div className="cart-row">
        <h2 className="cart-title">Wish List</h2>
      </div>
      <div className="cart-row">
        <div className="cart-col">
          {wishItems.length === 0 ? (
            <h3 className="info">Your Wish List Is Empty.</h3>
          ) : (
            <div className="wish-cards">
              {wishItems.map((item) => (
                <div className="cart-card" key={item._id}>
                  <div className="cart-header">
                    <img src={item.image} />
                  </div>
                  <div className="cart-body">
                    <NavLink to={`/product/${item._id}`}>{item.name}</NavLink>
                  </div>
                  <div className="cart-footer">
                    <span className="cart-newprice">${item.newprice}</span>
                    {item.oldprice && (
                      <span className="cart-oldprice">${item.oldprice}</span>
                    )}
                    <button onClick={() => dispatch(removeFromwish(item))}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <div className="cart-col">
          <div className="checkout-card">
            <div className="checkout-body">
              <h3 className="checkout-title">
                Subtotal ({wishItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {wishItems.reduce((a, c) => a + c.newprice * c.qty, 0)}
              </h3>
            </div>
            <div className="checkout-footer">
              <button
                className="checkout-btn"
                type="button"
                disabled={wishItems.length === 0}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Wish;
