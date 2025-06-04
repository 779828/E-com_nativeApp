import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8ff",
    paddingHorizontal: 10,
    paddingTop: 30,
    marginBottom: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  searchSection: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 10,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  filterText: {
    fontSize: 12,
  },
  dropdownSection: {
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  column: {
    justifyContent: "space-between",
  },
  productList: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    width: width * 0.45,
    marginBottom: 15,
    elevation: 3,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
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
    marginVertical: 5,
    gap: 5,
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
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  icon: {
    color: "#333",
  },
  rating: {
    fontSize: 12,
    color: "#f7b731",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "#5d5fe0",
    borderRadius: 50,
    padding: 5,
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#ff5c5c",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 1,
  },
  discountText: {
    color: "#fff",
    fontSize: 10,
  },
});
