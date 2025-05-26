import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import { styles } from "../style/HomeStyle";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>
          <Text style={styles.logoDot1}>M</Text>
          <Text style={styles.logoDot2}>ido</Text>
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/watch.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.indicator}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Discover your best Products</Text>
        <Text style={styles.subtitle}>
          You will be able to find a wide section of electronics from top
          brands.
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Let’s Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
