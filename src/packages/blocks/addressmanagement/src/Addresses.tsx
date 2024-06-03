import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  ActivityIndicator,
} from "react-native";
// Customizable Area End

import AddressManagementController, {
  Props,
  AddressType,
} from "./AddressManagementController";

export default class Addresses extends AddressManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderAddressItem = (address: AddressType, index: number) => {
    return (
      <View
        style={[
          styles.addressItemContent,
          index === 0 ? styles.addressItemContentFirst : {},
        ]}
        key={`address_item_${index}`}
      >
        <View style={styles.groupItem}>
          <Text style={styles.itemTitle}>Address:</Text>
          <Text style={styles.itemText}>{address.attributes.address}</Text>
        </View>
        <View style={styles.groupItem}>
          <Text style={styles.itemTitle}>Type:</Text>
          <Text style={styles.itemText}>{address.attributes.address_type}</Text>
        </View>
        <View style={styles.groupItem}>
          <Text style={styles.itemTitle}>Latitude:</Text>
          <Text style={styles.itemText}>{address.attributes.latitude}</Text>
        </View>
        <View style={styles.groupItem}>
          <Text style={styles.itemTitle}>Longitude:</Text>
          <Text style={styles.itemText}>{address.attributes.longitude}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { addressList } = this.state;
    const windowHeight = Dimensions.get("window").height;

    return (
      //Merge Engine DefaultContainer
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.keyboardPadding}
      >
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.btnAdd}
              onPress={this.handlePressAdd}
            >
              <Text style={styles.txtBtnAdd}>Add</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Address List</Text>
          <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
            {addressList &&
              addressList.map((addressData, index) =>
                this.renderAddressItem(addressData, index)
              )}
            {!addressList && (
              <View
                style={[
                  styles.loadingContainer,
                  { height: (windowHeight / 5) * 3 },
                ]}
              >
                <ActivityIndicator />
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      //Merge Engine End DefaultContainer
    );
  }
  // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  keyboardPadding: { flex: 1 },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 80,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addressItemContent: {
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  addressItemContentFirst: {
    borderTopWidth: 1,
  },
  groupItem: {
    flexDirection: "row",
  },
  itemTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
  },
  itemText: {
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  btnAdd: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  txtBtnAdd: {
    fontSize: 16,
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
// Customizable Area End
