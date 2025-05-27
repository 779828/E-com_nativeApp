import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import AccessoriesScreen from "../screens/AccessoriesScreen";
import DetailsScreen from "../screens/DetailScreen";
import HomeScreen from "../screens/HomeScreen";
import WatchlistScreen from "../screens/MyWatchList";
import OfferScreen from "../screens/OfferScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/cartScreen";
import Header from "../components/Header";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Accessories" component={AccessoriesScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="CartScreen" component={CartScreen} />
    <Stack.Screen name="Header" component={Header} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarLabelStyle: {
        fontSize: 14,
      },
      tabBarActiveTintColor: "#05445E",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: styles.tabBar,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") iconName = "home";
        else if (route.name === "Accessory") iconName = "th-large";
        else if (route.name === "Offers") iconName = "bell";
        else if (route.name === "Watchlist") iconName = "user";

        return <Icon name={iconName} size={24} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Accessory" component={StackNavigator} />
    <Tab.Screen name="Offers" component={OfferScreen} />
    <Tab.Screen name="Watchlist" component={WatchlistScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    height: 100,
    backgroundColor: "white",
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    paddingBottom: 10,
    paddingTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 5,
  },
});

export default TabNavigator;
