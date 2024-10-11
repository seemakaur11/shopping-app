
import {configureStore} from '@reduxjs/toolkit';
import authReducer  from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import shippingReducer from './slices/shippingSlice';
import paymentReducer from './slices/paymentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        shipping: shippingReducer,
        payment: paymentReducer
    },
    devTools: true
})





































// import { createStore} from "redux";
// const reducer = (state = 0, action) => {
//     switch(action.type) {
//         case 'INCREMENT' : return state + 1;
//         case 'DECREMENT' : return state - 1;
//         default: return state;
//     }
    
// }
// export const store = createStore(reducer);