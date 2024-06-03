// import { Colors } from "components/src/Colors";
// import Scale, { verticalScale } from "framework/src/Scale";
import { StyleSheet } from "react-native";

export const WatermarkStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  uploadImageTouchableStyles: {
    // height: Scale(380),
    // width: Scale(345),
    // marginTop: verticalScale(10),
  },
  uploadImageStyles: {
    // height: Scale(380),
    // width: Scale(345),
  },
  mt_20: {
    // marginTop: verticalScale(20),
    alignSelf: "center",
  },
  orView: {
    alignItems: "center",
    // marginTop: Scale(15),
  },
  orText: {
    // fontSize: Scale(16),
    // lineHeight: Scale(24),
    color: "black",
    textAlign: "center",
  },
  addLogoView: {
    // height: Scale(48),
    // width: Scale(345),
    borderColor: "lightgrey",
    // marginTop: Scale(15),
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: Scale(20),
    borderWidth: 1,
    // borderRadius: Scale(25),
    // marginBottom: Scale(80),
  },
  galleryIcon: {
    // height: Scale(30),
    // width: Scale(30),
    resizeMode: "contain",
  },
  addLogoTextView: {
    // marginHorizontal: Scale(15),
  },
  addLogoText: {
    // width: Scale(225),
    // fontSize: Scale(16),
    // lineHeight: Scale(24),
  },
  imageView: {
    // height: Scale(100),
    // width: Scale(100),
    // marginTop: Scale(15),
    alignItems: "center",
    alignSelf: "center",
    // marginBottom: Scale(80),
  },
  imageStyle: {
    // height: Scale(100),
    // width: Scale(100),
    resizeMode: "contain",
  },
  crossBtnView: {
    // height: Scale(20),
    // width: Scale(20),
    // borderRadius: Scale(10),
    backgroundColor: "black",
    position: "absolute",
    top: 0,
    right: 0,
  },
  nextButtonView: {
    // height: Scale(48),
    // width: Scale(345),
    // borderRadius: Scale(24),
    // backgroundColor: Colors.lightBlue,
    // bottom: Scale(30),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  nextText: {
    // fontSize: Scale(15),
    color: "white",
    // lineHeight: Scale(23),
  },
});
