import React from 'react';
import { useSelector } from 'react-redux';

const Count = () => {
  const count = useSelector(state => state)
  return (
    <div>
        <h2 className='pt-6'>{count}</h2>
    </div>
  )
}

export default Count