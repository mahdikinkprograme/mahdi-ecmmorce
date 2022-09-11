import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { filterByCategory } from "../redux/features/productsSlice";
import ProductShop from "./ProductShop";
import ReactPaginate from "react-paginate";
import "../styles/ProductsShop.css";

function ProductsShop() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [category, setCategory] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 3;
  const pageVisited = productPerPage * pageNumber;
  const displayProducts = products
    .slice(pageVisited, pageVisited + productPerPage)
    .map((item) => <ProductShop item={item} key={item._id} />);
  const pageCount = Math.ceil(products.length / productPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const handleFilterByCategory = (category) => {
    dispatch(filterByCategory(category));
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/category");
      setCategory(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="shop-row">
      <div className="shop-col">
        <h2>Category</h2>
        <button
          className="shop-btn"
          onClick={() => handleFilterByCategory("all")}
        >
          All <i className="fa fa-chevron-right"></i>
        </button>
        {category.map((item) => (
          <button
            className="shop-btn"
            key={item.id}
            onClick={() => handleFilterByCategory(item.title)}
          >
            {item.title} <i className="fa fa-chevron-right"></i>
          </button>
        ))}
      </div>
      <div className="shop-col">
        <div className="shop-products">{displayProducts}</div>
        <div className="shop-pagination">
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsShop;
