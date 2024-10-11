import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { clearCart } from '../redux/slices/cartSlice';
const Success = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log('Clearing cart...')
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className='py-14 text-center'>
      <h1 className='text-3xl font-bold '>Your Order is Confirmed </h1>
      <Link to="/"><h3 className='text-2xl text-red-500 font-medium'>Please continue your shopping</h3></Link>
    </div>
  )
}

export default Success