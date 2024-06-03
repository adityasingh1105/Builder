import React from "react";

// Customizable Area Start
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import FileListCard from "./FileListCard";
import Styles from "./FileAttachment.Styles";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import FileAttachmentListController, {
  Props,
} from "./FileAttachmentListController";

export default class FileAttachmentList extends FileAttachmentListController {
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
        testID="container"
        keyboardShouldPersistTaps="always"
        contentContainerStyle={Styles.container}>
        {this.state.uploadedFileList.map((item) => {
          return (
            <FileListCard
              key={item.id}
              data={item}
              token={this.state.token}
              navigation={this.props.navigation}
              refresh={this.getFileList}
            />
          );
        })}
        <View style={Styles.rowSpaceEvenly}>
          <TouchableOpacity
            testID="navTo"
            style={Styles.buttonView}
            {...this.navFileAttachBtnExampleProps}>
            <Text style={Styles.buttonText}>Add new file</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
// Customizable Area End
