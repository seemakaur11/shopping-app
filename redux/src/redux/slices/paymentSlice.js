import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createPaymentIntent = createAsyncThunk(
  "payment/createPaymentIntent",
  async (products, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch(
        "http://localhost:5000/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.user?.token}`,
          },
          body: JSON.stringify(products),
        }
      );

      const session = await response.json();
      if (!response.ok) {
        throw new Error(session.message || "Could not create payment intent");
      }
      return session;
    } catch (error) {
      console.log("+++Error in Pyament slice method +++",error);
      return rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
    name:'payment',
    initialState: {
        sessionId: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetPayment: (state) => {
            state.sessionId = '';
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(createPaymentIntent.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(createPaymentIntent.fulfilled, (state, action) => {
            state.loading = false;
            state.sessionId = action.payload.id;
            state.success = true;
          })
          .addCase(createPaymentIntent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
});
export const { resetPayment } = paymentSlice.actions;

export default paymentSlice.reducer;