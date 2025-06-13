import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

import { Provider } from "react-redux";
import AppNavigator from "./navigation/AppNavigator";
import { store } from "./store/store";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";

const toastConfig = {
  success: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: "#6a51ae",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        height: 80,
        width: "90%",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
      }}
      text2Style={{
        fontSize: 14,
        color: "#555",
      }}
      text1={text1}
      text2={text2}
    />
  ),
  error: ({ text1, text2, ...rest }) => (
    <ErrorToast
      {...rest}
      style={{
        borderLeftColor: "#ff5c5c",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        height: 80,
        width: "90%",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
      }}
      text2Style={{
        fontSize: 14,
        color: "#555",
      }}
      text1={text1}
      text2={text2}
    />
  ),
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  );
}
