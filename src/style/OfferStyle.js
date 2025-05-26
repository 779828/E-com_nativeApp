import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8ff",
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
  },
  banner: {
    backgroundColor: "#dce0fd",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  bannerText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
  },
  timer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  timeBox: {
    backgroundColor: "#2f2e41",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    minWidth: 30,
    textAlign: "center",
  },
  trendCard: {
    backgroundColor: "#2f2e41",
    borderRadius: 16,
    padding: 20,
    position: "relative",
    marginBottom: 20,
  },
  trendTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  trendSubtitle: {
    color: "#ddd",
    marginTop: 6,
    marginBottom: 10,
    fontSize: 12,
  },
  shopBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  shopText: {
    fontWeight: "600",
    color: "#2f2e41",
    fontSize: 12,
  },
  trendImg: {
    position: "absolute",
    right: 20,
    bottom: 10,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  dealHeading: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  dealCard: {
    width: 150,
    borderRadius: 14,
    padding: 12,
    marginRight: 10,
  },
  dealText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 13,
    marginBottom: 10,
  },
  dealImage: {
    width: 60,
    height: 60,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
