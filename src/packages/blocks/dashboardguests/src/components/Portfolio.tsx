// Customizable Area Start
import React from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";



// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End

import PortfolioController, {
  Props,DummyData
} from "./PortfolioController";

  export const RenderPortfolioItem=({item}: {item:DummyData})=>{
    const { type, attributes } = item
    const { company_name, invest_amount, date_of_invest } = attributes
    return (
      <View style={styles.itemContainer}>
        <View style={styles.textRow}>
          <Text >Company Name:</Text>
          <Text testID="ComapanyName">{company_name}</Text>
        </View><View style={styles.textRow}>
          <Text>Company Type:</Text>
          <Text  testID="ComapnayType">{type}</Text>
        </View>
        <View style={styles.textRow}>
          <Text>invest amount:</Text>
          <Text testID="investAmount">{invest_amount}</Text>
        </View>
        <View style={styles.textRow}>
          <Text>date of invest:</Text>
          <Text testID="dateOfInvest">{date_of_invest}</Text>
        </View>

      </View>)
  }
export default class Portfolio extends PortfolioController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <View>
          <Text>Click bellow to copy your portfolio link</Text>
          <TouchableOpacity testID="copyUrl" onPress={this.copyUrl} style={{height:38,width:"20%",borderWidth:1,borderRadius:5,backgroundColor:"blue"}}>
            <Text style={{color:"white",padding:10,fontSize:18}}>Copy</Text>
          </TouchableOpacity>
        </View>
        <FlatList testID="portfolioFlatList" data={this.state.portfoilioData}
          renderItem={({item}) =><RenderPortfolioItem item={item}/>}
        />
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
  itemContainer: {
    marginVertical: 10,
    borderWidth: .5,
    borderRadius: 5,
    padding: 10
  },
  textRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});



// Customizable Area End
