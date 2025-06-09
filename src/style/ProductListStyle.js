import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8ff",
    paddingHorizontal: 10,
    paddingTop: 30,
    marginBottom: 10,
  },
  productList: {
    marginTop: 15,
    paddingBottom: 100,
  },
  column: {
    justifyContent: "space-around",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: width * 0.03,
    width: width * 0.45,
    marginBottom: width * 0.04,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: width * 0.03,
    left: width * 0.03,
    backgroundColor: "#ff5c5c",
    borderRadius: 5,
    paddingHorizontal: width * 0.015,
    paddingVertical: width * 0.005,
    zIndex: 1,
  },
  discountText: {
    color: "#fff",
    fontSize: 10,
  },
  wishBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
  icon: {
    alignItems: "center",
  },
  iconFilled: {
    color: "#ff0000",
  },
  iconOutline: {
    color: "#777",
  },
  productImage: {
    width: "100%",
    height: 100,
    marginBottom: 10,
    resizeMode: "contain",
  },
  productName: {
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 2,
  },
  spec: {
    fontSize: width * 0.03,
    color: "#777",
    textAlign: "center",
    marginVertical: width * 0.01,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: width * 0.01,
    gap: width * 0.015,
  },
  price: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#333",
  },
  oldPrice: {
    fontSize: width * 0.03,
    color: "#aaa",
    textDecorationLine: "line-through",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: width * 0.02,
  },
  rating: {
    fontSize: width * 0.035,
    color: "#f7b731",
  },
  addBtn: {
    backgroundColor: "#5d5fe0",
    borderRadius: 50,
    padding: width * 0.015,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: width * 0.04,
    color: "#777",
    textAlign: "center",
    padding: width * 0.04,
  },
});
