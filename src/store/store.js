import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import cartItemReducer from "./cartItemsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartItem: cartItemReducer,
  },
});
