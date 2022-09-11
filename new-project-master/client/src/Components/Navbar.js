import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadUser, logOut } from "../redux/features/authSlice";
import { saveShippingAdress } from "../redux/features/cartSlice";
import "../styles/Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishItems } = useSelector((state) => state.wish);
  const { username } = useSelector((state) => state.auth);
  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(saveShippingAdress({}));
    dispatch(savePaymentMethod(""));
  };
  useEffect(() => {
    dispatch(
      loadUser(
        localStorage.getItem("username")
          ? localStorage.getItem("username")
          : null
      )
    );
  }, [localStorage.getItem("username")]);
  return (
    <div className="n-container">
      <div className="n-row">
        <div className="n-col">
          <span className="n-email">xyz@gmail.com</span>
          <NavLink to="/profile" className="n-link">
            <span className="n-username">
              <i className="fa fa-user-o"></i> {username ? username : "Guest"}
            </span>
          </NavLink>
        </div>
        <div className="n-col">
          <div className="socials">
            <a href="/">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="/">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="/">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="/">
              <i className="fa fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="n-row">
        <div className="n-col">
          <NavLink to="/">
            <h1 className="logo">OnlineShop</h1>
          </NavLink>
        </div>
        <div className="n-col">
          <div className="icons">
            {username ? (
              <NavLink to="/login" onClick={handleLogOut}>
                <i className="fa fa-sign-out"></i> Logout
              </NavLink>
            ) : (
              <NavLink to="/login">
                <i className="fa fa-sign-in"></i> Login
              </NavLink>
            )}
            <NavLink to="/wish">
              <span>
                <i className="fa fa-heart-o"></i>
                <span className="total-items">{wishItems.length}</span>
              </span>
            </NavLink>
            <NavLink to="/cart">
              <span>
                <i className="fa fa-shopping-cart"></i>
                <span className="total-items">{cartItems.length}</span>
              </span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="n-row">
        <nav className="nav">
          <ul className="items">
            <li className="list">
              <NavLink to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="list">
              <NavLink to="/shop" activeClassName="active">
                Shop
              </NavLink>
            </li>
            {username && (
              <li className="list">
                <NavLink to="/orders" activeClassName="active">
                  Orders
                </NavLink>
              </li>
            )}
            <li className="list">
              <NavLink to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
            <li className="list">
              <NavLink to="/contact" activeClassName="active">
                Contact
              </NavLink>
            </li>
          </ul>
          <button className="btn">BTN</button>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
