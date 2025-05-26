import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../style/WatchListStyle";

const watchlistData = [
  {
    id: "1",
    name: "Beats solo3 Bluetooth",
    subtitle: "Winning beat sound",
    price: 450,
    oldPrice: 450,
    rating: 4.3,
    discount: "30% off",
    image: require("../assets/beats.webp"),
  },
  {
    id: "2",
    name: "Realme Airpods",
    subtitle: "Excellent Sounds",
    price: 350.23,
    oldPrice: 450,
    rating: 4.4,
    discount: "",
    image: require("../assets/realme_airpods.jpg"),
  },
  {
    id: "3",
    name: "Smart Wach",
    subtitle: "The ultimate watch",
    price: 820.33,
    oldPrice: null,
    rating: 4.1,
    discount: "",
    image: require("../assets/watch.png"),
  },
  {
    id: "4",
    name: "Vivo Y21",
    subtitle: "4GB ram (30GB)",
    price: 450,
    oldPrice: 550,
    rating: 4.5,
    discount: "20% off",
    image: require("../assets/phone1.jpg"),
  },
  {
    id: "5",
    name: "Macbook",
    subtitle: "Amazing smart laptop",
    price: 2000.12,
    oldPrice: null,
    rating: 4.5,
    discount: "15% off",
    image: require("../assets/macbook.jpeg"),
  },
];

const WatchlistScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.discount !== "" && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      )}
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>
          {item.oldPrice && (
            <Text style={styles.oldPrice}>${item.oldPrice}</Text>
          )}
        </View>
      </View>
      <View style={styles.sideCol}>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        <TouchableOpacity style={styles.addBtn}>
          <MaterialIcons name="plus" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist (5)</Text>
        <TouchableOpacity>
          <Text style={styles.removeAll}>Remove All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={watchlistData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default WatchlistScreen;
