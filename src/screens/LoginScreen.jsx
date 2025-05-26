import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, TextInput, Button, Text, StatusBar, Alert } from "react-native";
import { styles } from "../style/LoginStyle";
import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
      />

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#007BFF" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Sign Up"
          onPress={() => navigation.navigate("Signup")}
          color="red"
        />
      </View>
    </View>
  );
};

export default LoginScreen;
