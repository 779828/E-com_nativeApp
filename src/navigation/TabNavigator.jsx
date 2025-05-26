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
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: { backgroundColor: "#f8f8f8" },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: () => <Icon name="home" size={25} color="black" />,
      }}
    />
    <Tab.Screen
      name="Accessory"
      component={StackNavigator}
      options={{
        tabBarIcon: () => <Icon name="cog" size={25} color="black" />,
      }}
    />
    <Tab.Screen
      name="Offers"
      component={OfferScreen}
      options={{
        tabBarIcon: () => <Icon name="tag" size={25} color="black" />,
      }}
    />
    <Tab.Screen
      name="MyWatchlist"
      component={WatchlistScreen}
      options={{
        tabBarIcon: () => <Icon name="bookmark" size={25} color="black" />,
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
