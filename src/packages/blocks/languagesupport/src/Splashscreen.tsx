//@ts-nocheck
import React from "react";
// Customizable Area Start
import { StyleSheet, Text, Image, View, SafeAreaView } from "react-native";
// Customizable Area End

import SplashscreenController, { Props } from "./SplashscreenController";

import { rooLogo } from "./assets";

export default class Splashscreen extends SplashscreenController {
  constructor(props: Props) {
    super(props);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        {/* Customizable Area Start */}
        <View style={styles.logoView}>
          <Image source={rooLogo} style={styles.logoImage} />
          <Text testID="txtLogo" style={styles.logoText}>
            The ROO
          </Text>
        </View>
        {/* Customizable Area End */}
      </SafeAreaView>
    );
  }
}
// Customizable Area Start
const styles = StyleSheet.create({
  logoView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  logoText: {
    fontSize: 42,
    letterSpacing: 2,
    fontWeight: "bold",
    color: "#323441",
    marginTop: 15
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  logoImage: {
    width: 300,
    height: 300
  }
});
// Customizable Area End
