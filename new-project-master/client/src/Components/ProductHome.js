import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/ProductHome.css";
import Quick from "./Quick";
import { addToCart } from "../redux/features/cartSlice";
import { addTowish } from "../redux/features/wishSlice";

function ProductHome({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    navigate("/cart");
  };
  const handleAddToWish = (item) => {
    dispatch(addTowish(item));
    navigate("/wish");
  };
  return (
    <div className="hp-card" key={item._id}>
      <div className="card-header">
        <NavLink to={`/product/${item._id}`}>
          <img src={item.image} />
        </NavLink>
      </div>
      <div className="card-body">
        <h3 className="title">{item.name}</h3>
        <span className="newprice">${item.newprice}</span>
        {item.oldprice && <span className="oldprice">${item.oldprice}</span>}
      </div>
      <div className="card-footer">
        <button onClick={() => setOpen(true)}>
          <i className="fa fa-eye"></i>
        </button>
        <button onClick={() => handleAddToWish(item)}>
          <i className="fa fa-heart"></i>
        </button>
        <button onClick={() => handleAddToCart(item)}>
          <i className="fa fa-shopping-bag"></i>
        </button>
      </div>
      {open && <Quick item={item} />}
    </div>
  );
}

export default ProductHome;
