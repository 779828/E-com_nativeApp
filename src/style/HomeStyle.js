import { StyleSheet, Dimensions } from "react-native";

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
    alignItems: "center",
  },
  carouselItem: {
    borderRadius: 16,
    overflow: "hidden",
  },
  carouselImage: {
    width: "100%",
    height: 280,
    borderRadius: 16,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 8,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDotStyle: {
    backgroundColor: "#6a51ae",
  },
  inactiveDotStyle: {
    backgroundColor: "#D1D5DB",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    color: "#1F2937",
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryList: {
    paddingVertical: 10,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    width: (Dimensions.get("window").width - 48) / 2,
    height: 150,
    marginBottom: 16,
  },
  categoryImage: {
    width: 90,
    height: 90,
    borderRadius: 30,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#374151",
  },
});
