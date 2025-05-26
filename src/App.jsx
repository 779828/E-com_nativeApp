import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

import { Provider } from "react-redux";
import AppNavigator from "./navigation/AppNavigator";
import { store } from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
