import React from "react";
import { useDispatch,useSelector  } from "react-redux";
import { Products } from "../utility/data";
import { CiSearch } from "react-icons/ci";
import { addToCart } from "../redux/slices/cartSlice";
import { toast, ToastContainer } from 'react-toastify';

const Product = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth); 
  const { cartItems } = useSelector((state) => state.cart);

  const handleAddToCart = (productId,name,price,img) => {
    const totalPrice = price;
    if(!token) {
      toast.error('Please log in to add items to the cart!', {
        position: "top-right",
        autoClose: 3000,  // Auto close after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(addToCart({ productId: productId, quantity: 1, name:name, price:price,img:img, totalPrice:totalPrice }))
    }
  } 

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
                      handleAddToCart(product.id,name,price,img)
                    }
                    className="bg-[#dd82ee] text-white text-[12px] py-2 px-2 rounded-sm"
                  >
                    Add To Cart
                  </button>
                
                </div>
              </div>
            );
          })}
          <ToastContainer/>
      </div>
    </>
  );
};

export default Product;
