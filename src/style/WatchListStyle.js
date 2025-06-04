// import { StyleSheet } from "react-native";

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 40,
//     backgroundColor: "#f6f8ff",
//     paddingHorizontal: 15,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     // justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     marginLeft: 130,
//   },
//   removeAll: {
//     color: "#5d5fe0",
//     fontWeight: "bold",
//     fontSize: 12,
//   },
//   card: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 15,
//     elevation: 2,
//     alignItems: "center",
//     position: "relative",
//   },
//   discountBadge: {
//     position: "absolute",
//     top: 5,
//     left: 5,
//     backgroundColor: "#ff5c5c",
//     borderRadius: 4,
//     paddingHorizontal: 5,
//     paddingVertical: 2,
//     zIndex: 1,
//   },
//   discountText: {
//     fontSize: 10,
//     color: "#fff",
//     fontWeight: "600",
//   },
//   image: {
//     margin: 5,
//     width: 60,
//     height: 60,
//     marginRight: 10,
//   },
//   details: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   name: {
//     fontWeight: "600",
//     fontSize: 14,
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 12,
//     color: "#888",
//   },
//   priceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     marginTop: 3,
//   },
//   price: {
//     fontWeight: "bold",
//     color: "#333",
//   },
//   oldPrice: {
//     textDecorationLine: "line-through",
//     fontSize: 12,
//     color: "#aaa",
//   },
//   rating: {
//     fontSize: 12,
//     marginBottom: 5,
//     color: "#f7b731",
//   },
//   buttonGroup: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   removeBtn: {
//     backgroundColor: "#fff",
//     padding: 6,
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: "#ff5c5c",
//     alignItems: "center",
//   },
//   addBtn: {
//     backgroundColor: "#5d5fe0",
//     padding: 6,
//     borderRadius: 50,
//     alignItems: "center",
//   },
//   sideCol: {
//     alignItems: "flex-end",
//     justifyContent: "space-between",
//     height: 60,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     fontSize: 14,
//     color: "#ff5c5c",
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   emptyText: {
//     fontSize: 14,
//     color: "#888",
//   },
// });

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
    color: "#333",
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
    fontWeight: "600",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
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
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
  },
  removeBtn: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ff5c5c",
    alignItems: "center",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 14,
    color: "#ff5c5c",
    marginBottom: 10,
  },
  retryBtn: {
    backgroundColor: "#5d5fe0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#888",
  },
});
