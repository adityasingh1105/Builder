import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Picker,
  ScrollView,
} from "react-native";
import Styles from "./FileAttachment.Styles";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import FileAttachmentUploadController, {
  Props,
  configJSON,
} from "./FileAttachmentUploadController";

export default class FileAttachmentUpload extends FileAttachmentUploadController {
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
    return (
      <ScrollView
        testID="scrollView"
        keyboardShouldPersistTaps="always"
        contentContainerStyle={Styles.container}>
        <View testID="container">
          <Text testID="desc">Description</Text>
          <TextInput
            testID="descInput" //Merge Engine::From BDS
            value={this.state.descInputValue}
            style={Styles.bgMobileInput} //UI Engine::From Sketch
            placeholder={configJSON.descriptionTextInputPlaceHolder} //UI Engine::From Sketch
            {...this.descInputWebProps} //Merge Engine::From BDS - {...this.testIDProps}
          />
          <Text>Tag</Text>
          <TextInput
            testID="tagInput" //Merge Engine::From BDS
            value={this.state.tagInputValue}
            style={Styles.bgMobileInput} //UI Engine::From Sketch
            placeholder={configJSON.tagTextInputPlaceholder} //UI Engine::From Sketch
            {...this.tagInputProps} //Merge Engine::From BDS - {...this.testIDProps}
          />
          <View>
            <Text>Select file type</Text>
            <Picker
              itemStyle={Styles.height50}
              selectedValue={this.state.selectedDocumentType}
              testID="fileTypePicker"
              style={Styles.picker}
              {...this.pickerProps}>
              <Picker.Item
                value={"doc"}
                label={configJSON.pickerDocTypeLabel}
              />
              <Picker.Item
                value={"jpg"}
                label={configJSON.pickerImagesTypeLabel}
              />
              <Picker.Item
                value={"pdf"}
                label={configJSON.pickerPDFTypeLabel}
              />
              <Picker.Item
                value={"mp3"}
                label={configJSON.pickerAudioTypeLabel}
              />
              <Picker.Item
                value={"mp4"}
                label={configJSON.pickerVideoTypeLabel}
              />
            </Picker>
          </View>

          {this.props.navigation.state.params?.isEdit ? (
            <View style={Styles.rowSpaceEvenly}>
              <TouchableOpacity
                testID="fileUpdate"
                style={Styles.buttonViewUplaod}
                {...this.fileUpdateBtnExampleProps}>
                <Text testID="uploadButtonText" style={Styles.buttonText}>
                  {this.state.isUploading ? "Updating file" : "Update File"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={Styles.rowSpaceEvenly}>
              <TouchableOpacity
                testID="fileAttach"
                style={Styles.buttonViewUplaod}
                {...this.fileAttachBtnExampleProps}>
                <Text testID="uploadButtonText" style={Styles.buttonText}>
                  {this.state.isUploading ? "Uploading file" : "Attach File"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
// Customizable Area End
