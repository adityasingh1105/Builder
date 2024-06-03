import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Scale from "../../../components/src/Scale";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import WaitinglistController, {
  Props,
  configJSON,
  // Customizable Area Start
  Waiting
  // Customizable Area End
} from "./WaitinglistController";

export default class Waitinglist extends WaitinglistController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
 
    // Customizable Area End
  }

  // Customizable Area Start
  callingMap = () => {
    if (this.state.waitingListData.length > 0) {
      return this.state.waitingListData.map((value: Waiting) =>
        this.displayMap(value)
      );
    }
    else {
      return (
        <View style={styles.textView}>
          <Text style={styles.textStyle}>No Product In Waiting!</Text>
        </View>
      )
    }

  };

  displayMap = (value: Waiting) => {

    return (
      <TouchableOpacity style={styles.waitinglistMenuContainer}>
        <View style={{marginLeft:Scale(15),marginTop:Scale(10)}}>
        <View style={styles.waitingExtraView}>
            <Text style={styles.waitinglistProductPrice}>Status :- </Text>
          <Text style={styles.waitinglistProductPrice}>{value.attributes.status}</Text>
          </View>
          <View style={styles.waitingExtraView}>
            <Text style={styles.waitinglistProductName}>Order ID :- </Text>
          <Text style={styles.waitinglistProductName}>{value.attributes.order_number}</Text>
          </View>
          <View style={styles.waitingExtraView}>
            <Text style={{}}>Order Date :- </Text>
          <View style={styles.monthView}>
            <Text style={{fontSize:Scale(12),marginTop:Scale(2)}}>
            {this.userDateTime(value.attributes.order_date)}
            </Text>
          </View>
          </View>
          
          <TouchableOpacity
            style={styles.updateButton}
            testID="waitinglist_button"
           onPress={() => this.handleUpdateWaitingList(value.id)}  
          >
            <Text style={styles.updateText}>Update Waiting</Text>
          </TouchableOpacity>
        </View>
      
        {value.attributes.order_items[0].attributes.product_name=="Standard" ?
              <Image
                style={styles.waitinglistProductImage}
                source={{ uri: "https://images.unsplash.com/photo-1550293750-dde2bed30d54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" }}
              />:
              <Image
              style={styles.waitinglistProductImage}
              source={{ uri: 'https://b.zmtcdn.com/data/pictures/2/18898032/3fe5d6b1713642fb57282d9fc05c6e8c.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*' }}
            />} 
      </TouchableOpacity>
    )
  }

  renderFood = () => {
    return (
      <ScrollView>
        {this.callingMap()}
      </ScrollView>
    );
  };
  renderHeader = () => {
    return (
      <View style={styles.waitingExtraView}
      >
        <TouchableOpacity
          testID="BACK_BUTTON"
          onPress={this.backToCataloguePage}>
          <Image
            style={styles.waitingBackLogo}
            source={{
              uri: "https://img.icons8.com/metro/2x/back.png",
            }}
          />
        </TouchableOpacity>
        <View style={styles.waitingHeaderContainer}>
          <Text style={styles.waitinglistHeaderText}>Waiting List</Text>
        </View>
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.waitinglistContainer}>
        {this.renderHeader()}
        {this.renderFood()}
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  updateButton: {
    height: Scale(20),
    width: Scale(100),
    backgroundColor: "#fff",
    marginTop: Scale(10),
    borderRadius: Scale(25),
    justifyContent: "center",
  },
  updateText: {
    color: "#000",
    alignSelf: "center",
    fontSize: Scale(13),
    fontWeight: "600"
  },
  waitinglistContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  waitinglistHeaderText: {
    color: "#000",
    fontSize: Scale(25),
    fontWeight: "600",
    alignSelf: "center",
    marginTop: Scale(10),
    marginBottom: Scale(20),
  },
  waitinglistMenuContainer: {
    height: Scale(180),
    width: "98%",
    alignSelf: "center",
    borderRadius: Scale(25),
    borderWidth: Scale(0.5),
    borderColor: "#000",
    marginTop: Scale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightblue",
  },
  waitinglistProductName: {
    color: "#000",
    fontWeight: "600",
    marginTop: Scale(10),
  },
  waitinglistProductPrice: {
    color: "#000",
    fontSize: Scale(15),
    fontWeight: "bold",
    marginTop: Scale(5),
  },
  waitinglistProductImage: {
    height: Scale(150),
    width: Scale(155),
    borderRadius: Scale(15),
    marginRight: Scale(5),
    alignSelf: "center",
  },
  waitinglistLogoView: {
    flexDirection: "row",
  },
  waitinglistVegLogo: {
    height: Scale(25),
    width: Scale(25),
    marginTop: Scale(10),
    marginLeft: Scale(15),
  },
  waitinglistBestsellerText: {
    color: "red",
    marginTop: Scale(13),
    marginLeft: Scale(8),
    fontWeight: "500",
  },
  waitinglistDetailView: {
    height: Scale(30),
    width: Scale(100),
    borderColor: "#000",
    borderWidth: Scale(1),
    borderRadius: Scale(25),
    marginLeft: Scale(15),
    marginTop: Scale(30),
    justifyContent: "center",
  },
  waitinglistDetailText: {
    color: "#000",
    alignSelf: "center",
    fontSize: Scale(14),
    fontWeight: "500",
  },
  waitinglistCounterContainer: {
    height: Scale(30),
    width: Scale(100),
    backgroundColor: "#fff",
    borderRadius: Scale(10),
    borderColor: "#000",
    borderWidth: Scale(0.5),
    position: "absolute",
    bottom: Scale(5),
    left: Scale(270),
    alignSelf: "flex-end",
    marginTop: Scale(10),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  waitingBackLogo: {
    height: Scale(20),
    width: Scale(20),
    marginTop: Scale(15),
    marginLeft: Scale(10),
  },
  waitingHeaderContainer: {
    alignSelf: "center",
    marginLeft: Scale(50),
    width: Scale(250)
  },
  textView:{ 
    height: Scale(600), 
    justifyContent: "center"
  },
  textStyle:{ 
    alignSelf: "center"
 },
 monthView:{ 
  flexDirection: "row", 
  
  
},
waitingExtraView:{ 
  flexDirection: "row"
 },
});
// Customizable Area End
