import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
import { supabase } from "../../lib/supabase";
import { getProfile, updateProfile } from "../../services/profileService";
import { styles } from "../../style/EditProfileStyle";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);

        const session = supabase.auth.session();

        const userId = session?.user?.id;
        if (!userId) {
          throw new Error("User not authenticated");
        }
        setUserId(userId);

        const profile = await getProfile(userId);

        if (profile) {
          setFirstName(profile.first_name || "");
          setLastName(profile.last_name || "");
          setPhoneNumber(profile.phone_number || "");
          setImageUri(profile.image_url || null);
        } else {
          throw new Error("Profile not found");
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message || "Failed to load profile",
          position: "bottom",
          visibilityTime: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

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
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log("Selected image URI:", result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!firstName || !lastName || !phoneNumber) {
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
      let imageUrl = imageUri;
      if (imageUri && imageUri.startsWith("file://")) {
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        console.log("Base64 length:", base64.length);

        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const fileName = `profile_${userId}_${Date.now()}.jpg`;
        console.log("Uploading image:", fileName);

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

        console.log("Image uploaded successfully:", uploadData);

        const { data: publicUrlData } = supabase.storage
          .from("profile-image")
          .getPublicUrl(fileName);

        if (!publicUrlData?.publicURL) {
          console.error("URL error: No public URL returned", publicUrlData);
          throw new Error("Failed to get public URL");
        }

        imageUrl = publicUrlData.publicURL;
        console.log("Generated public URL:", imageUrl);
      }

      const updatedProfile = await updateProfile(userId, {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        image_url: imageUrl,
      });

      if (updatedProfile) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile updated successfully!",
          position: "bottom",
          visibilityTime: 2000,
        });
        navigation.navigate("ProfileScreen");
      } else {
        throw new Error("Profile update returned no data");
      }
    } catch (error) {
      console.error("Profile Update Error:", error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to update profile",
        position: "bottom",
        visibilityTime: 3000,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#6a51ae" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.title}>Edit Profile</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.avatar} />
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

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
