//@ts-nocheck
import React from "react";
// Customizable Area Start
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import EditwatermarkController, {
  Props,
} from "./EditwatermarkController";
import ModalActivityIndicator from "react-native-modal-activityindicator";
import Slider from "@react-native-community/slider";
import { SliderSaturationPicker } from "react-native-slider-color-picker";
import Entypo from "react-native-vector-icons/Entypo";
import Scale from "framework/src/Scale";
// import { Colors } from "components/src/Colors";
import { EditwatermarkStyle as styles } from "./EditwatermarkStyle";
import ReactNativeModal from "react-native-modal";
import { premiumRound } from "./assets";
import Draggable from 'react-native-draggable';

// Customizable Area End

export default class Editwatermark extends EditwatermarkController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderImageUploadView = () => {
    return (
      <>
        <View style={styles.uploadImageTouchableStyles} ref={this.viewRef} testID="edit-watermark">
          <Image
            style={styles.uploadImageStyles}
            source={{ uri: this.state.image }}
          />
          {this.state.selectedWatermarkId === 0 && this.renderWatermark(0)}
          {this.state.selectedWatermarkId === 1 && this.renderWatermark(90)}
          {this.state.selectedWatermarkId === 2 && this.renderWatermark(135)}
          {this.state.selectedWatermarkId === 3 && this.renderWatermark(45)}
          {this.state.selectedWatermarkId === 4 && this.renderSingle(0)}
        </View>
      </>
    );
  };

  renderSingle = (degree: number) => {
    return (
      <View style={styles.waterMarkView}>
        <View
          key={this.state.transformValue}
          style={[
            styles.waterMarkSingleTextView,
            {
            },
          ]}
        >
          {this.state.watermarkSingle.map((xData) => {
            return this.state.waterMarkText ? (
              <Draggable x={300} y={220}>
                <Text
                  style={[
                    styles.waterMarkText,
                    {
                      opacity: this.state.opacity,
                      color: this.state.textColor,
                    },
                  ]}
                >
                  {xData}
                  {/* DO NOT CHANGE THE SPACE HERE */}
                </Text>
              </Draggable>
            ) : (
              <Draggable x={300} y={220}>
                <Image
                  style={[
                    styles.imageStyle,
                    {
                      opacity: this.state.opacity,
                      tintColor: this.state.textColor || "",
                    },
                  ]}
                  source={{ uri: this.state.logoImage }}
                />
              </Draggable>)
          })}
        </View>
      </View>
    )
  }

  renderWatermark = (degree: number) => {
    return (
      <View style={styles.waterMarkView}>
        <View
          key={this.state.transformValue}
          style={[
            styles.waterMarkTextView,
            {
              transform: [
                { rotate: `${degree + Math.floor(this.state.transformValue)}degree` },
              ],
            },
          ]}
        >

          {this.state.waterMarkArray.map((xData) => {
            return this.state.waterMarkText ? (
              <Text
                style={[
                  styles.waterMarkText,
                  {
                    opacity: this.state.opacity,
                    color: this.state.textColor,
                  },
                ]}
              >
                {`        ${xData}`}
                {/* DO NOT CHANGE THE SPACE HERE */}
              </Text>
            ) : (
              <Image
                style={[
                  styles.imageStyle,
                  {
                    opacity: this.state.opacity,
                    tintColor: this.state.textColor || "",
                  },
                ]}
                source={{ uri: this.state.logoImage }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  renderWaterMarkItem = (item, index: number) => {
    return (
      <TouchableOpacity
        style={[styles.watermarkContainer,
        // this.state.selectedWatermarkId === index && { borderColor: Colors.lightBlue, },
        ]}
        onPress={() => this.onSelectWatermark(item, index)}
      >
        <Image style={styles.waterMarkImage} source={{ uri: item.attributes.image }} />
      </TouchableOpacity>
    );
  };

  renderWaterMarkListView = () => {
    return (
      <View style={styles.watermarkListView}>
        <FlatList
          data={this.state.waterMarkData}
          renderItem={({ item, index }: { item; index: number }) =>
            this.renderWaterMarkItem(item, index)
          }
          horizontal
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<View style={styles.headerStyle} />}
          ListFooterComponent={<View style={styles.footerStyle} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  renderAngleSliderView = () => {
    return (
      <View style={styles.angleView}>
        <Text style={styles.angleText}>
          Angle : {Math.floor(this.state.transformValue)}
        </Text>
        <View style={styles.sliderView}>
          <Slider
            style={{ width: Scale(345), height: 10 }}
            minimumValue={0}
            maximumValue={180}
            // minimumTrackTintColor={Colors.lightBlue}
            // maximumTrackTintColor={Colors.mediumGray}
            value={this.state.transformValue}
            onValueChange={this.transfrom}
            // thumbTintColor={Colors.lightBlue}
          />
        </View>
      </View>
    );
  };

  renderDownloadBtnView = () => {
    return (
      <TouchableOpacity
        style={styles.downloadButtonView}
        onPress={() =>
          this.state.activeSubscriptionData?.Custom === true
            ? this.onDownload()
            : this.onOpen()
        }
      >
        <Text style={styles.downloadText}>Download</Text>
      </TouchableOpacity>
    );
  };

  renderTextColorView = () => {
    return (
      <View style={styles.angleView}>
        <Text style={styles.angleText}>Text Color</Text>
        <View style={styles.sliderRowView}>
          <TouchableOpacity
            style={[styles.whiteCircleContainer,
            // this.state.textColor === "#FFFFFF" && { borderColor: Colors.lightBlue, },
            ]}
            onPress={() => this.textColor()}
          />
          <TouchableOpacity
            style={[styles.blackCircleContainer,
            // this.state.textColor === "#000000" && { borderColor: Colors.lightBlue, },
            ]}
            onPress={this.color}
          />
          <View style={styles.sliderStyle}>
            <SliderSaturationPicker
              oldColor={this.state.oldColor}
              trackStyle={[{ height: Scale(12), width: Scale(180) }]}
              thumbStyle={styles.thumb}
              onColorChange={this.changeColor}
              style={{
                height: Scale(12),
                borderRadius: Scale(6),
                backgroundColor: "black",
              }}
              minimumValue={0.01}
              maximumValue={1}
            />
          </View>
        </View>
      </View>
    );
  };

  renderSubscribeModal = () => {
    return (
      <ReactNativeModal
        isVisible={this.state.isVisible}
        onDismiss={this.onClose}
        onBackButtonPress={this.onClose}
        onSwipeComplete={this.onClose}
        swipeDirection="down"
        useNativeDriver={true}
      >
        <View style={styles.modalContainer}>
          <Image source={premiumRound} style={styles.premiumRoundedIcon} />
          <Text style={styles.headerText}>Upgrade Plan</Text>
          <TouchableOpacity
            style={styles.subscribeButtonView}
            onPress={this.onPressSubscribe}
          >
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalCrossBtnView}
            onPress={this.visible}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Entypo size={Scale(20)} color="white" name="cross" />
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    );
  };
  // Customizable Area End

  render() {
    return (
      //Merge Engine DefaultContainer
      <SafeAreaView style={styles.container}>
       {!global.hideRenderer &&<><ScrollView
          style={styles.scrollContainer}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {this.renderImageUploadView()}
          {this.renderWaterMarkListView()}
          {this.renderAngleSliderView()}
          {this.renderTextColorView()}
          {this.renderDownloadBtnView()}
          {this.renderSubscribeModal()}
        </ScrollView>
        <ModalActivityIndicator
          visible={this.state.loading}
          size="large"
          color="white"
        /></> }
      </SafeAreaView>
      //Merge Engine End DefaultContainer
    );
  }
}
// Customizable Area Start
// Customizable Area End