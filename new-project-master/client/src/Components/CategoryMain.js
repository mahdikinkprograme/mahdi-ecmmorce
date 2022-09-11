import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CategoryMain.css";

function CategoryMain() {
  const [categoryItems, setCategoryItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/category");
      setCategoryItems(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="c-container">
      <div className="c-row">
        {categoryItems.map((item) => (
          <div className="c-col" key={item.id}>
            <img src={item.image} />
            <div className="category-content">
              <p>{item.title}</p>
              <button className="c-btn">Shop Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryMain;
