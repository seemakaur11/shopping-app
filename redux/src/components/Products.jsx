import React from "react";
import { useDispatch } from "react-redux";
import { Products } from "../utility/data";
import { addItem } from "../redux/slices/cartSlice";
import { CiSearch } from "react-icons/ci";

const Product = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="px-16 flex justify-center pt-5">
        <input type="text" placeholder="Search Product ..." className="w-[50%] p-3 outline-none border-slate-200 rounded-lg border-[1px]"/>
       <div className="relative top-4 right-6">
       <CiSearch className="text-lg"/>
       </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-10 px-16 py-14">
        {!!Products &&
          Products.map((product, index) => {
            const { name, price, img } = product;
            return (
              <div key={index} className="shadow-lg">
                <img src={img} className="w-full h-[250px]" alt="product" />
                <div className="py-3 pl-5">
                  <h1 className="text-red-500">{name}</h1>
                  <p>Rs. {price}</p>
                </div>
                <div className="p-3">
                  <button
                    onClick={(e) =>
                      dispatch(addItem({ name: name, price: price }))
                    }
                    className="bg-[#dd82ee] text-white text-[12px] py-2 px-2 rounded-sm"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Product;
