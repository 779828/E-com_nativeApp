import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../style/OfferStyle";

const topDeals = [
  {
    id: "1",
    text: "Get Excited gifts on\npurchase upto $458.26",
    bgColor: "#fd7e4d",
    image: require("../assets/gift1.jpeg"),
  },
  {
    id: "2",
    text: "Get Excited gifts on\npurchase upto $458.26",
    bgColor: "#47c8d7",
    image: require("../assets/gift2.png"),
  },
];

const OfferScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Offers</Text>
        <View style={styles.icons}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Icon name="heart-outline" size={22} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="cart-outline" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Buy Any one get other{"\n"}one in half price
        </Text>
        <View style={styles.timer}>
          <Text style={styles.timeBox}>12</Text>
          <Text style={styles.timeBox}>05</Text>
          <Text style={styles.timeBox}>40</Text>
        </View>
      </View>

      <View style={styles.trendCard}>
        <Text style={styles.trendTitle}>
          20 % off in Headphones &{"\n"}Airpods
        </Text>
        <Text style={styles.trendSubtitle}>Grab yours one today</Text>
        <TouchableOpacity style={styles.shopBtn}>
          <Text style={styles.shopText}>Shop Now →</Text>
        </TouchableOpacity>
        <Image
          source={require("../assets/realme_airpods.png")}
          style={styles.trendImg}
        />
      </View>

      <Text style={styles.dealHeading}>Top Deals Of The Day</Text>
      <FlatList
        horizontal
        data={topDeals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.dealCard, { backgroundColor: item.bgColor }]}>
            <Text style={styles.dealText}>{item.text}</Text>
            <Image source={item.image} style={styles.dealImage} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default OfferScreen;
