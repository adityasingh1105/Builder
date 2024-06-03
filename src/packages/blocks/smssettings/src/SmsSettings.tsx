// Customizable Area Start
import React from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
} from "react-native";

import SmsSettingsController, {
  Props,
  configJSON,
} from "./SmsSettingsController";

export default class SmsSettings extends SmsSettingsController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          testID="keyboardID"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Merge Engine UI Engine Code */}
          <View style={styles.MainContainer}>
            <Button
              testID="Registertion"
              title={configJSON.registration}
              {...this.handleRegistertionUser}
            />
            <View style={{ marginVertical: 10 }} />
            <Button
              testID="loginuser"
              title={configJSON.userLogin}
              {...this.handleUserlogin}
            />
            <View style={{ marginVertical: 10 }} />
            <Button
              testID="loginadmin"
              title={configJSON.adminLogin}
              {...this.handleAdminLogin}
            />
          </View>
          {/* Merge Engine UI Engine Code */}
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
  },
  MainContainer: {
    marginTop: "70%",
    padding: 10
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },

  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
});

// Customizable Area End
