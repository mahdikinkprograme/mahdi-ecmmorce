import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/features/cartSlice";
import { addTowish } from "../redux/features/wishSlice";
import "../styles/Quick.css";

function Quick({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");
  const [style, setStyle] = useState("main-container");
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    navigate("/cart");
  };
  const handleAddToWish = (item) => {
    dispatch(addTowish(item));
    navigate("/wish");
  };
  const changeStyle = () => {
    setStyle("main-container-one");
  };
  return (
    <div className={style}>
      <div className="card-quick" key={item._id}>
        <div className="card-row">
          <div className="card-images">
            <div className="card-top">
              <img src={selectedImage || item.image} />
            </div>
            <div className="card-bottom">
              <img
                src={item.image}
                onClick={() => setSelectedImage(item.image)}
              />
              {item.detailsimages.map((element) => (
                <Fragment key={element}>
                  <img
                    src={element}
                    onClick={() => setSelectedImage(element)}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="card-row">
          <div className="first-div div">
            <h2 className="name">{item.name}</h2>
            <p className="category">{item.category}</p>
          </div>
          <div className="second-div div">
            <span className="d-newprice">${item.newprice}</span>
            {item.oldprice && (
              <span className="d-oldprice">${item.oldprice}</span>
            )}
            <div className="quantity">Quantity: 1</div>
          </div>
          <div className="third-div div">
            <p className="d-desc">{item.description}</p>
          </div>
          <div className="fourth-div div">
            <button onClick={() => handleAddToCart(item)}>Add To Cart</button>
            <button onClick={() => handleAddToWish(item)}>Add To Wish</button>
          </div>
        </div>
      </div>
      <button className="back" onClick={changeStyle}>
        Close
      </button>
    </div>
  );
}

export default Quick;
