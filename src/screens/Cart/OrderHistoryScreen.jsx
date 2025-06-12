import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../style/OrderHistoryStyle";
import { fetchOrders } from "../../services/orderService";
import Toast from "react-native-toast-message";

const OrderHistoryScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const productsData = await fetchOrders();
      setOrders(productsData);
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productsData = await fetchOrders();
        setOrders(productsData);
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

    fetchData();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No orders found.</Text>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.continueText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderOrder = ({ item: order }) => (
    <View>
      <View style={styles.hrLine} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order #{order.id}</Text>
        <View style={styles.orderItem}>
          {order.products ? (
            <>
              <Text style={styles.itemName}>{order.products.name}</Text>
              <Text style={styles.itemDetail}>
                Product ID: {order.product_id}
              </Text>
              <Text style={styles.itemDetail}>
                Price: ${order.products.price}
              </Text>
              <Text style={styles.itemDetail}>Quantity: {order.quantity}</Text>
              <Text style={styles.itemDetail}>
                Subtotal: $
                {(parseFloat(order.products.price) * order.quantity).toFixed(2)}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.itemName}>
                Product Unavailable (ID: {order.product_id})
              </Text>
              <Text style={styles.itemDetail}>Quantity: {order.quantity}</Text>
            </>
          )}
        </View>
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Order Date</Text>
            <Text style={styles.summaryValue}>
              {new Date(order.created_at).toLocaleDateString()} at{" "}
              {new Date(order.created_at).toLocaleTimeString("en-US", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Address</Text>
            <Text style={styles.summaryValue}>
              {order.address
                ? `${order.address.title}: ${order.address.subtitle}`
                : "Not specified"}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Status</Text>
            <Text
              style={[
                styles.summaryValue,
                { color: getStatusColor(order.status) },
              ]}
            >
              {order.status}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>${order.total}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#007BFF"]}
          />
        }
      />

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

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "orange";
    case "Processing":
      return "blue";
    case "Shipped":
      return "purple";
    case "Delivered":
      return "green";
    default:
      return "black";
  }
};

export default OrderHistoryScreen;
