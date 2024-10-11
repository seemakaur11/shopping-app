import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className='py-14 text-center'>
      <h1 className='text-3xl font-bold '>Your Order is Not Confirmed </h1>
      <Link to="/checkout"><h3 className='text-2xl text-red-500 font-medium'>Please got back to checkout page </h3></Link>
    </div>
  )
}

export default Cancel