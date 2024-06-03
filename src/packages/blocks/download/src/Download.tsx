import React from "react";

// Customizable Area Start
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import * as Progress from "react-native-progress";

// Customizable Area End

import DownloadController, { Props, configJSON, FileInterface } from "./DownloadController";
import moment from "moment";

export default class Download extends DownloadController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  FileView = (file: FileInterface) => (
    <View style={styles.item}>
      <View style={styles.rowSpaceBetween}>
        <Text style={styles.title}>{file.name}</Text>
      </View>
      {file.downloaded_at && <Text style={styles.title}>{moment(file.downloaded_at, "YYYY-MM-DDThh:mm:ss.000Z").format("YYYY-MM-DD hh:mm a")}</Text>}

      <View style={styles.rowSpaceBetween}>
        {this.state.dowloadId == file.id && <Progress.Bar progress={this.state.progress} width={200} animated={true} height={5} borderColor={"white"} />}
        {this.state.dowloadId !== file.id && (
          <Button
            testID={"downloadFileId-" + file.id}
            title={configJSON.labelTitleText}
            onPress={() => {
              this.checkPermission(file.id, file.name);
            }}
          />
        )}
        {this.state.dowloadId == file.id &&  this.state.downloadJobID !== 0 && (
          <Button testID={"cancelFileId-" + file.id} title={"Cancel"} onPress={this.onCancelDownload} />
        )}
      </View>
    </View>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View testID="downloadListView" style={styles.container}>
        <FlatList
          testID="filesFlatList"
          data={this.state.files}
          renderItem={({ item }) => this.FileView(item)}
          keyExtractor={(item: FileInterface) => item.id.toString()}
        />
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
  title: {
    marginBottom: 5,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
    flexWrap: "wrap",
  },

  item: {
    padding: 5,
    marginBottom: 32,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "#f6f6f6",
  },
  rowSpaceBetween: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
});
// Customizable Area End
