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
  Dimensions,
} from "react-native";
import { fetchCategories, fetchCards } from "../../services/cardService";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselItems = [
    { id: "1", image: require("../../../assets/Banner.jpg") },
    { id: "2", image: require("../../../assets/Banner1.jpg") },
    { id: "3", image: require("../../../assets/Banner2.jpg") },
  ];

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

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image
        source={item.image}
        style={styles.carouselImage}
        resizeMode="cover"
      />
    </View>
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
        <Carousel
          width={Dimensions.get("window").width - 20}
          height={280}
          data={carouselItems}
          renderItem={renderCarouselItem}
          loop={true}
          autoPlay={true}
          autoPlayInterval={7000}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <View style={styles.paginationContainer}>
          {carouselItems.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dotStyle,
                activeSlide === index
                  ? styles.activeDotStyle
                  : styles.inactiveDotStyle,
              ]}
            />
          ))}
        </View>
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
    alignItems: "center",
  },
  carouselItem: {
    borderRadius: 16,
    overflow: "hidden",
  },
  carouselImage: {
    width: "100%",
    height: 280,
    borderRadius: 16,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 8,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDotStyle: {
    backgroundColor: "#6a51ae",
  },
  inactiveDotStyle: {
    backgroundColor: "#D1D5DB",
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
