import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const session = supabase.auth.session();
      const user = session?.user;
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("profiles")
        .select("role, first_name, last_name, phone_number, image_url")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Logout failed", error.message);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4B5563" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Profile not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.profileCard}>
          <Image source={{ uri: profile.image_url }} style={styles.avatar} />
          <Text style={styles.name}>
            {profile.first_name} {profile.last_name}
          </Text>
          <Text style={styles.phone_number}>{profile.phone_number}</Text>
          <Text style={styles.activeStatus}>{profile.role}</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Ionicons name="person-outline" size={22} color="#4B5563" />
            <Text style={styles.optionLabel}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("Wishlist")}
          >
            <Ionicons name="heart-outline" size={22} color="#4B5563" />
            <Text style={styles.optionLabel}>Wishlist</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            // onPress={() => navigation.navigate("OrderHistory")}
          >
            <Ionicons name="time-outline" size={22} color="#4B5563" />
            <Text style={styles.optionLabel}>Order History</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            // onPress={() => navigation.navigate("Notification")}
          >
            <Ionicons name="notifications-outline" size={22} color="#4B5563" />
            <Text style={styles.optionLabel}>Notification</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            // onPress={() => navigation.navigate("Cards")}
          >
            <Ionicons name="card-outline" size={22} color="#4B5563" />
            <Text style={styles.optionLabel}>Cards</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f5f5f5",
    marginTop: 100,
  },
  container: {
    padding: 20,
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    color: "#111827",
  },
  phone_number: {
    fontSize: 20,
    color: "#000",
    marginTop: 4,
  },
  activeStatus: {
    fontSize: 20,
    color: "#10b981",
    marginTop: 4,
  },
  optionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 10,
    marginBottom: 30,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  optionLabel: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: "#374151",
  },
  logoutButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
