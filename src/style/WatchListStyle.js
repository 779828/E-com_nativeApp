import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#f6f8ff",
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  removeAll: {
    color: "#5d5fe0",
    fontWeight: "bold",
    fontSize: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    alignItems: "center",
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#ff5c5c",
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 1,
  },
  discountText: {
    fontSize: 10,
    color: "#fff",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: "#888",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 3,
  },
  price: {
    fontWeight: "bold",
    color: "#333",
  },
  oldPrice: {
    textDecorationLine: "line-through",
    fontSize: 12,
    color: "#aaa",
  },
  rating: {
    fontSize: 12,
    marginBottom: 5,
    color: "#f7b731",
  },
  addBtn: {
    backgroundColor: "#5d5fe0",
    padding: 6,
    borderRadius: 50,
    alignItems: "center",
  },
  sideCol: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 60,
  },
});
