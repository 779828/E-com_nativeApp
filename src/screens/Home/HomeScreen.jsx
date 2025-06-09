import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { fetchCategories, fetchCards } from "../../services/cardService";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";

import { styles } from "../../style/HomeStyle";

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
