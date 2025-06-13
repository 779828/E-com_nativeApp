import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet } from "react-native";

import Header from "../components/Header";

import DetailsScreen from "../screens/Home/DetailScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ProductList from "../screens/Home/ProductList";

import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfile from "../screens/Profile/EditProfile";

import CartScreen from "../screens/Cart/cartScreen";

import WishlistScreen from "../screens/Wishlist/MyWatchList";
import CheckoutScreen from "../screens/Cart/CheckoutScreen";
import OrderHistoryScreen from "../screens/Cart/OrderHistoryScreen";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const CartStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CartScreen" component={CartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
  </Stack.Navigator>
);

const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="ProductList" component={ProductList} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Header" component={Header} />
  </Stack.Navigator>
);

const ProfileStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
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
        else if (route.name === "Cart") iconName = "bag";
        else if (route.name === "Wishlist") iconName = "bookmark";
        else if (route.name === "Profile") iconName = "person-circle-outline";

        return <Ionicons name={iconName} size={24} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStackNavigator} />
    <Tab.Screen name="Cart" component={CartStackNavigator} />
    <Tab.Screen name="Wishlist" component={WishlistScreen} />
    <Tab.Screen name="Profile" component={ProfileStackNavigator} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    height: 100,
    backgroundColor: "white",
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
