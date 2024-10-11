import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { shippingAddress } from "../redux/slices/shippingSlice";
import { toast, ToastContainer } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "../redux/slices/paymentSlice";



const Checkout = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.payment);
  const [ shippingInfo, setShippingInfo] = useState({
  fullName: '',
  address: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  phoneNumber:''
   });
const handleChange = (e) => {
  const {name, value} = e.target;
    setShippingInfo({...shippingInfo,[name]: value});
}
const handleSubmit = async(e) => {
  e.preventDefault();
  dispatch(shippingAddress(shippingInfo)).then((result) => {
    if (!result.error) {
     return result;
    }
  });

}
const makePayment =  async() => {
  const stripePromise = await loadStripe("pk_test_51Q3YHkGvr8OwAqz4Fwkt0jEqV5enPPdDmyTBSpjnOn0Q0slEczKZVElumROmW46dzCaazKaca6Wp8DTfVQzvhS2000nPvoDgUM");
  const body  = {
    products: cartItems
  }
 
  const resultAction = await dispatch(createPaymentIntent(body));

  // Only proceed to Stripe checkout if the session was created successfully
  if (createPaymentIntent.fulfilled.match(resultAction)) {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: resultAction.payload.id,
    });
    if (error) {
      console.log('Stripe error:', error);
    }
  } else {
    console.log('Error creating checkout session:', resultAction.payload);
  }

}

  return (
    <div className="flex justify-center items-center  bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-[50%] my-14">
        <h1 className="text-2xl text-red-600 font-bold text-center">
          Shipping Information
        </h1>
     
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name:
            </label>
            <input
              type="text"
              className="shadow appearance-none
              border rounded w-full py-2 
              px-3 text-gray-700 leading-tight
              focus:outline-none focus:shadow-outline"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address:
            </label>
            <input
              type="text"
              name="address"
              className="shadow appearance-none
              border rounded w-full py-2 
              px-3 text-gray-700 leading-tight
              focus:outline-none focus:shadow-outline"
              placeholder="H.No Street , Road, Near by"
              value={shippingInfo.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City:
            </label>
            <input
              type="text"
              className="shadow appearance-none
              border rounded w-full py-2 
              px-3 text-gray-700 leading-tight
              focus:outline-none focus:shadow-outline"
              name="city"
              value={shippingInfo.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              State:
            </label>
            <input type="text" 
             className="shadow appearance-none
             border rounded w-full py-2 
             px-3 text-gray-700 leading-tight
             focus:outline-none focus:shadow-outline"
            name="state" 
            value={shippingInfo.state}
            onChange={handleChange}
             required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Postal Code:
            </label>
            <input
              type="text"
              className="shadow appearance-none
              border rounded w-full py-2 
              px-3 text-gray-700 leading-tight
              focus:outline-none focus:shadow-outline"
              name="postalCode"
              value={shippingInfo.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Countary:
            </label>
            <input
              type="text"
              className="shadow appearance-none
               border rounded w-full py-2 
               px-3 text-gray-700 leading-tight
               focus:outline-none focus:shadow-outline"
              name="country"
              value={shippingInfo.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number:
            </label>
            <input
              type="number"
              className="shadow appearance-none
              border rounded w-full py-2 
              px-3 text-gray-700 leading-tight
              focus:outline-none focus:shadow-outline"
              name="phoneNumber"
              value={shippingInfo.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
         
          <button
            className="px-4  py-2 mt-5 bg-gray-900 text-white
               text-base font-medium uppercase rounded-sm hover:bg-red-500"
              //  type="submit" disabled={loading}
              onClick={makePayment}
          >
           Proceed to Payment
          </button>
          {error && <p className="text-sm text-red-500 font-normal">Error: {error}</p>}
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Checkout;
