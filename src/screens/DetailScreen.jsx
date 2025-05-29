import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { styles } from "../style/DetailStyle";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/cartItemsSlice";
import Header from "../components/Header";

const DetailsScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { product } = route.params;
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || "blue"
  );

  const handleAddToCart = (productId) => {
    dispatch(addItemToCart({ productId, quantity: 1 }));
    Alert.alert("Success", "Item added to cart!");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      <ScrollView>
        <Header />

        <View style={styles.imageContainer}>
          {product.colors && product.colors.length > 0 && (
            <View style={styles.colors}>
              {product.colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorDot,
                    { backgroundColor: color },
                    selectedColor === color && styles.activeDot,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>
          )}
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.iconBar}>
            <Ionicons name="headset-outline" size={24} style={styles.icon} />
            <Ionicons
              name="musical-notes-outline"
              size={24}
              style={styles.icon}
            />
            <Ionicons name="volume-medium" size={24} style={styles.icon} />
            <Ionicons
              name="lock-closed-outline"
              size={24}
              style={styles.icon}
            />
          </View>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.subtitle}>{product.spec}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price}</Text>
            {product.oldPrice && (
              <Text style={styles.oldPrice}>${product.oldPrice}</Text>
            )}
            {product.discount && product.discount !== "" && (
              <View style={styles.discountTag}>
                <Text style={styles.discountText}>{product.discount}% off</Text>
              </View>
            )}
          </View>

          <View style={styles.features}>
            <Ionicons
              name="battery-charging-outline"
              size={18}
              style={styles.battery}
            />
            <Ionicons
              name="bluetooth-outline"
              size={18}
              style={styles.battery}
            />
            <Ionicons name="volume-high" size={18} style={styles.battery} />
          </View>

          <Text style={styles.detailsLabel}>Details :</Text>
          <Text style={styles.description}>{product.description}</Text>
          {product.rating && (
            <Text style={styles.rating}>⭐ {product.rating}</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bagBtn}
          onPress={() => handleAddToCart(product.id)}
        >
          <Text style={styles.bagText}>+ Add to Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyBtn}>
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsScreen;
