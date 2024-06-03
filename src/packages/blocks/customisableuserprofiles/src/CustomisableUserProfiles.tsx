import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Switch,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import CustomisableUserProfilesController, {
  Props,
  configJSON
} from "./CustomisableUserProfilesController";

export default class CustomisableUserProfiles extends CustomisableUserProfilesController {
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
      //Required for all blocks
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* Required for all blocks */}
        <ScrollView keyboardShouldPersistTaps='always' style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            {/* Merge Engine UI Engine Code */}
            <View>
              {this.isPlatformWeb() ? (
                <Text testID='labelTitle' style={styles.title}>
                  {configJSON.labelTitleText}
                </Text>
              ) : null}
              {this.state.attributes.map((item, index) => {
                if (item.field_type === "boolean") {
                  return (
                    <View key={index}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Switch testID={"switchID"} disabled={!item.is_enable} />
                    </View>
                  );
                } else {
                  return (
                    <View key={index}>
                      <Text style={styles.title}>{item.title}</Text>
                      <TextInput
                        testID={"txtInputFirstName"}
                        style={styles.bgInput}
                        placeholderTextColor={"#909090"}
                        placeholder={item.title}
                        value={item.value as string}
                        keyboardType={
                          item.field_type === "integer" || item.field_type === "float"
                            ? "numeric"
                            : "default"
                        }
                        onChangeText={(text) => this.handleChangeAttributeValue(text, index)}
                        editable={item.is_enable}
                      />
                    </View>
                  );
                }
              })}
              <TouchableOpacity style={styles.button}>
                <Button
                  testID={"btnExample"}
                  title={configJSON.btnSaveTitle}
                  onPress={this.checkForRequiredFields}
                />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
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
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff"
  },
  button: {
    paddingVertical: 24
  },
  showHide: {
    alignSelf: "center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  title: {
    marginBottom: 2,
    fontSize: 14,
    textAlign: "left",
    marginTop: 16,
    color: "#000000"
  },
  bgInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    color: "#000000",
    marginTop: 0,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    paddingStart: 10
  }
});
// Customizable Area End
