import { supabase } from "../lib/supabase";

export const addToOrder = async (orderData) => {
  try {
    const { data, error } = await supabase.from("orders").insert(orderData);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const session = supabase.auth.session();
    const user = session?.user;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
            id,
            total,
            quantity,
            status,
            payment_method,
            created_at,
            address,
            product_id,
            products:product_id (
            id,
            name,
            price,
            image
            )
        `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
