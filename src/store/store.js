import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import cartItemReducer from "./cartItemsSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartItem: cartItemReducer,
    wishlist: wishlistReducer,
  },
});
