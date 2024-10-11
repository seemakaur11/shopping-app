import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import {
  deleteCartItem,
  fetchCart,
  updateCartItemQuantity,
} from "../redux/slices/cartSlice";
import { toast, ToastContainer } from 'react-toastify';
const CartProduct = () => {
  const dispatch = useDispatch();
  // Access cart items from Redux store
  const { cartItems } = useSelector((state) => state.cart);
console.log("cart items  ====>",cartItems)
  const subTotal = cartItems.reduce((acc,item) => acc + item.totalPrice, 0);
  const totalItem = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleDeleteItem = (itemId) => {
    dispatch(deleteCartItem(itemId));
  };
  const handleIncrement = (item) => {
    dispatch(
      updateCartItemQuantity({ id: item.product, quantity: item.quantity + 1 })
    );
  };
  const handleDecrement = (item) => {
    dispatch(
      updateCartItemQuantity({ id: item.product, quantity: item.quantity - 1 })
    );
  };
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  return (
    <>
      {cartItems.length === 0 ? (
        <p className="text-center text-3xl font-medium py-14 ">
          Your cart is empty.{" "}
          <Link to="/" className="text-red-600">
            Go back to products
          </Link>
        </p>
      ) : (
        <div className="py-14 ">
          {cartItems?.map((item) => (
            <div
              key={item._id}
              className=" grid grid-cols-4 py-5 my-5 w-[60%] mx-auto bg-[#f9fafb]  shadow-sm "
            >
              <div className="">
                <img
                  src={item.img}
                  className="w-[180px] h-[160px] pl-5"
                  alt="product"
                />
              </div>
              <div className="pt-5">
                <h3 className="text-lg text-red-600 font-medium">
                  {item.name}
                </h3>
                <p className="pt-1 font-medium">Quantity</p>
                <div className=" flex pt-3">
                  <FaSquareMinus
                    onClick={() => handleDecrement(item)}
                    className="text-lg cursor-pointer text-red-500"
                  />
                  <span className="mx-3 text-sm ">{item.quantity}</span>
                  <FaSquarePlus
                    onClick={() => handleIncrement(item)}
                    className="text-lg cursor-pointer text-red-500"
                  />
                </div>
              </div>
              <div className="pt-5">
                <p className=" text-red-600 font-medium">Price</p>
                <p className="pt-1 text-base font-medium">Rs. {item.price}</p>
                <button
                  className="flex gap-2 mt-3"
                  onClick={() => handleDeleteItem(item.product)}
                >
                  <FaTrashAlt className="text-red-500" />
                  <span className="mt-[-2px] text-sm font-medium">Remove</span>
                </button>
                
              </div>
              <div className="pt-10" >
              <p className="text-base text-red-600 font-medium">Total-Price
              </p><span className="text-black font-medium">Rs. {item?.totalPrice}</span>
              </div>
            </div>
          ))}
          <div className="border-b-2 w-[80%] mx-auto"></div>
          {/* Display the subtotal section */}
          {cartItems.length > 0 && (
            <div className="w-[60%] mx-auto pt-5 ">
              <h1 className="text-black font-medium text-xl">Subtotal:  <span className="text-red-500 text-base">Rs.{subTotal}</span></h1>
              <p className="font-medium text-base">Total item in Cart : <span className="text-red-500 text-base" >{totalItem}</span></p>
              <p className="text-gray-400">Shipping and taxes will be calculated at checkout.</p>
              <Link to="/checkout">
              <button className="px-4  py-2 mt-5 bg-gray-900 text-white
               text-base font-medium uppercase rounded-sm hover:bg-red-500">
                checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
      <ToastContainer/>
    </>
  );
};

export default CartProduct;
