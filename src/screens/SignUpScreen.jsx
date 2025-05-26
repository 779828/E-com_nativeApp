import { useState } from "react";
import { View, TextInput, Button, Text, Alert, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { styles } from "../style/SignUpStyle";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Email and password are required.");
      return;
    }

    try {
      const { user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        console.error("Signup Error:", signUpError.message);
        Alert.alert("Signup Failed", signUpError.message);
        return;
      }

      const userId = user.id;
      console.log("Navigating with ID:", userId);
    } catch (err) {
      console.error("Unexpected Error:", err);
      Alert.alert("Unexpected Error", "Something went wrong. Try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignup} color="#28A745" />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
          color="red"
        />
      </View>
    </View>
  );
};

export default SignUpScreen;
