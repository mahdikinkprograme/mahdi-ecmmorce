import React from "react";
import "../styles/Banners.css";

function Banners() {
  return (
    <div className="b-container">
      <div className="b-row">
        <div className="b-col">
          <i className="fa fa-check"></i>
          <span>Quality Product</span>
        </div>
        <div className="b-col">
          <i className="fa fa-truck"></i>
          <span>Free Shipping</span>
        </div>
        <div className="b-col">
          <div>
            <i className="fa fa-long-arrow-right"></i>
            <i className="fa fa-long-arrow-left"></i>
          </div>
          <span>14 Day Return</span>
        </div>
        <div className="b-col">
          <i className="fa fa-volume-control-phone"></i>
          <span>24/7 Support</span>
        </div>
      </div>
    </div>
  );
}

export default Banners;
