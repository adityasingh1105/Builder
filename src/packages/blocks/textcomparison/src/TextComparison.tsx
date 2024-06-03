import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  PixelRatio,
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  Button,
  TouchableOpacity,
  CheckBox,
  Switch,
  Platform,
  Image,
  TextInput,
  Picker,
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from "react-native-simple-radio-button";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

//@ts-ignore
import CustomCheckBox from "../../../components/src/CustomCheckBox";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import TextComparisonController, {
  Props,
  configJSON,
} from "./TextComparisonController";

export default class TextComparison extends TextComparisonController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View>
            <TextInput
              testID="txtLeft"
              value={this.state.firstString}
              onChangeText={(text) => this.setState({ firstString: text })}
              multiline
              numberOfLines={5}
              style={styles.textInput}
            />

            <TextInput
              testID="txtRight"
              value={this.state.secondString}
              onChangeText={(text) => this.setState({ secondString: text })}
              multiline
              numberOfLines={5}
              style={styles.textInput}
            />
            <View style={styles.countWrap}>
              <Text>Added: {this.state.added}</Text>
              <Text>Remove: {this.state.removed}</Text>
            </View>

            <View style={styles.code}>
              {this.state.result.map((item: any, index: number) => {
                return (
                  <Text
                    key={index}
                    style={{
                      backgroundColor: item?.added
                        ? "#90EE90"
                        : item?.removed
                        ? "#FFCCCB"
                        : "#FFF",
                    }}
                  >
                    {item?.value}
                  </Text>
                );
              })}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Customizable Area Start
    // Merge Engine - render - Start
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

  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 20,
    textAlignVertical: "top",
  },
  countWrap: {
    padding: 20,
  },
  code: {
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
    padding: 20,
  },
});
// Customizable Area End
