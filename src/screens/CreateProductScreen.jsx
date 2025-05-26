import { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { createCard } from "../services/cardService";
import { styles } from "../style/CreateProductStyle";
import { supabase } from "../lib/supabase";
import { Picker } from "@react-native-picker/picker";

const CreateProductScreen = () => {
  const [form, setForm] = useState({
    name: "",
    spec: "",
    price: "",
    oldPrice: "",
    rating: "",
    discount: "",
    image: "",
    category_id: null,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("id, name")
          .in("name", ["Android Phones", "iPhones"]);
        if (error) {
          console.error("Error fetching categories:", error);
          Alert.alert("Error", "Failed to load categories");
          return;
        }
        setCategories(data);
      } catch (error) {
        console.error("Fetch categories error:", error);
        Alert.alert("Error", "Something went wrong");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "Please allow access to your photo library."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      maxWidth: 300,
      maxHeight: 300,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      handleChange("image", result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!form.category_id) {
      Alert.alert("Error", "Please select a category");
      return;
    }

    try {
      let imageUrl = "";
      if (form.image) {
        const base64 = await FileSystem.readAsStringAsync(form.image, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const fileName = `product-${Date.now()}.jpg`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("product-image01")
          .upload(fileName, byteArray, {
            contentType: "image/jpeg",
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }

        const { data: urlData } = supabase.storage
          .from("product-image01")
          .getPublicUrl(fileName);

        if (!urlData?.publicURL) {
          console.error("URL error: No public URL returned");
          throw new Error("Failed to get public URL");
        }

        imageUrl = urlData?.publicURL;
      }

      const data = await createCard({
        name: form.name,
        spec: form.spec,
        price: parseFloat(form.price),
        oldPrice: parseFloat(form.oldPrice),
        rating: parseFloat(form.rating),
        discount: parseFloat(form.discount),
        image: imageUrl,
        category_id: form.category_id,
      });

      if (data) {
        Alert.alert("Success", "Product created successfully");
        setForm({
          name: "",
          spec: "",
          price: "",
          oldPrice: "",
          rating: "",
          discount: "",
          image: "",
          category_id: null,
        });
      } else {
        Alert.alert("Error", "Failed to create product");
      }
    } catch (error) {
      console.error("Submit error:", error);
      Alert.alert("Error", `Failed to create product: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Create Product</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Spec"
          value={form.spec}
          onChangeText={(text) => handleChange("spec", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={form.price}
          onChangeText={(text) => handleChange("price", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Old Price"
          keyboardType="numeric"
          value={form.oldPrice}
          onChangeText={(text) => handleChange("oldPrice", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Rating"
          keyboardType="numeric"
          value={form.rating}
          onChangeText={(text) => handleChange("rating", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Discount"
          keyboardType="numeric"
          value={form.discount}
          onChangeText={(text) => handleChange("discount", text)}
        />

        <View>
          <Picker
            selectedValue={form.category_id}
            onValueChange={(value) => handleChange("category_id", value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Category" value={null} />
            {categories.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.chooseImageBtn}
          onPress={handleImagePick}
          activeOpacity={0.7}
        >
          <Text style={styles.chooseImageBtnText}>Choose Image</Text>
        </TouchableOpacity>

        {form.image ? (
          <View style={styles.imagePreview}>
            <Image
              source={{ uri: form.image }}
              style={{ width: 100, height: 100, marginTop: 10 }}
            />
          </View>
        ) : null}

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateProductScreen;
