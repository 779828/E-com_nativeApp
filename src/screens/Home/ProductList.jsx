import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchCards } from "../../services/cardService";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import { addItemToCart } from "../../store/cartItemsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToWishlist,
  removeItemFromWishlist,
  fetchUserWishlist,
} from "../../store/wishlistSlice";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

import { styles } from "../../style/ProductListStyle";

export default function ProductList() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const route = useRoute();
  const { categoryId } = route.params || {};

  const wishlist = useSelector((state) => state.wishlist.items);
  const wishlistStatus = useSelector((state) => state.wishlist.status);
  const wishlistError = useSelector((state) => state.wishlist.error);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const productsData = await fetchCards(categoryId);
        setProducts(productsData);
        await dispatch(fetchUserWishlist()).unwrap();
      } catch (error) {
        console.error("Error loading data:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message || "Failed to load products or wishlist",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId, dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const productsData = await fetchCards(categoryId);
      setProducts(productsData);
      await dispatch(fetchUserWishlist()).unwrap();
    } catch (error) {
      console.error("Error refreshing:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to refresh data",
      });
    } finally {
      setRefreshing(false);
    }
  }, [categoryId, dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addItemToCart({ productId, quantity: 1 }));
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Item added to cart!",
      visibilityTime: 2000,
    });
  };

  const handleAddToWishlist = async (productId) => {
    try {
      const wishlistItem = wishlist.find(
        (item) => item.products.id === productId
      );
      if (wishlistItem) {
        await dispatch(removeItemFromWishlist(wishlistItem.id)).unwrap();
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Item removed from wishlist!",
          visibilityTime: 2000,
        });
      } else {
        await dispatch(addItemToWishlist({ productId })).unwrap();
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Item added to wishlist!",
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to update wishlist",
        visibilityTime: 3000,
      });
    }
  };

  const renderProduct = ({ item }) => {
    const isInWishlist = wishlist.some((w) => w.products.id === item.id);

    return (
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
          <Ionicons
            name={isInWishlist ? "heart" : "heart-outline"}
            size={24}
            style={[
              styles.icon,
              isInWishlist ? styles.iconFilled : styles.iconOutline,
            ]}
          />
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
          {item.oldPrice && (
            <Text style={styles.oldPrice}>${item.oldPrice}</Text>
          )}
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
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f8ff" />
      <Header />
      {loading || wishlistStatus === "loading" ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6a51ae" />
        </View>
      ) : wishlistError ? (
        <Text style={styles.emptyText}>Error: {wishlistError}</Text>
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
