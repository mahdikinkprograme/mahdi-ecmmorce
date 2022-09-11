import React from "react";
import "../styles/Newsletter.css";

function Newsletter() {
  return (
    <div className="new-container">
      <div className="new-row">
        <div className="new-col">
          <h2 className="new-title">Newsletter</h2>
          <p className="new-desc">
            Get timely updates from your favorite products.
          </p>
          <div className="input-container">
            <input type="text" placeholder="Your E-mail" />
            <button>
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
