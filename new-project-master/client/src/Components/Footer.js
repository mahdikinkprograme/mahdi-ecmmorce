import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="f-container">
      <div className="f-row">
        <div className="f-col">
          <h1 className="logo">OnlineShop</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            corporis perspiciatis fuga. Harum voluptatibus alias optio nihil
            itaque dolores nisi ut deleniti tenetur consequntur.
          </p>
        </div>
        <div className="f-col">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className="f-col">
          <h2>Category</h2>
          <ul>
            <li>
              <NavLink to="/">Headphones</NavLink>
            </li>
            <li>
              <NavLink to="/">Watches</NavLink>
            </li>
            <li>
              <NavLink to="/">Smartphones</NavLink>
            </li>
          </ul>
        </div>
        <div className="f-col">
          <h2>Stay in touch with us</h2>
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
      <div className="f-copyrow">
        <p>
          &copy; 2022. All Rights Reserved. Powered By{" "}
          <span>Mahdi Siblibi</span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
