import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  orderList: {
    paddingBottom: 10,
  },
  orderItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  itemDetail: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  optionContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  optionDetails: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  optionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    marginBottom: 90,
  },
  continueBtn: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  continueText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
