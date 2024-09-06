import React from 'react';
// import { useSelector } from 'react-redux';
// import { getItemsSelector } from '../redux/slices/cartSlice';

const Cart = () => {
    // const items = useSelector(getItemsSelector);
    // const total = items.reduce((a,b) => a + b.price, 0);
    
  return (
    <div>
      <h1 className='text-3xl text-center pt-10 font-semibold text-[#31004a]'>Our Products</h1>
        {/* <h1 className='text-center text-xl pt-8'>Total Items: {items.length} (Rs. {total})</h1> */}
    </div>
  )
}

export default Cart