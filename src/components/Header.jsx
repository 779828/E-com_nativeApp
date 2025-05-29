import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../style/HeaderStyle";

import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserCart } from "../store/cartItemsSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cartItem.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Accessories & Details</Text>
      <View style={styles.iconGroup}>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <View style={styles.cartContainer}>
            <Ionicons name="cart-outline" size={24} style={styles.icon} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartCount}>{cartCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
