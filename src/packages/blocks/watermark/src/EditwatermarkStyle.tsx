// import { Colors } from "components/src/Colors";
// import Fonts from "components/src/fonts";
// import Strings from "components/src/Strings";
// import Scale, { verticalScale } from "framework/src/Scale";
import { StyleSheet } from "react-native";

export const EditwatermarkStyle = StyleSheet.create({
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
    overflow: "hidden",
    alignSelf: "center",
    borderRadius: 2,
  },
  uploadImageStyles: {
    // height: Scale(380),
    // width: Scale(345),
  },
  waterMarkView: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  waterMarkSingleTextView:{
    height: "150%",
    width: "170%",
    justifyContent: "center",
    alignItems: "center",
  },
  waterMarkTextView: {
    height: "150%",
    width: "170%",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  waterMarkText: {
    color: "black",
    // fontSize: Scale(14),
    opacity: 0.8,
    // letterSpacing: Scale(2),
    // lineHeight: Scale(50),
  },
  imageStyle: {
    height: 24,
    width: 48,
    // margin: Scale(40),
    resizeMode: "contain",
  },

  // watermark list styles
  watermarkListView: {
    // marginTop: verticalScale(15),
  },
  watermarkContainer: {
    // height: Scale(100),
    // width: Scale(100),
    shadowColor: "black",
    // shadowRadius: Scale(5),
    elevation: 4,
    // marginRight: Scale(8),
    borderWidth: 1,
    borderColor: "lightgrey",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  waterMarkImage: {
    // height: Scale(95),
    // width: Scale(95),
  },
  headerStyle: {
    // height: Scale(100),
    // width: Scale(8),
  },
  footerStyle: {
    // height: Scale(100),
    // width: Scale(8),
  },

  // angle styles
  angleView: {
    // marginLeft: Scale(20),
  },
  angleText: {
    // marginTop: verticalScale(24),
    // fontSize: Scale(14),
    // color: Colors.headerTextColor,
    // fontFamily: Fonts.getFontByOS(Strings.poppinsSemiBold),
  },
  sliderView: {
    // marginTop: verticalScale(15),
  },

  // download button

  downloadButtonView: {
    // height: Scale(48),
    // width: Scale(345),
    // borderRadius: Scale(24),
    // backgroundColor: Colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: verticalScale(15),
    alignSelf: "center",
  },
  downloadText: {
    // fontSize: Scale(15),
    color: "white",
    // lineHeight: Scale(23),
  },

  sliderRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // marginVertical: verticalScale(10),
    // width: Scale(335),
  },
  whiteCircleContainer: {
    // height: Scale(54),
    // width: Scale(54),
    // borderRadius: Scale(27),
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "white",
  },
  blackCircleContainer: {
    // height: Scale(54),
    // width: Scale(54),
    // borderRadius: Scale(27),
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "black",
  },
  thumb: {
    // width: Scale(20),
    // height: Scale(20),
    backgroundColor: "white",
  },
  sliderStyle: {
    // width: Scale(180),
  },

  modalContainer: {
    // width: Scale(300),
    backgroundColor: "#ffffff",
    alignSelf: "center",
    alignItems: "center",
    // borderRadius: Scale(10),
    // paddingHorizontal: Scale(30),
    // paddingVertical: verticalScale(35),
  },
  premiumRoundedIcon: {
    // height: Scale(50),
    // width: Scale(50),
  },
  headerText: {
    // fontSize: Scale(18),
    fontWeight: "500",
    // marginTop: verticalScale(25),
  },
  subscribeButtonView: {
    // width: Scale(170),
    // height: Scale(48),
    // marginTop: verticalScale(5),
    backgroundColor: "#0258ed",
    // borderRadius: Scale(24),
    alignItems: "center",
    justifyContent: "center",
  },
  subscribeButtonText: {
    // fontSize: Scale(16),
    color: "#ffffff",
    fontWeight: "600",
  },
  modalCrossBtnView: {
    // height: Scale(30),
    // width: Scale(30),
    // backgroundColor: Colors.black,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: Scale(15),
    // right: Scale(-5),
    // top: Scale(-5),
  },
});
