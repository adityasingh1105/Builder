//@ts-nocheck
import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView
} from "react-native";
import { heightPercentageToDP } from 'react-native-responsive-screen';
// import WithI18nextHook from '../../../components/src/context/HOCHook';
import {logo} from './assets'
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End
import LanguageSupportController, {Props} from "./LanguageSupportController";

export default class LanguageSupport extends LanguageSupportController {
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
    return <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.mainContainer}>
            <View>
              <Image source={logo} style={styles.logoStyle} />
              <Text style={styles.logoText}> {this.props?.lan?.languageData?.translation?.WelcomeText}</Text>
              <Text style={styles.contentText}>{this.props?.lan?.languageData?.translation?.slogan},{'\n'}{this.props?.lan?.languageData?.translation?.slogan1}</Text>
            </View>
          </View>
          <TouchableOpacity testID='selectlngId' style={styles.defaultButtonStyle} onPress={ ()=>this.selectlng()}   buttonStyle={styles.bottomButton} textStyle={styles.buttonText}>
            <Text style={styles.defaultTextStyle}>{this.props?.lan?.languageData?.translation?.lets_start}</Text>
          </TouchableOpacity>
        </SafeAreaView>
    </>
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
    width:  "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  safeAreaContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white'
  },
  defaultTextStyle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  defaultButtonStyle: {
    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    paddingVertical: 20,
    backgroundColor: 'black'
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  logoStyle: {
    alignSelf: 'center',
    width: 200,
    height: 200
  },
  contentText: {
    fontSize: 16,
    color: '#323441',
    marginTop: 15,
    textAlign: 'center',
    lineHeight: 25
  },
  logoText: {
    fontSize: 30,
    color: '#323441',
    marginTop: 15,
    textAlign: 'center'
  },
  buttonText: {
    fontWeight: 'bold'
  },
  bottomButton: {
    marginBottom: 20
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 14,
    borderColor: "rgba(0, 0, 0, 0.1)",
    padding: 20,
    height: heightPercentageToDP('40%'),
    bottom: 0
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    // margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginTop: 20,
    width: '100%'
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  }
});
// export default WithI18nextHook(LanguageSupport);
// Customizable Area End
