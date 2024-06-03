import React from "react";

// Customizable Area Start
import {
  Dimensions,
  View,
  StyleSheet,
  Button,
  Platform,
} from "react-native";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

//@ts-ignore
import CustomCheckBox from "../../../components/src/CustomCheckBox";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End

import RNPrint from "react-native-print";
// Customizable Area End

import PrintController, { Props, configJSON } from "./PrintController";

export default class Print extends PrintController {
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  async printRemotePDF() {
    await RNPrint.print({
      filePath: "https://graduateland.com/api/v2/users/jesper/cv",
    });
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <View style={styles.container1}>
        <Button
          testID="btnPrint"
          onPress={this.printRemotePDF}
          title="Print Remote PDF"
        />
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
// Customizable Area End
