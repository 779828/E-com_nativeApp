import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { styles } from "../../style/ProfileStyle";
import { useNavigation } from "@react-navigation/native";

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
        .select("role, first_name, last_name, phone_number")
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
    <View style={styles.container}>
      <Image
        source={require("../../../assets/avtar.webp")}
        style={styles.avatar}
      />
      <Text style={styles.role}>{profile.role}</Text>
      <Text style={styles.name}>
        {profile.first_name} {profile.last_name}
      </Text>
      <Text style={styles.phone}>📞 {profile.phone_number}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
