import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../redux/features/cartSlice";
import { fetchProduct } from "../redux/features/productsSlice";
import { addTowish } from "../redux/features/wishSlice";
import "../styles/ProductScreen.css";

function ProductScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { _id } = params;
  const { status } = useSelector((state) => state.products);
  const { product } = useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState("");
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    navigate("/cart");
  };
  const handleAddToWish = (item) => {
    dispatch(addTowish(item));
    navigate("/wish");
  };
  useEffect(() => {
    dispatch(fetchProduct(_id));
  }, [_id]);
  return (
    <>
      {status === "Fullfilled" && (
        <div className="screen-container">
          <div className="screen-row">
            <div className="screen-col">
              <div className="screen-images">
                <div className="screen-top">
                  <img src={selectedImage || product.image} />
                </div>
                <div className="screen-bottom">
                  <img
                    src={product.image}
                    onClick={() => setSelectedImage(product.image)}
                  />
                  {product.detailsimages.map((element) => (
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
            <div className="screen-col">
              <div className="first-div div">
                <h2 className="name">{product.name}</h2>
                <p className="category">{product.category}</p>
              </div>
              <div className="second-div div">
                <span className="d-newprice">${product.newprice}</span>
                {product.oldprice && (
                  <span className="d-oldprice">${product.oldprice}</span>
                )}
                <div className="quantity">Quantity: {product.qty}</div>
              </div>
              <div className="third-div div">
                <p className="d-desc">{product.description}</p>
              </div>
              <div className="fourth-div div">
                <button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
                <button onClick={() => handleAddToWish(product)}>
                  Add To Wish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductScreen;
