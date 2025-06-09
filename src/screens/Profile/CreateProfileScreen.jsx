import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
import { supabase } from "../../lib/supabase";
import { createProfile } from "../../services/profileService";
import { styles } from "../../style/CreateProfileStyle";

const CreateProfileScreen = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("user");
  const [userId, setUserId] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const session = supabase.auth.session();

      const fallbackId = session?.user?.id;

      console.log("Fallback userId from session:", fallbackId);

      setUserId(fallbackId);

      if (!fallbackId) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "User not authenticated",
          position: "bottom",
          visibilityTime: 3000,
        });
        navigation.navigate("Login");
      }
    };

    getUserId();
  }, [navigation]);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Permission to access gallery denied",
        position: "bottom",
        visibilityTime: 3000,
      });
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      maxWidth: 500,
      maxHeight: 500,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!firstName || !lastName || !phoneNumber || !role || !imageUri) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fill all required fields",
        position: "bottom",
        visibilityTime: 3000,
      });
      return;
    }

    try {
      let imageUrl = null;
      if (imageUri) {
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const fileName = `profile_${userId}_${Date.now()}.jpg`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("profile-image")
          .upload(fileName, byteArray, {
            contentType: "image/jpeg",
            upsert: true,
          });

        if (uploadError) {
          console.error("Upload error details:", uploadError);
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from("profile-image")
          .getPublicUrl(fileName);

        if (!publicUrlData?.publicURL) {
          console.error("URL error: No public URL returned", publicUrlData);
          throw new Error("Failed to get public URL");
        }

        imageUrl = publicUrlData.publicURL;
      }

      const profileData = await createProfile({
        id: userId,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        role,
        image_url: imageUrl,
      });

      if (profileData) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile saved successfully!",
          position: "bottom",
          visibilityTime: 2000,
        });

        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      } else {
        throw new Error("Profile creation returned no data");
      }
    } catch (error) {
      console.error("Profile Save Error:", error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to save profile",
        position: "bottom",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Complete Your Profile</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Add Profile Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>First Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter first name"
          onChangeText={setFirstName}
          value={firstName}
        />

        <Text style={styles.label}>Last Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter last name"
          onChangeText={setLastName}
          value={lastName}
        />

        <Text style={styles.label}>Phone Number *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />

        <Text style={styles.label}>Select Role *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="User" value="user" />
            <Picker.Item label="Admin" value="admin" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateProfileScreen;
