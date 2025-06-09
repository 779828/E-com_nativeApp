import { supabase } from "../lib/supabase";

export const addToWishlist = async (productId) => {
  try {
    const currentSession = supabase.auth.session();

    if (!currentSession || !currentSession.user) {
      throw new Error("User not authenticated");
    }

    const userId = currentSession.user.id;
    console.log("Adding to wishlist for user_id:", userId);

    const { data: existingItem, error: fetchError } = await supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking wishlist item:", fetchError);
      throw fetchError;
    }

    if (existingItem) {
      const { data, error } = await supabase
        .from("wishlist")
        .select(
          `
          id,
          products (
            id,
            name,
            price,
            image,
            spec,
            oldPrice,
            rating,
            discount
          )
        `
        )
        .eq("id", existingItem.id)
        .single();

      if (error) {
        console.error("Error fetching existing wishlist item:", error);
        throw error;
      }
      return data;
    } else {
      const { data, error } = await supabase
        .from("wishlist")
        .insert([{ user_id: userId, product_id: productId }])
        .select(
          `
          id,
          products (
            id,
            name,
            price,
            image,
            spec,
            oldPrice,
            rating,
            discount
          )
        `
        )
        .single();

      if (error) {
        console.error("Error adding to wishlist:", error);
        throw error;
      }
      return data;
    }
  } catch (error) {
    console.error("Add to wishlist error:", error);
    throw error;
  }
};

export const fetchWishlistItems = async () => {
  try {
    const currentSession = supabase.auth.session();

    if (!currentSession || !currentSession.user) {
      throw new Error("User not authenticated");
    }

    const userId = currentSession.user.id;

    const { data, error } = await supabase
      .from("wishlist")
      .select(
        `
        id,
        products (
          id,
          name,
          spec,
          price,
          oldPrice,
          rating,
          discount,
          image
        )
      `
      )
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching wishlist items:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Fetch wishlist items error:", error);
    throw error;
  }
};

export const removeFromWishlist = async (wishlistItemId) => {
  try {
    const currentSession = supabase.auth.session();

    if (!currentSession || !currentSession.user) {
      throw new Error("User not authenticated");
    }

    const userId = currentSession.user.id;

    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("id", wishlistItemId)
      .eq("user_id", userId);

    if (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    throw error;
  }
};

export const clearWishlistItems = async () => {
  try {
    const currentSession = supabase.auth.session();

    if (!currentSession || !currentSession.user) {
      throw new Error("User not authenticated");
    }

    const userId = currentSession.user.id;

    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error("Error clearing wishlist:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Clear wishlist error:", error);
    throw error;
  }
};
