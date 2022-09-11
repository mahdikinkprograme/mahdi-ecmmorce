import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductHome from "./ProductHome";
import "../styles/ProductsHome.css";
import { fetchProducts } from "../redux/features/productsSlice";

function ProductsHome() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="hps-container">
      <h2>Latest Products</h2>
      <div className="hps-row">
        {products.slice(-8).map((item) => (
          <ProductHome item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default ProductsHome;
