import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rowSpaceEvenly: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  buttonView: {
    marginTop: 5,
    padding: 10,
    height: 50,
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6200EE",
    flexDirection: "row",
  },

  buttonText: { color: "white", fontSize: 15 },
  rowSpaceBetweenCard: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  fileCard: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "95%",
    borderRadius: 8,
    backgroundColor: "white",
    padding: 8,
    marginBottom: 10,
  },
  download: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200EE",
    flexDirection: "row",
    width: 90,
  },

  buttonViewUplaod: {
    zIndex: 100,
    marginTop: 50,
    padding: 10,
    height: 50,
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6200EE",
    flexDirection: "row",
  },
  height50: { height: 50 },
  bgMobileInput: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  picker: { height: 20, width: "100%" },
});
export default Styles;
