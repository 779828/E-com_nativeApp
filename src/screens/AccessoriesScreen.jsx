import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../style/AccessoriesStyle";
import { useCallback, useEffect, useState } from "react";
import { fetchCards, fetchCategories } from "../services/cardService";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/cartItemsSlice";

const AccessoriesScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      if (categories.length === 0) {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
      }

      const productData = await fetchCards(
        selectedCategory || null,
        searchQuery
      );
      setCards(productData);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch products. Please try again.");
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (productId) => {
    dispatch(addItemToCart({ productId, quantity: 1 }));
    Alert.alert("Success", "Item added to cart!");
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Details", {
          product: item,
        })
      }
    >
      {item.discount && item.discount !== "" && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}%</Text>
        </View>
      )}
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.spec}>{item.spec}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.oldPrice}>${item.oldPrice}</Text>
      </View>
      <View style={styles.footerRow}>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => handleAddToCart(item.id)}
        >
          <MaterialIcon name="plus" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      <Header />
      <View style={styles.searchSection}>
        <TextInput
          placeholder="Search here..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Icon name="funnel-outline" size={18} />
          <Text style={styles.filterText}>Filter by (2)</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dropdownSection}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
          style={styles.picker}
        >
          <Picker.Item label="All Categories" value="" />
          {categories.map((category) => (
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.id}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.sortFilterRow}>
        <TouchableOpacity style={styles.sortFilterBtn}>
          <Text>Sort by</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortFilterBtn}>
          <Text>Filter by (2)</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <FlatList
      style={styles.container}
      data={cards}
      renderItem={renderProductItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.productList}
      ListHeaderComponent={renderHeader}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#007BFF"]}
        />
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>No products found.</Text>
      }
    />
  );
};

export default AccessoriesScreen;
