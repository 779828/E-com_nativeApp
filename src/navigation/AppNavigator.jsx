import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "../lib/supabase";

import AuthStack from "./AuthStack";
import DrawerNavigator from "./DrawerNavigator";
import RoleScreen from "../screens/RoleScreens";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const currentSession = await supabase.auth.session();

        setSession(currentSession);

        console.log(currentSession);

        if (currentSession?.user?.id) {
          const { data, error } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", currentSession.user.id)
            .single();

          if (data) {
            setHasProfile(true);
          } else {
            setHasProfile(false);
          }
        }
      } catch (err) {
        console.error("Init error:", err);
        setSession(null);
        setHasProfile(false);
      } finally {
        setIsLoading(false);
      }
    };

    init();

    supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      setIsLoading(true);

      if (newSession?.user?.id) {
        const { data, error } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", newSession.user.id)
          .single();

        if (data) {
          setHasProfile(true);
        } else {
          setHasProfile(false);
        }
      }

      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f8f8",
        }}
      >
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          !hasProfile ? (
            <>
              <Stack.Screen name="Role" component={RoleScreen} />
              <Stack.Screen name="Main" component={DrawerNavigator} />
            </>
          ) : (
            <Stack.Screen name="Main" component={DrawerNavigator} />
          )
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
