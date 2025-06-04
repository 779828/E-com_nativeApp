import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { fetchCategories, fetchCards } from "../../services/cardService";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Problem loading data:", error);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const handleSearch = async (text) => {
    setSearchQuery(text);
    const filtered = await fetchCards(null, text);
    setProducts(filtered);
  };

  const handleCategoryPress = (categoryId) => {
    navigation.navigate("ProductList", { categoryId });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item.id)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.categoryImage}
        resizeMode="cover"
      />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello 👋</Text>
        <TextInput
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.bannerContainer}>
        <Image
          source={require("../../../assets/Banner.jpg")}
          style={styles.bannerImage}
        />
      </View>

      <Text style={styles.sectionTitle}>Shop by Category</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategory}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1F2937",
  },
  searchInput: {
    height: 45,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
  },
  bannerContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  bannerImage: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    resizeMode: "cover",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    color: "#1F2937",
  },
  categoryList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    width: 200,
    height: 150,
  },
  categoryImage: {
    width: 90,
    height: 90,
    borderRadius: 30,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#374151",
  },
});
