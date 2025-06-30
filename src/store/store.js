import { configureStore } from "@reduxjs/toolkit";
import cartItemReducer from "./cartItemsSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    cartItem: cartItemReducer,
    wishlist: wishlistReducer,
  },
});
