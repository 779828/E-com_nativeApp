import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1F2937",
  },
  searchInput: {
    height: 45,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
  },
  bannerContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  bannerImage: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    resizeMode: "cover",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    color: "#1F2937",
  },
  categoryList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginRight: 12,
    alignItems: "center",
    elevation: 2,
    width: 200,
    height: 150,
  },
  categoryImage: {
    width: 90,
    height: 90,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#374151",
  },
});
