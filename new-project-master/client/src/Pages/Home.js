import React from "react";
import Banners from "../Components/Banners";
import CategoryMain from "../Components/CategoryMain";
import Newsletter from "../Components/Newsletter";
import ProductsHome from "../Components/ProductsHome";
import Slider from "../Components/Slider";

function Home() {
  return (
    <>
      <Slider />
      <Banners />
      <CategoryMain />
      <ProductsHome />
      <Newsletter />
    </>
  );
}

export default Home;
