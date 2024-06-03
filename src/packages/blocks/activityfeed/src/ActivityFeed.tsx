import React from "react";
//Customizable Area Start
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
//Customizable Area End
import ActivityFeedController, {
  Props,
  configJSON,
} from "./ActivityFeedController";

//Customizable Area Start
import { Picker } from "@react-native-picker/picker";
import { ActivityInterface } from "./dataInterface";
//Customizable Area End

export default class ActivityFeed extends ActivityFeedController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  // Customizable Area Start
  public renderActivity(activity: ActivityInterface) {
    const date = new Date(activity.created_at);
    return (
      <View style={styles.activityRow}>
        <Text>{activity.trackable_type.split("::")[0]}</Text>
        <Text>{`${activity.owner.first_name} ${activity.owner.last_name}`}</Text>
        <Text>{`${date.toDateString()}`}</Text>
      </View>
    );
  }

  renderOptions(opts: string[]) {
    const option = (option: { name: string; value: string }) => (
      <Picker.Item
        key={`option-${option.name}`}
        label={option.name}
        value={option.value}
      />
    );

    return [
      option({ name: "All", value: "" }),
      opts.map((optionItem: string) =>
        option({ name: optionItem, value: optionItem })
      ),
    ];
  }

  renderPickerModal(options: string[]) {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.pickerModalVisibility}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.setModalVisibility(false)}
              >
                <Text style={styles.pickerDoneText}>{configJSON.done}</Text>
              </TouchableOpacity>
              <Picker
                testID="picker"
                style={styles.pickerIOS}
                onValueChange={(itemValue) => {
                  this.setFilter(itemValue);
                }}
                selectedValue={this.state.activityFilter}
              >
                {this.renderOptions(options)}
              </Picker>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  renderSelect() {
    return Platform.OS == "ios" ? (
      <>
        <TouchableOpacity
          style={styles.pickerTextIOS}
          onPress={() => this.setModalVisibility(true)}
        >
          <Text>
            {!!this.state.activityFilter ? this.state.activityFilter : "All"}
          </Text>
        </TouchableOpacity>
        {this.renderPickerModal(this.activityTypes)}
      </>
    ) : (
      <Picker
        style={styles.select}
        onValueChange={(itemValue) => {
          this.setFilter(itemValue);
        }}
        selectedValue={this.state.activityFilter}
      >
        {this.renderOptions(this.activityTypes)}
      </Picker>
    );
  }
  //Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.containerMobile}>
        <View style={styles.header}>
          <Text>{configJSON.headerLabel}</Text>
          <View>{this.renderSelect()}</View>
        </View>
        <FlatList
          testID="activityList"
          data={this.state.activities}
          renderItem={({ item }) => this.renderActivity(item)}
          keyExtractor={(item) => `activity${item.id}`}
          onEndReached={() => {
            this.getAcitivityData();
          }}
          onEndReachedThreshold={0.01}
        />
      </View>
    );
  }
  //Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerMobile: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#fff",
  },
  containerWeb: {
    padding: 16,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650,
  },
  header: {
    marginBottom: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityRow: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  select: {
    width: 200,
    height: 30,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  pickerTextIOS: {
    width: 200,
    height: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerIOS: {
    width: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "flex-end",
  },
  pickerDoneText: {
    fontSize: 20,
    fontWeight: "700",
    color: "blue",
  },
});
//Customizable Area End
