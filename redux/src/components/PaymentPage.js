// import React,{useEffect} from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useDispatch, useSelector } from 'react-redux';
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import {
//   createPaymentIntent,
//   resetPayment,
// } from "../redux/slices/paymentSlice";

// const stripePromise = loadStripe(
//   "pk_test_51Q3YHkGvr8OwAqz4Fwkt0jEqV5enPPdDmyTBSpjnOn0Q0slEczKZVElumROmW46dzCaazKaca6Wp8DTfVQzvhS2000nPvoDgUM"
// );

// const CheckoutForm  = () => {
//     const dispatch = useDispatch();
//   // const navigate = useNavigate();
//   const stripe = useStripe();
//   const elements = useElements();
//   // Get state from Redux store
//   const { clientSecret, loading, error, success } = useSelector(
//     (state) => state.payment
//   );
//   const { cartItems } = useSelector((state) => state.cart);

//   const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

//   useEffect(() => {
//     // Create a payment intent when the component mounts
//     if (!clientSecret) {
//       dispatch(createPaymentIntent(totalAmount));
//     }
//     // Reset payment state when unmounting the component
//     return () => {
//       dispatch(resetPayment());
//     };
//   }, [dispatch, totalAmount, clientSecret]);
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
//     const cardElement = elements.getElement(CardElement);
//     const result = await stripe.confirmCardPayment(clientSecret,{
//         payment_method: {
//             card: cardElement,
//           },
//     });
//     if(result.error){
//         console.log("Payment error ==",result.error.message)
//     }else {
//         if(result.paymentIntent.status === 'succeeded'){
//             alert('order confirmation');
//         }
//     }
//   };

//   return (
//     <div className="w-[50%] mx-auto py-14">
//       <h2>Complete your payment</h2>
//       <form onSubmit={handleSubmit}>
//        <div>
//        <CardElement />
//        </div>
//         <button className="bg-red-500 text-white py-2 px-3" disabled={loading || !stripe || !elements} type="submit">
//           {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
//         </button>
//         {error && <div className="error-message">{error}</div>}
//         {success && <p className="success-message">Payment succeeded!</p>}
//       </form>
//     </div>
//   );
// };

// const PaymentPage = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm  />
//     </Elements>
//   );
// };

// export default PaymentPage;

import React from 'react'

const PaymentPage = () => {
  return (
    <div className='text-center py-14 text-2xl'>Coming soon payment method</div>
  )
}

export default PaymentPage