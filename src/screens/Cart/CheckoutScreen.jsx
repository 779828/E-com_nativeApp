import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../style/CheckoutStyle";
import { supabase } from "../../lib/supabase";
import { clearCart, clearCartItems } from "../../store/cartItemsSlice";
import { addToOrder } from "../../services/orderService";

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cartItem);
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      (item.products?.price
        ? parseFloat(item.products.price) * item.quantity
        : 0),
    0
  );
  const total = subtotal;

  const [selectedAddress, setSelectedAddress] = useState("home");
  const [selectedPayment, setSelectedPayment] = useState("cod");

  const addresses = [
    {
      key: "home",
      title: "Home",
      subtitle: "123 Green House, Sydney, NSW 2000, AUS",
    },
    {
      key: "office",
      title: "Office",
      subtitle: "456 Blue Tower, Sydney, NSW 2001, AUS",
    },
  ];

  const payments = [
    {
      key: "cod",
      title: "Cash on Delivery",
      subtitle: "Pay when you receive the order",
    },
    {
      key: "card",
      title: "Credit/Debit Card",
      subtitle: "Pay securely online",
    },
  ];

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const session = supabase.auth.session();
      const user = session?.user;

      if (!user) {
        Alert.alert("Error", "You must be logged in to checkout.");
        navigation.navigate("Auth");
        return;
      }

      if (!items || items.length === 0) {
        Alert.alert("Error", "Your cart is empty.");
        return;
      }

      const selectedAddressData = addresses.find(
        (addr) => addr.key === selectedAddress
      );

      const paymentMethod =
        selectedPayment === "cod" ? "Cash on Delivery" : "Credit/Debit Card";

      // Debug log to check items
      console.log("Cart Items:", items);

      const ordersToInsert = items.map((item) => ({
        user_id: user.id,
        total: (parseFloat(item.products.price) * item.quantity).toFixed(2),
        quantity: item.quantity,
        status: "confirmed",
        payment_method: paymentMethod,
        product_id: item.products.id,
        address: {
          title: selectedAddressData.title,
          subtitle: selectedAddressData.subtitle,
        },
        vendor_id: item.products.user_id,
      }));

      console.log(ordersToInsert);

      if (ordersToInsert.length === 0) {
        throw new Error(
          "No valid items to place an order. Check your cart for invalid items."
        );
      }

      const { error: orderError } = await addToOrder(ordersToInsert);

      if (orderError) {
        throw new Error(orderError.message);
      }

      const ordersPlaced = ordersToInsert.length;

      const { error: deleteError } = dispatch(clearCartItems());

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      dispatch(clearCart());

      Toast.show({
        type: "success",
        text1: "Success",
        text2: `Order${
          ordersPlaced > 1 ? "s" : ""
        } placed successfully! You will pay with ${paymentMethod}.`,
        visibilityTime: 5000,
      });

      navigation.navigate("Home");
    } catch (error) {
      console.error("Checkout error:", error);
      Alert.alert("Error", "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        {addresses.map((address) => (
          <TouchableOpacity
            key={address.key}
            style={styles.optionContainer}
            onPress={() => setSelectedAddress(address.key)}
          >
            <View style={styles.optionDetails}>
              <Text style={styles.optionTitle}>{address.title}</Text>
              <Text style={styles.optionSubtitle}>{address.subtitle}</Text>
            </View>
            <Ionicons
              name={
                selectedAddress === address.key
                  ? "checkmark-circle"
                  : "ellipse-outline"
              }
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment</Text>
        {payments.map((payment) => (
          <TouchableOpacity
            key={payment.key}
            style={styles.optionContainer}
            onPress={() => setSelectedPayment(payment.key)}
          >
            <View style={styles.optionDetails}>
              <Text style={styles.optionTitle}>{payment.title}</Text>
              <Text style={styles.optionSubtitle}>{payment.subtitle}</Text>
            </View>
            <Ionicons
              name={
                selectedPayment === payment.key
                  ? "checkmark-circle"
                  : "ellipse-outline"
              }
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.placeOrderBtn, loading && styles.disabledBtn]}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.placeOrderText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutScreen;
