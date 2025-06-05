import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  fetchUserWishlist,
  removeItemFromWishlist,
  clearUserWishlist,
} from "../../store/wishlistSlice";
import { addToCart } from "../../services/cartItemService";
import { styles } from "../../style/WatchListStyle";
import { fetchUserCart } from "../../store/cartItemsSlice";
import Toast from "react-native-toast-message";

const WishlistScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    items: wishlistItems,
    status,
    error,
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchUserWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = async (wishlistItemId) => {
    try {
      await dispatch(removeItemFromWishlist(wishlistItemId)).unwrap();
    } catch (error) {
      alert("Failed to remove item: " + error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      dispatch(fetchUserCart());
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Product added to cart successfully!",
      });
    } catch (error) {
      alert("Failed to add to cart: " + error.message);
    }
  };

  const handleClearWishlist = async () => {
    try {
      await dispatch(clearUserWishlist()).unwrap();
    } catch (error) {
      alert("Failed to clear wishlist: " + error);
    }
  };

  const handleRetry = () => {
    dispatch(fetchUserWishlist());
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.products.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.products.discount}% off</Text>
        </View>
      )}
      <Image
        source={{ uri: item.products.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.products.name}</Text>
        <Text style={styles.subtitle}>{item.products.spec}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.products.price}</Text>
          {item.products.oldPrice && (
            <Text style={styles.oldPrice}>${item.products.oldPrice}</Text>
          )}
        </View>
      </View>
      <View style={styles.sideCol}>
        <Text style={styles.rating}>⭐ {item.products.rating || "N/A"}</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => handleRemoveFromWishlist(item.id)}
          >
            <Ionicons name="trash-outline" size={18} color="#ff5c5c" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => handleAddToCart(item.products.id)}
          >
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          My Wishlist ({wishlistItems.length})
        </Text>
        {wishlistItems.length > 0 && (
          <TouchableOpacity onPress={handleClearWishlist}>
            <Text style={styles.removeAll}>Remove All</Text>
          </TouchableOpacity>
        )}
      </View>

      {status === "failed" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={handleRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      {wishlistItems.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your wishlist is empty.</Text>
        </View>
      )}
      {wishlistItems.length > 0 && (
        <FlatList
          data={wishlistItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

export default WishlistScreen;
