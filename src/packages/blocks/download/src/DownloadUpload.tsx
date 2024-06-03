import React from "react";

// Customizable Area Start
import { View, StyleSheet, Button, ActivityIndicator, TextInput } from "react-native";
// Customizable Area End

import DownloadUploadController, { Props, configJSON } from "./DownloadUploadController";

export default class DownloadUpload extends DownloadUploadController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View testID="downloadUploadView" style={styles.container}>
        <TextInput
          testID="refrenceIDtxtInput"
          style={styles.bgMobileInput}
          placeholder={configJSON.referenceIDText}
          keyboardType="decimal-pad"
          {...this.refrenceIDtxtInputProps}
        />
        <TextInput
          testID="refrenceTypetxtInput"
          style={styles.bgMobileInput}
          placeholder={configJSON.refreneceTypeText}
          keyboardType="default"
          {...this.refrenceTypetxtInputProps}
        />
        <Button testID={"btnUploadFile"} title={configJSON.UploadBtnText} onPress={this.uploadFile} />
        <View style={styles.emptyView}></View>
        <Button testID={"btnNavigatetoList"} title={configJSON.ListBtnText} onPress={this.handleNavigation} />

        <ActivityIndicator animating={this.state.loader} />
      </View>
    );
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
    backgroundColor: "#ffffffff",
  },
  bgMobileInput: {
    padding: 5,
    borderColor: "grey",
    borderRadius: 5,
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
  },
  emptyView: {
    height: 5,
  },
});
// Customizable Area End
