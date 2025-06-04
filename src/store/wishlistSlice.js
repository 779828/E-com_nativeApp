import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToWishlist,
  fetchWishlistItems,
  removeFromWishlist,
  clearWishlistItems,
} from "../services/wishlistService";

export const addItemToWishlist = createAsyncThunk(
  "wishlist/addItemToWishlist",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const data = await addToWishlist(productId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserWishlist = createAsyncThunk(
  "wishlist/fetchUserWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchWishlistItems();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeItemFromWishlist = createAsyncThunk(
  "wishlist/removeItemFromWishlist",
  async (wishlistItemId, { rejectWithValue }) => {
    try {
      await removeFromWishlist(wishlistItemId);
      return wishlistItemId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearUserWishlist = createAsyncThunk(
  "wishlist/clearUserWishlist",
  async (_, { rejectWithValue }) => {
    try {
      await clearWishlistItems();
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUserWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(addItemToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeItemFromWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeItemFromWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeItemFromWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(clearUserWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearUserWishlist.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
      })
      .addCase(clearUserWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
