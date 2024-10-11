
// /**
//  * File - slice/shippingSlice.js
//  * Desc - Created redux  shipping slice
//  * Author - seema
//  * Date - 09/26/2024
//  *
//  */
import {
  createSlice,
  createAsyncThunk,

} from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
// Async thunk to handle the shipping data submission
export const shippingAddress = createAsyncThunk(
  "shipping/submitShipping",
  async (shippingInfo, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch("http://localhost:5000/api/shipping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.user?.token}`,
        },
        body: JSON.stringify(shippingInfo),
      });
      const data = await response.json();
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      return data;
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 3000, // Auto close after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return rejectWithValue(error.message);
    }
  }
);
const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    shippingInfo: {},
    loading: false,
    error: null,
  },
  reducers: {
    resetShippingState: (state) => {
      state.shippingInfo = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shippingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shippingAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingInfo = action.payload;
      })
      .addCase(shippingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetShippingState } = shippingSlice.actions;
export default shippingSlice.reducer;
