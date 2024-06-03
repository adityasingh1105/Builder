// Customizable Area Start
import React from "react";

import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MergeEngineUtilities from "../../../utilities/src/MergeEngineUtilities";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End

import InvestFormController, {
  Props,
} from "./InvestFormController";
import moment from "moment";

export default class InvestForm extends InvestFormController {
  constructor(props: Props) {
    super(props);
    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();

    });
    
  }


  render() {
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <View style={styles.modalContainer}>
            <Text testID="titlext" style={styles.title}>
              Start Investing
            </Text>
            <TextInput
              testID="txtInputAmount"
              style={styles.amountInput}
              onChangeText={(text)=>this.setInvestmentAmoount(text)}
              placeholder='Investment Amount'
              keyboardType='numeric'
            />
            <View style={styles.dateContainer}>
              <Text testID="date" style={{ color: 'white' }}>{moment(new Date()).format('YYYY/MM/DD')}</Text>
            </View>
            <View style={{ width: 300 }}>
              <TouchableOpacity
                onPress={()=> this.invest()}
                style={{width:55,height:40,backgroundColor:"green","borderRadius":5,borderWidth:1}}
                testID={"inestBtn"}>
                  <Text style={{color:"white",fontSize:16}}>Invest</Text>
              </TouchableOpacity>
            </View>
          </View>

      </ScrollView>
    );
    // Merge Engine - render - End
  }
}

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
  amountInput: {
    borderWidth: .5,
    borderRadius: 5,
    width: 300,
    height: 40,
    marginVertical: 20,
    paddingHorizontal: 10
  },
  modalContainer: {
    marginTop: 200,
    width: 200,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  dateContainer: {
    borderWidth: .5,
    borderRadius: 5,
    width: 300,
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: 'gray'
  }
});

// Customizable Area End
