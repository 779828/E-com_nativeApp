import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../style/CartStyle";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserCart,
  updateItemQuantity,
  removeItemFromCart,
} from "../../store/cartItemsSlice";

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { items, error } = useSelector((state) => state.cartItem);

  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    try {
      if (quantity < 1) {
        await dispatch(removeItemFromCart(cartItemId)).unwrap();
      } else {
        await dispatch(updateItemQuantity({ cartItemId, quantity })).unwrap();
      }
      dispatch(fetchUserCart());
    } catch (err) {
      console.error("Error updating quantity:", err);
      Alert.alert("Error", "Failed to update quantity.");
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.products.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.products.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.products.name}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Text style={styles.quantityText}>–</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemActions}>
        <Text style={styles.itemPrice}>
          ${(item.products.price * item.quantity).toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => dispatch(removeItemFromCart(item.id))}
        >
          <Ionicons name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 24 }} />
      </View>

      {error ? (
        <Text style={styles.emptyText}>Error: {error}</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cartList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          }
        />
      )}

      {subtotal ? (
        <View style={styles.footer}>
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>Free</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addMoreBtn}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.addMoreText}>Add More</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate("Checkout")}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addMoreBtn}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.addMoreText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
