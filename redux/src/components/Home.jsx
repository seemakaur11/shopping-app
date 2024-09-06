import React from "react";
import Cart from "./Cart";
import Product from "./Products";

const Home = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 md:lg:grid-cols-1 gap-12 px-24 py-12 bg-[#FFF0F5]">
        <div className="pt-14">
          <h1 className="text-[#31004a] font-sans text-4xl font-medium">
            Discover Your Favorite Products - Shop Anytime, Anywhere
          </h1>
          <p className="py-4 text-lg font-medium text-[#dd82ee]">
            Welcome to <strong>Shop Now</strong>, your one-stop destination for
            online shopping. Explore a wide range of products, from fashion and
            electronics to home essentials and more
          </p>
        </div>
        <div>
          <img
            src="/images/shopping.png"
            alt="shopping"
            className="w-full h-full"
          />
        </div>
      </div>
      <Cart/>
      <Product/>
    </>
  );
};

export default Home;
