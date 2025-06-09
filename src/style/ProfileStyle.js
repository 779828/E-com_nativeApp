import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f5f5f5",
    marginTop: 100,
  },
  container: {
    padding: 20,
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    color: "#111827",
  },
  phone_number: {
    fontSize: 20,
    color: "#000",
    marginTop: 4,
  },
  activeStatus: {
    fontSize: 20,
    color: "#10b981",
    marginTop: 4,
  },
  optionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 10,
    marginBottom: 30,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  optionLabel: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: "#374151",
  },
  logoutButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
