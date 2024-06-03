// Customizable Area Start
import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { downArrow } from "../assets"

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End

import LoginController, {
  Props
} from "./LoginController";

export default class Login extends LoginController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    const renderAccessory = () => (
      <Image
        source={downArrow}
        style={{
          width: 10,
          height: 15,
          resizeMode: "contain",
          top: 6,
        }}
      />
    );
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>

        <View style={{ flex: 1, flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
          <View style={{ width: "20%", height: 60 }}>
            <Text testID="phonetxt">
              CC
            </Text>
            <TouchableOpacity
              testID='openContryCodeModal'
              style={{
                width: '100%',
                height: 48,
                padding: 10,
                borderColor: "#E4E4E4",
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 9,
                flexDirection: "row",
                alignItems: "stretch",
                justifyContent: "space-between",
                paddingHorizontal: 15

              }}
            >
              <Text style={{
                color: 'grey',
                fontSize: 20
              }}>
                +{this.state.countryCode}
              </Text>
              {renderAccessory()}
            </TouchableOpacity>
          </View>

          <View style={{ width: "70%" }}>
            <Text testID="phonetxt">
              Phone
            </Text>
            <TextInput
              testID="txtInput"
              keyboardType="phone-pad"
              style={styles.bgMobileInput}
              onChangeText={(text) => { this.setPhoneNumber(text) }}
              placeholder='phone'
            />
            <View />
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{ borderRadius: 5, backgroundColor: "green", width: 60, height: 30, padding: 5, }}
            onPress={() => this.onLogin()}
            testID="loginBtn">
            <Text style={{ color: "white", fontSize: 16 }}>Login</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>Please check your messages</Text>
              <Text style={styles.modalHeading}>We have sent a OTP to your registered +${this.state.countryCode}${this.state.phoneNo}
              </Text>
              <TextInput
                testID="txtInputOtp"
                keyboardType="phone-pad"
                maxLength={4}
                style={{ width: '25%', height: 48, fontSize: 18, padding: 10, borderWidth: 1, borderColor: "#E4E4E4", borderRadius: 5 }}
                onChangeText={(text) => { this.setOtp(text) }}
                placeholder='otp' />
              <View style={{ marginTop: 20 }}></View>
              <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', width: '90%', marginVertical: 5, paddingHorizontal: 10 }}>

                <TouchableOpacity
                  testID="cancleModal"
                  onPress={() => {
                    this.setModal(false)
                  }}
                  style={{ borderRadius: 5, borderWidth: 1, alignContent: 'center', justifyContent: 'center', width: '40%' }}
                >
                  <Text style={{ alignSelf: 'center', color: 'black' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="submitOtp"
                  onPress={() => this.onSubmitOtp()}
                  style={{ borderRadius: 5, alignContent: 'center', justifyContent: 'center', backgroundColor: 'green', width: '40%', height: 30 }}>
                  <Text style={{ color: 'white', alignSelf: 'center' }}>Verify</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-around', width: '80%', marginBottom: 8, paddingHorizontal: 5 }}>
                <Text style={styles.modalQuery}>Didn't recieve the OTP?</Text>
                <TouchableOpacity testID="resendOtp" onPress={() => this.getVerificationOtp()}>
                  <Text style={styles.modalQueryLink}> Resend OTP</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 20 }}></View>


            </View>
          </View>
        </Modal>

      </ScrollView>
    );
    // Merge Engine - render - End
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  bgMobileInput: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#E4E4E4",
    borderRadius: 5,
    marginVertical: 10,
  },
  otp: {
    opacity: 1,
    backgroundColor: "transparent",
    fontStyle: "normal",
    fontWeight: "normal",
    includeFontPadding: false,
    padding: 2,
    textAlign: "center",
    textAlignVertical: "top",
    color: 'black'
  },
  otpTextContainer: {
    width: 50,
    height: 40,
    opacity: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
  },

  modalBody: {
    width: '90%',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    color: 'black'
  },
  modalHeading: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'black',
    textAlign: 'center',
  },
  modalQuery: {
    fontSize: 16,
    color: 'black',
  },
  modalQueryLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  }
});

// Customizable Area End
