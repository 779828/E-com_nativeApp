import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7ff",
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 20,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  colors: {
    flexDirection: "column",
    position: "absolute",
    left: 15,
    top: 20,
    gap: 12,
  },
  colorDot: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  activeDot: {
    borderColor: "#000",
    borderWidth: 2,
  },
  productImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginTop: 30,
  },
  iconBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  icon: {
    color: "#888",
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    color: "#777",
    fontSize: 15,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#aaa",
    marginLeft: 10,
  },
  discountTag: {
    backgroundColor: "#ffdddd",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 10,
  },
  discountText: {
    color: "#f55",
    fontWeight: "bold",
    fontSize: 12,
  },
  features: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  detailsLabel: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  description: {
    color: "#555",
    fontSize: 15,
    lineHeight: 20,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  bagBtn: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  bagText: {
    color: "#000",
    fontWeight: "600",
  },
  buyBtn: {
    backgroundColor: "#3b4cc0",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buyText: {
    color: "#fff",
    fontWeight: "600",
  },
  battery: {
    borderRadius: 10,
    padding: 13,
    backgroundColor: "#f1f1f1",
  },
});
