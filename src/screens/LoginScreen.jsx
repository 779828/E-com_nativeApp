import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
} from "react-native";
import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../style/LoginStyle";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      Alert.alert("Login Error", error.message);
    } else {
      await AsyncStorage.setItem("user", JSON.stringify(data));
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />

      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome To E-Commerce.</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.icon}>👤</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}>
            Not yet registered?{" "}
            <Text style={styles.signupLink}>Sign Up Now</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
