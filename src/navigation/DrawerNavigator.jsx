import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { supabase } from "../lib/supabase";
import { ActivityIndicator, View } from "react-native";

import TabNavigator from "./TabNavigator";
import SettingsScreen from "../screens/Authentication/SettingsScreen";
import CreateProductScreen from "../screens/CreateProductScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategorySelectionScreen from "../screens/CategorySelectionScreen";

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const CreateProduct = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CreateProduct" component={CreateProductScreen} />
    <Stack.Screen
      name="CategorySelection"
      component={CategorySelectionScreen}
    />
  </Stack.Navigator>
);

const DrawerNavigator = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const session = supabase.auth.session();
        const user = session?.user;

        if (!user) {
          setRole("user");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Profile fetch error:", error.message);
          setRole("user");
        } else {
          setRole(data.role || "user");
        }
      } catch (err) {
        console.error("Unexpected error fetching profile:", err);
        setRole("user");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  console.log(role);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ title: "Home" }}
      />
      {role === "admin" && (
        <Drawer.Screen
          name="Products"
          component={CreateProduct}
          options={{ title: "Create Products" }}
        />
      )}
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
