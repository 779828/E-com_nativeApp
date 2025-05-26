import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { styles } from "../style/RoleStyle";

const RoleScreen = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("user");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = () => {
      const session = supabase.auth.session();
      const fallbackId = session?.user?.id;
      console.log("Fallback userId from session:", fallbackId);
      setUserId(fallbackId);
    };

    getUserId();
  }, []);

  const handleSave = async () => {
    if (!firstName || !lastName || !phoneNumber || !role) {
      Alert.alert("Validation Error", "Please fill all the fields.");
      return;
    }

    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: userId,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        role: role,
      },
    ]);

    if (profileError) {
      console.error("Profile Insert Error:", profileError.message);
      Alert.alert("Profile Save Failed", profileError.message);
      return;
    }

    Alert.alert("Profile Saved", "Welcome!");
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Complete Your Profile</Text>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter first name"
          onChangeText={setFirstName}
          value={firstName}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter last name"
          onChangeText={setLastName}
          value={lastName}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />

        <Text style={styles.label}>Select Role</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="User" value="user" />
            <Picker.Item label="Admin" value="admin" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RoleScreen;
