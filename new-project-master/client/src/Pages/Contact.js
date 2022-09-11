import React from "react";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-row">
        <h2 className="contact-title">Contact Us</h2>
      </div>
      <div className="contact-row">
        <div className="contact-col">
          <i className="fa fa-map-marker"></i>
          <div>
            <p>Your address goes here.</p>
            <p>Your address goes here.</p>
          </div>
        </div>
        <div className="contact-col">
          <i className="fa fa-phone"></i>
          <div>
            <p>+1122334455</p>
            <p>+6677889900</p>
          </div>
        </div>
        <div className="contact-col">
          <i className="fa fa-envelope-o"></i>
          <div>
            <p>xyz@gmail.com</p>
            <p>abc@outlook.com</p>
          </div>
        </div>
      </div>
      <div className="contact-row">
        <form>
          <div className="form-groupe">
            <input type="text" placeholder="Your Name Here" />
            <input type="email" placeholder="Your Email Here" />
          </div>
          <div className="form-groupe">
            <input type="text" placeholder="Your Subject Here" />
            <input type="text" placeholder="Your Phone Here" />
          </div>
          <div className="form-groupe">
            <textarea placeholder="Message"></textarea>
          </div>
          <div className="form-groupe">
            <input type="submit" value="Submit Message" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
