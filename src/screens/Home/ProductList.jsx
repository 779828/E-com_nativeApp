import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Alert,
  RefreshControl,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchCards } from "../../services/cardService";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import { addItemToCart } from "../../store/cartItemsSlice";
import { useDispatch } from "react-redux";
import { addItemToWishlist } from "../../store/wishlistSlice";

const { width } = Dimensions.get("window");

export default function ProductList() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId } = route.params || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const productsData = await fetchCards(categoryId);
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCards().then(() => setRefreshing(false));
  }, []);

  const handleAddToCart = (productId) => {
    dispatch(addItemToCart({ productId, quantity: 1 }));
    Alert.alert("Success", "Item added to cart!");
  };

  const handleAddToWishlist = (productId) => {
    dispatch(addItemToWishlist({ productId }));
    Alert.alert("Success", "Item added to cart!");
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Details", {
          product: item,
        })
      }
    >
      {item.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}% off</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.wishBtn}
        onPress={() => handleAddToWishlist(item.id)}
      >
        <Ionicons name="heart-outline" size={24} style={styles.icon} />
      </TouchableOpacity>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.spec}>{item.spec}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price}</Text>
        {item.oldPrice && <Text style={styles.oldPrice}>${item.oldPrice}</Text>}
      </View>
      <View style={styles.footerRow}>
        <Text style={styles.rating}>⭐ {item.rating || "N/A"}</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => handleAddToCart(item.id)}
        >
          <Ionicons name="add" size={width * 0.045} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f8ff" />
      <Header />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6a51ae" />
        </View>
      ) : products.length === 0 ? (
        <Text style={styles.emptyText}>No products found.</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.productList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#007BFF"]}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8ff",
    paddingHorizontal: 10,
    paddingTop: 30,
    marginBottom: 10,
  },
  productList: {
    marginTop: 15,
    paddingBottom: 100,
  },
  column: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: width * 0.03,
    width: width * 0.45,
    marginBottom: width * 0.04,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: width * 0.03,
    left: width * 0.03,
    backgroundColor: "#ff5c5c",
    borderRadius: 5,
    paddingHorizontal: width * 0.015,
    paddingVertical: width * 0.005,
    zIndex: 1,
  },
  discountText: {
    color: "#fff",
    fontSize: 10,
  },
  wishBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
  icon: {
    alignItems: "center",
    color: "red",
  },
  productImage: {
    width: "100%",
    height: 100,
    marginBottom: 10,
    resizeMode: "contain",
  },
  productName: {
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 2,
  },
  spec: {
    fontSize: width * 0.03,
    color: "#777",
    textAlign: "center",
    marginVertical: width * 0.01,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: width * 0.01,
    gap: width * 0.015,
  },
  price: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#333",
  },
  oldPrice: {
    fontSize: width * 0.03,
    color: "#aaa",
    textDecorationLine: "line-through",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: width * 0.02,
  },
  rating: {
    fontSize: width * 0.035,
    color: "#f7b731",
  },
  addBtn: {
    backgroundColor: "#5d5fe0",
    borderRadius: 50,
    padding: width * 0.015,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: width * 0.04,
    color: "#777",
    textAlign: "center",
    padding: width * 0.04,
  },
});
