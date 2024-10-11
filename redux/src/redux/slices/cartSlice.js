import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, name, price, img,totalPrice },
    { getState, rejectWithValue }
  ) => {
    try {
      const { auth } = getState(); // get token from auth state
      const token = auth?.user?.token;

      if (!token)
        return rejectWithValue(
          "You must be logged in to add items to the cart"
        );

      // const config = {
      //     headers : {
      //      Authorization: `Bearer ${token}`
      //     }
      // };
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity, name, price, img,totalPrice }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "Failed to sign up");
      }
      return data;
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 3000,  // Auto close after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return rejectWithValue(error.message);
    }
  }
);

// fetch cart

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token;

      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   };
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "Failed to sign up");
      }
      return data;
    } catch (error) {
      console.log("error in fetch cart ===", error);
      return rejectWithValue(error.message);
    }
  }
);
// Async thunk to delete cart item from the backend
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (itemId, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState();

      const response = await fetch(
        `http://localhost:5000/api/cart/remove/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.user?.token}`, // Attach the token for authorization
          },
        }
      );
      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete cart item");
      }
      // Refetch cart items to ensure the state is updated correctly
      dispatch(fetchCart());
      return itemId;
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 3000,  // Auto close after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Update cart item quantity thunk
export const updateCartItemQuantity = createAsyncThunk('cart/updateCartItemQuantity',
  async ({ id, quantity }, { rejectWithValue, dispatch,getState }) => {
   try {
    const { auth } = getState();
    const token = auth?.user.token;
    const response = await fetch(`http://localhost:5000/api/cart/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantity:quantity }), // Send the new quantity to the backend
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update cart item quantity');
    }
    dispatch(fetchCart());
    return { id, quantity }; 
   }
   catch (error) {
    toast.error(`${error}`, {
      position: "top-right",
      autoClose: 3000,  // Auto close after 3 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    return rejectWithValue(error.response.data.message);
  }
  })

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: 0,
    status: null,
    error: null,
  },
  reducers: {
    addToCartSuccess: (state, action) => {
      state.cartItems.push(action.payload); // Add item to cart
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        // If item already exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If item is not in the cart, add it with quantity 1
        state.cartItems.push({ ...item, quantity: 1 });
      }

      // Recalculate the total price after adding the item
      state.totalPrice = state.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.totalPrice = state.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    clearCart: (state) => {
      // Clear the cart
      console.log("clear cart ===>")
      state.cartItems = [];
      state.totalPrice = 0;  // Reset total price
    },
    
    // clearCart: (state) => {
    //   state.cartItems = []; // Clear cart when needed
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter((item) => {
          const itemId = JSON.stringify(item.product);
          return itemId !== action.payload;
        });
        state.status = "succeeded";
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.cartItems.find((item) => {
          const itemId = JSON.stringify(item.product);
          return itemId === id
        });
        if (item) {
          item.quantity = quantity; // Update quantity in state
        }
      });
  },
});
export const { addToCartSuccess, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
