import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import { styles } from "../../style/OrderHistoryStyle";

const OrderHistoryScreen = () => {
  const navigation = useNavigation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        setLoading(true);
        const session = supabase.auth.session();

        const user = session?.user;

        if (!session) {
          navigation.navigate("Auth");
          return;
        }

        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
        Alert.alert("Error", "Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestOrder();
  }, [navigation]);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.itemName}>Product ID: {item.product_id}</Text>
      <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemDetail}>Price: ${item.price}</Text>
      <Text style={styles.itemDetail}>Name: {item.name}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No order found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thank You for Your Order!</Text>
        <Text style={styles.sectionSubtitle}>
          Your order has been placed successfully.You will pay with Cash on
          Delivery.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <FlatList
          data={order.items}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.orderList}
        />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${order.total}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.continueText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderHistoryScreen;
