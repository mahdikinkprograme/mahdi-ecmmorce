import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  addToCart,
  decreaseQty,
  removeFromCart,
} from "../redux/features/cartSlice";
import "../styles/Cart.css";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { username } = useSelector((state) => state.auth);
  const handleCheckout = () => {
    if (username) navigate("/shipping");
    else navigate("/login");
  };
  return (
    <div className="cart-container">
      <div className="cart-row">
        <h2 className="cart-title">Shopping Cart</h2>
      </div>
      <div className="cart-row">
        <div className="cart-col">
          {cartItems.length === 0 ? (
            <h3 className="info">
              Cart Is Empty. <NavLink to="/shop">Go Shopping</NavLink>
            </h3>
          ) : (
            <div className="cart-cards">
              {cartItems.map((item) => (
                <div className="cart-card" key={item._id}>
                  <div className="cart-header">
                    <img src={item.image} />
                  </div>
                  <div className="cart-body">
                    <NavLink to={`/product/${item._id}`}>{item.name}</NavLink>
                    <div className="buttons">
                      <button onClick={() => dispatch(decreaseQty(item))}>
                        <i className="fa fa-minus-circle"></i>
                      </button>{" "}
                      <span className="cart-qty">{item.qty}</span>{" "}
                      <button onClick={() => dispatch(addToCart(item))}>
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                  <div className="cart-footer">
                    <span className="cart-newprice">${item.newprice}</span>
                    {item.oldprice && (
                      <span className="cart-oldprice">${item.oldprice}</span>
                    )}
                    <button onClick={() => dispatch(removeFromCart(item))}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="cart-col">
          <div className="checkout-card">
            <div className="checkout-body">
              <h3 className="checkout-title">
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.newprice * c.qty, 0)}
              </h3>
            </div>
            <div className="checkout-footer">
              <button
                className="checkout-btn"
                type="button"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
