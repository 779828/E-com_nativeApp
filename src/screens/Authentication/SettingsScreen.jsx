import { useState } from "react";
import { View, Text, Switch, Button, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { styles } from "../../style/SettingStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    await AsyncStorage.removeItem("user");
    if (error) {
      Alert.alert("Logout Error", error.message);
    } else {
      navigation.dispatch({
        ...StackActions.reset({
          index: 0,
          routes: [{ name: "Auth" }],
        }),
        target: navigation.getRootState().key,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      <View style={styles.logoutBtn}>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
};

export default SettingsScreen;
