import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Slider.css";

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderItems, setSliderItems] = useState([]);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/slider");
      setSliderItems(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="s-container">
      <div className="s-arrow left" onClick={() => handleClick("left")}>
        <i className="fa fa-arrow-circle-left"></i>
      </div>
      <div
        className="wrapper"
        slideIndex={slideIndex}
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
      >
        {sliderItems.map((item) => (
          <div className="slide" key={item.id}>
            <div className="img-container">
              <img src={item.image} className="s-img" />
            </div>
          </div>
        ))}
      </div>
      <div className="s-arrow right" onClick={() => handleClick("right")}>
        <i className="fa fa-arrow-circle-right"></i>
      </div>
    </div>
  );
}

export default Slider;
