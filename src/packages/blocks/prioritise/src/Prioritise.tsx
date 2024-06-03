import React from "react";
// Customizable Area Start
import {
  RefreshControl,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,StatusBar
} from "react-native";
import PrioritiseController, { ItemProps,configLabel} from "./PrioritiseController";
import { scaledSize } from "../../../framework/src/Utilities";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
// Customizable Area End

export default class Prioritise extends PrioritiseController {
 

  // Customizable Area Start


  renderRaw(data: ItemProps) {
    const { item, index } = data;
    return (
      <View style={styles.rawContainer}>
        <Image source={{ uri: item.image_uri }} style={styles.profileImage} />
        <View style={styles.rawLableContainer}>
          <Text style={styles.lableTitle}>{item.name}</Text>
        </View>

        <View>
          <TouchableOpacity
            testID={"btnPriorityTestId"}
            key={index}
            onPress={this.handlePressItemChange.bind(this, index, "Other",4)}
            style={styles.priorityContainer}
          >
            <Text testID="testPriorityTitleId" style={styles.priorityTitle}>
              {item.is_open ? "" : item.priority_type}
            </Text>
            <Feather
              name={item.is_open ? "chevron-up" : "chevron-down"}
              size={scaledSize(14)}
            />
          </TouchableOpacity>

          {item.is_open ? (
            <View style={styles.prioritySubcontainer}>
              <View key={item.id.toString()} style={styles.prioritySubcontainer1}>
                {Object.keys(item.other_priorities).map((data:string) => {
                            
                  return (
                    <Text              
                      onPress={this.handlePressItemChange.bind(
                        this,
                        index,
                        item.other_priorities[Number(data)].priorityType,item.other_priorities[Number(data)].priority
                      )}
                      key={item.id}
                      style={styles.prioritySubTitle}
                    >
                      {item.other_priorities[Number(data)].priorityType}
                    </Text>
                  );
                })}
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }

  ListFooter() {
    return (
      <View style={styles.fotterContainer}>
        <TouchableOpacity
          activeOpacity={1}
          testID="btnSaveTestId"
          onPress={this.apiPostCall.bind(this)}
          style={styles.buttonContainer}
        >
          <Text style={[styles.buttonText]}>{configLabel.labelSave}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.container}>

      <StatusBar
        backgroundColor={'#0061A7'}
        barStyle="light-content"
        translucent={true}
      />
        <View style={styles.upView}>
          <View style={styles.upViewSub}>
            <TouchableOpacity activeOpacity={1} style={styles.LeftContainer}>
              <AntDesign
                name="arrowleft"
                color={"#FFFFFF"}
                size={scaledSize(22)}
              />
            </TouchableOpacity>

            <View style={styles.CenterContainer}>
              <Text style={styles.headerText}>
                {configLabel.labelPrioritise}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bodyView}>
          {!this.state.isLoading && this.state.taskList.length == 0 ? (
            <View testID="testEmptyViewId" style={styles.emptyContainer}>
            <FontAwesome
              name={"refresh"}
              onPress={this.getTaskData.bind(this)}
              size={scaledSize(30)}
              style={styles.refreshIcon}
              color="#5A5D67"
            />
            <Text style={[styles.emptyText]}>{configLabel.labelNoData}</Text>
          </View>
          ) : (
            <View style={styles.flatViewStyle}>
              {this.state.isLoading ? (
                <View style={styles.loaderContainer}>
                <ActivityIndicator
                  testID="testLoaderId"
                  color="#195B91"
                  style={styles.indicatorContainer}
                  animating={true}
                  size={"large"}
                />
              </View>
              ) : (
                <View style={styles.flatlistView}>
                  <FlatList
                    data={this.state.taskList}
                    renderItem={this.renderRaw.bind(this)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatlistContainer}
                    style={styles.flatlistStyle}
                    keyExtractor={this.keyExtractorItem.bind(this)}
                    ListFooterComponentStyle={styles.flatlistFooterContainer}
                    ListFooterComponent={this.ListFooter.bind(this)}
                    refreshControl={
                      <RefreshControl
                        refreshing={false}
                        onRefresh={this.getTaskData.bind(this)}
                      />
                    }
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  upView: {
    width: "100%",
    backgroundColor: "#0061A7",
    alignItems: "center",
    paddingVertical: 20,
  },
  upViewSub: {
    width: "90%",
    flexDirection: "row",
    marginTop: 8,
  },
  LeftContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  CenterContainer: {
    justifyContent: "center",
    flex: 1,
  },
  headerText: {
    fontSize: scaledSize(20),
    color: "#FFFFFF",
    marginLeft: 20,
  },
  rightImageWrapper: {
    height: scaledSize(24),
    width: scaledSize(24),
  },
  flatViewStyle: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    marginTop: 10,
  },
  bodyView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flatlistView: {
    flex: 1,
    alignItems: "center",
  },
  flatlistContainer: {
    paddingBottom: 40,
    paddingTop: 10,
    flexGrow: 1,
  },
  flatlistFooterContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  flatlistStyle: {
    flex: 1,
    width: "90%",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorContainer: {
    zIndex: 1,
    flex: 1,
    height: "100%",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  refreshIcon: {
    marginBottom: 10,
  },
  emptyText: {
    color: "#5A5D67",
    fontSize: scaledSize(20),
    textAlign: "center",
  },
  rawContainer: {
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f6fa",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
  },
  profileImage: {
    width: scaledSize(60),
    height: scaledSize(60),
    backgroundColor: "#696969",
    borderRadius: scaledSize(30),
  },
  rawLableContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  prioritySubcontainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  prioritySubcontainer1: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  lableTitle: {
    color: "#2C2C2E",
    fontSize: scaledSize(16),
  },
  priorityTitle: {
    color: "#5A5D67",
    fontSize: scaledSize(12),
  },
  prioritySubTitle: {
    color: "#606060",
    fontSize: scaledSize(12),
    marginRight: 14,
  },

  fotterContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    backgroundColor: "#0061A7",
    width: "100%",
    marginHorizontal: "5%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: scaledSize(16),
    color: "#ffffff",
  },
});
// Customizable Area End
