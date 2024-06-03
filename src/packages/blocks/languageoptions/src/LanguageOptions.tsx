import React from "react";

import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import { RFPercentage as rf } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS } from "../../../framework/src/Globals";
// import { BackBtn } from "../../user-profile-basic/src/assets";
import { Language, RadioBtn_off, RadioBtn_on, Save } from "./assets";
import { withTranslation } from "react-i18next";
// import i18next from 'i18next';
import Context from "./languageComponent/context/Context";
import Loader from "../../../components/src/Loader";
import { langaugeFunction } from "./languageComponent/I18nConfig/I18nConfig";

import LanguageOptionsController, {
  Props,
  configJSON,
} from "./LanguageOptionsController";
// import { FONTS } from "../../../framework/src/Fonts";

export class LanguageOptions extends LanguageOptionsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  static contextType = Context;
  // Customizable Area End

  render() {
    const { setLanguageToAsyncStorage } = this.context;
    return (
      // Customizable Area Start
      <View style={styles.container}>
        <View style={styles.imgView}>
          <Image source={Language} style={styles.mainImg} />
          {/* <Text style={styles.imgName}>{i18next.t("Language")}</Text>
          <Text style={styles.desc}>{i18next.t("SelectLanguage")}</Text> */}
        </View>
        <View style={{ marginTop: hp(2) }}>
          {this.state.totalLanguages?.map(
            (item: { language: string; flag: string }, index: number) => {
              return (
                <View style={styles.lunguageBtn}
                key={index}>
                  <TouchableOpacity
                    testID={`buttonLang-${item.language}`}
                    style={styles.buttonlang}
                    onPress={() => {
                      this.setLanguage(item.language);
                      this.setLanguageSelect(index);
                    }}
                  >
                    <Image
                      source={
                        this.state.lunguageSelect === index
                          ? RadioBtn_on
                          : RadioBtn_off
                      }
                      style={[
                        styles.btnSelectImg,
                        {
                          tintColor:
                            this.state.lunguageSelect === index
                              ? COLORS.green
                              : COLORS.lightGray,
                        },
                      ]}
                    />
                    <Text style={styles.lunguageName}>{item?.language}</Text>
                    <View style={styles.imagecontainer}>
                      <Image
                        source={{ uri: item.flag }}
                        style={styles.flagImg}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
          )}
        </View>
        <View style={styles.bottemView}>
          <TouchableOpacity
            testID="backBtn"
            onPress={() => this.props.navigation.goBack()}
            style={{ alignItems: "center" }}
          >
            {/* <Image source={BackBtn} style={styles.backBtnImg} /> */}
            {/* <Text style={styles.backText}>{i18next.t("Back")}</Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            testID="saveBtn"
            onPress={() => {
              this.setLoader(true);
              // if (this.state.languages == "English") {
              //   i18next.changeLanguage("en");
              // } else {
              //   i18next.changeLanguage("fr");
              // }
              setLanguageToAsyncStorage(this.state.languages);
              this.getLanguageresults();
              langaugeFunction();
            }}
          > 
            <Image source={Save} style={styles.saveBtnImg} />
            {/* <Text style={styles.saveText}>{i18next.t("Save")}</Text> */}
          </TouchableOpacity>
        </View>
        <Loader loading={this.state.showLoader} />
      </View>

      /* Customizable Area Start */
      /* Customizable Area End */
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mainImg: {
    height: hp(12),
    width: hp(12),
    tintColor: COLORS.red,
  },
  imgView: {
    alignItems: "center",
    marginTop: hp(8),
  },
  imgName: {
    fontSize: rf(3.3),
    marginTop: hp(2.3),
    // fontFamily: FONTS.Explet_Bold,
  },
  imagecontainer: {
    marginLeft: wp(1),
  },
  flagImg: {
    height: hp(3),
    width: hp(3),
    marginLeft: wp(0.5),
  },
  desc: {
    marginTop: hp(1),
    fontSize: rf(2.1),
    color: COLORS.lightGray,
    alignSelf: "center",
    textAlign: "center",
    // fontFamily: FONTS.Roboto_Regular,
  },
  lunguageBtn: {
    flexDirection: "row",
    marginTop: hp(2),
    alignItems: "center",
  },
  btnSelectImg: {
    height: hp(4),
    width: hp(4),
    marginLeft: wp(5),
  },
  lunguageName: {
    marginLeft: wp(2),
    fontSize: rf(2.4),
    // fontFamily: FONTS.Roboto_Regular,
  },
  buttonlang: {
    flexDirection: "row",
  },
  backBtnImg: {
    height: hp(3),
    width: hp(3),
    tintColor: COLORS.lightGray,
  },
  backText: {
    color: COLORS.lightGray,
    // fontFamily: FONTS.Roboto_Regular,
    fontSize: rf(1.9),
  },
  saveText: {
    color: COLORS.lightGray,
    // fontFamily: FONTS.Roboto_Regular,
    fontSize: rf(1.9),
  },
  saveBtnImg: {
    height: hp(3),
    width: hp(3),
    tintColor: COLORS.lightGray,
  },
  bottemView: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "84%",
    marginBottom: hp(5),
    justifyContent: "space-between",
    marginHorizontal: wp(8),
    alignSelf: "center",
  },
});
// Customizable Area End
export default withTranslation()(LanguageOptions);
