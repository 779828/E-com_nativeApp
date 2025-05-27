import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8ff",
    marginBottom: 100,
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    marginTop: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoDot1: {
    color: "#5d5fe0",
  },
  logoDot2: {
    color: "#333",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
  },
  indicator: {
    marginVertical: 10,
    flexDirection: "row",
  },
  dot: {
    width: 30,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#5d5fe0",
  },
  textContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#1a1a1a",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#9aa0b0",
    textAlign: "center",
    lineHeight: 20,
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#5d5fe0",
    borderTopLeftRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
