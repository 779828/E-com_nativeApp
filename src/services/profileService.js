import { supabase } from "../lib/supabase";

export const createProfile = async (profileData) => {
  try {
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", profileData.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking existing profile:", fetchError);
      throw fetchError;
    }

    if (existingProfile) {
      throw new Error("Profile already exists for this user");
    }

    const { data, error } = await supabase
      .from("profiles")
      .insert([profileData])
      .select()
      .single();

    if (error) {
      console.error("Error creating profile:", error);
      throw error;
    }

    console.log("Profile created:", data);
    return data;
  } catch (error) {
    console.error("Create profile error:", error);
    throw error;
  }
};

export const getProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }

    // console.log("Profile fetched:", data);
    return data;
  } catch (error) {
    console.error("Fetch profile error:", error);
    throw error;
  }
};

export const updateProfile = async (userId, updates) => {
  try {
    console.log(
      "Updating profile for userId:",
      userId,
      "with updates:",
      updates
    );

    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, phone_number, image_url")
      .eq("id", userId)
      .single();

    if (fetchError || !existingProfile) {
      console.error("Profile not found for userId:", userId, fetchError);
      throw new Error("Profile not found for this user");
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating profile:", error);
      throw error;
    }

    console.log("Profile updated:", data);
    return data;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};

export const deleteProfile = async (userId) => {
  try {
    const { error } = await supabase.from("profiles").delete().eq("id", userId);

    if (error) {
      console.error("Error deleting profile:", error);
      throw error;
    }

    console.log("Profile deleted for userId:", userId);
    return true;
  } catch (error) {
    console.error("Delete profile error:", error);
    throw error;
  }
};
