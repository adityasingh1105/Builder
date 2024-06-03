//@ts-nocheck
import TextField from "components/src/TextField";
import React from "react";
// Customizable Area Start
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { galleryIcon, imageUpload } from "./assets";
import WatermarkController, { Props } from "./WatermarkController";
import { WatermarkStyle as styles } from "./WatermarkStyle";

// Customizable Area End
const ActionSheetUI = (props: Props) => {
  const _this = props.this as Props
  _this.actionRef.current?.show()
  _this.actionLogoRef.current?.show()
  return (
    <View>
      <ActionSheet
        ref={_this.actionRef}
        theme="ios"
        title={"Choose Source"}
        options={["Choose from Gallery", "Choose from Camera", "Cancel"]}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index: number) => {
          _this.onPressActionItem(index, 0);
        }}/>
      <ActionSheet
        ref={_this.actionLogoRef}
        theme="ios"
        title={"Choose Source"}
        options={["Choose from Gallery", "Choose from Camera", "Cancel"]}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index: number) => {
          _this.onPressActionItem(index, 1);
        }}
      />
    </View>
  )
}
export default class Watermark extends WatermarkController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.actionRef = React.createRef();
    this.actionLogoRef = React.createRef();
    // Customizable Area End
  }

  // Customizable Area Start

  actionShowOnee = () => { this.actionRef.current.show() }
  actionLogoo = () => { this.actionLogoRef.current.show() }

  renderImageUploadView = () => {
    return (
      <TouchableOpacity style={styles.uploadImageTouchableStyles}
       onPress={this.actionShowOnee} >
        <Image style={styles.uploadImageStyles}
          source={this.state.image ? { uri: this.state.image } : imageUpload}
        />
      </TouchableOpacity>
    );
  };

  renderWatermarkText = () => {
    return (
      <View style={[styles.mt_20]}>
        <TextField
          value={this.state.waterMarkText}
          onChangeText={this.waterMarkText}
          maxLength={30}
          placeholder="Watermark Text"
          placeholderTextColor="#302e2e"
          onFocus={this.isFocus}
          onBlur={this.isBlur}
        />
      </View>
    );
  };

  renderOrView = () => {
    return (
      <View style={styles.orView}>
        <Text style={styles.orText}>Or</Text>
      </View>
    );
  };

  renderAddLogoView = () => {
    return (
      <>
        {this.state.logoImage ? (
          <View style={styles.imageView}>
            <Image source={{ uri: this.state.logoImage }} style={styles.imageStyle} />
            <TouchableOpacity onPress={this.onRemoveLogo} style={styles.crossBtnView}>
              <Entypo name="cross" color="white" size={22} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addLogoView}
            onPress={this.actionLogoo}
          >
            <Image source={galleryIcon} style={styles.galleryIcon} />
            <View style={styles.addLogoTextView}>
              <Text style={styles.addLogoText}>Add Logo as watermark</Text>
            </View>
            <AntDesign name="right" color="grey" size={20} />
          </TouchableOpacity>
        )}
      </>
    );
  };

  renderNextBtnView = () => {
    return (
      <TouchableOpacity style={styles.nextButtonView}
      onPress={this.EditNavigationScreen}
>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    );
  };
  // Customizable Area End
// Customizable Area Start
  render() {
    return (
      //Merge Engine DefaultContainer
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {this.renderImageUploadView()}
          {!this.state.logoImage ? this.renderWatermarkText() : null}
          {!this.state.logoImage &&
            !this.state.waterMarkText &&
            !this.state.isFocus
            ? this.renderOrView()
            : null}
          {!this.state.waterMarkText && !this.state.isFocus
            ? this.renderAddLogoView()
            : null}
        </ScrollView>
        {(this.state.logoImage ||
          (this.state.waterMarkText && !this.state.isFocus)) &&
          this.state.image
          ? this.renderNextBtnView()
          : null}
        {
          !global.disableActionSheet &&
          <ActionSheetUI this={this}/>
        }          
      </SafeAreaView>
      //Merge Engine End DefaultContainer
    );
  }
}
// Customizable Area End
// Customizable Area Start
// Customizable Area End
