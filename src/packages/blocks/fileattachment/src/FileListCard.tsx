import React from "react";

// Customizable Area Start
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Styles from "./FileAttachment.Styles";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import FileListCardController, { Props } from "./FileListCardController";

export default class FileListCard extends FileListCardController {
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
      <TouchableOpacity testID="container" style={Styles.fileCard}>
        <View>
          <Text>{this.props.data.attributes.name} </Text>
        </View>
        <View style={Styles.rowSpaceBetweenCard}>
          <TouchableOpacity
            testID="downloadViewButton"
            style={Styles.download}
            {...this.downloadViewButtonProps}>
            {this.state.isDownloading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text style={Styles.buttonText}>
                {this.state.isDownloaded ? "View" : "Download"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            testID="deleteButton"
            style={Styles.download}
            {...this.deleteFileButtonProps}>
            <Text style={Styles.buttonText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="editButton"
            style={Styles.download}
            {...this.editFileButtonProps}>
            <Text style={Styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
// Customizable Area End
