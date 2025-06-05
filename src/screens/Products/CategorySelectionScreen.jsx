import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { styles } from "../../style/CategorySelectionStyle";

const CategorySelectionScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  console.log(categories);

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

  const handleCategorySelect = (category) => {
    navigation.navigate("CreateProduct", { selectedCategory: category });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategorySelect(item)}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select a Category</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No categories available</Text>}
      />
    </View>
  );
};

export default CategorySelectionScreen;
