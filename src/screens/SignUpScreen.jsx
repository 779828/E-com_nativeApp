import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StatusBar,
} from "react-native";
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
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />

      <View style={styles.header}>
        <Text style={styles.headerText}>
          Create Account to Explore Products!
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.icon}>👤</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.icon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Already registered?{" "}
            <Text style={styles.loginLink}>Go to Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
