import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { addToCart } from "../redux/features/cartSlice";
import { addTowish } from "../redux/features/wishSlice";

function ProductShop({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    navigate("/cart");
  };
  const handleAddToWish = (item) => {
    dispatch(addTowish(item));
    navigate("/wish");
  };
  return (
    <div className="ps-card">
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
        <button>
          <i className="fa fa-heart" onClick={() => handleAddToWish(item)}></i>
        </button>
        <button>
          <i
            className="fa fa-shopping-bag"
            onClick={() => handleAddToCart(item)}
          ></i>
        </button>
      </div>
    </div>
  );
}

export default ProductShop;
