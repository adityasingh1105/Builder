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

import TranslationController, {
  Props,
  configJSON,
} from "./TranslationController";

export default class Translation extends TranslationController {
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
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.container}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View style={{ flex: 1 }}>
            {this.isPlatformWeb() ? (
              <Text
                testID="labelTitle" //Merge Engine::From BDS
                style={styles.title} //UI Engine::From Sketch
              >
                {configJSON.labelTitleText}
              </Text> //UI Engine::From Sketch
            ) : null}
            {/* {this.state.languages.length > 0 ? */}
            <View style={{ height: 300, flexDirection: "row" }}>
              <View style={{ marginRight: 20, flex: 1 }}>
                <Text
                  testID="labelTitle" //Merge Engine::From BDS
                  style={styles.title} //UI Engine::From Sketch
                >
                  {"Select Text Convert\nFrom"}
                </Text>
                <FlatList
                  data={this.state.languages}
                  scrollEnabled
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => this.handleChangeFromMobile(item.code)}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          backgroundColor:
                            item.code == this.state.fromLang
                              ? "#6200EE"
                              : "gray",
                          margin: 5,
                          padding: 5,
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        {item.name + "-" + item.code}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  testID="labelTitle" //Merge Engine::From BDS
                  style={styles.title} //UI Engine::From Sketch
                >
                  {"Select Text Convert \nTo"}
                </Text>
                <FlatList
                  data={this.state.languages}
                  scrollEnabled
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => this.handleChangeToMobile(item.code)}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          backgroundColor:
                            item.code == this.state.toLang ? "#6200EE" : "gray",
                          margin: 5,
                          padding: 5,
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        {item.name + "-" + item.code}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>

            <Text style={{ fontSize: 16, margin: 15 }} testID="txtSaved">
              This is the reviced value:
              {this.state.convertedText}{" "}
              {/* Merge Engine::From BDS - {...this.testIDValue} */}
            </Text>

            <View style={styles.bgPasswordContainer}>
              <TextInput
                testID="txtInput" //Merge Engine::From BDS
                style={styles.bgMobileInput} //UI Engine::From Sketch
                placeholder={configJSON.txtInputPlaceholder} //UI Engine::From Sketch
                {...this.txtInputProps} //Merge Engine::From BDS - {...this.testIDProps}
                onChangeText={(value) => this.setInputValue(value)}
              />
            </View>

            <TouchableOpacity
              testID={"btnTranslate"} //Merge Engine::From BDS
              style={styles.showHide} //UI Engine::From Sketch
              onPress={() => this.translateTextWeb()}
              disabled={this.state.txtInputValue.trim() !== "" ? false : true}
            >
              <Text style={{ color: "white" }}>CLick Here</Text>
            </TouchableOpacity>
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    backgroundColor: "#6200EE",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
});
// Customizable Area End
