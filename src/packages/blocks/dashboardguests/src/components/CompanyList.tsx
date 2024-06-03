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

// Merge Engine - Artboard Dimension  - End


import CompanyListController, {
  Props,Item
} from "./CompanyListController";
export const RenderItem=({item,investNow}:{item:Item,investNow:(item:Item)=> void})=>{
  const { type, attributes } = item
  const { company_name } = attributes
  return (
    <View style={styles.itemContainer}>
      <Text testID="companyName">{company_name}</Text>
      <Text testID="companyType">{type}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={{height:30,width:60,backgroundColor:"green",borderWidth:1,borderRadius:5}}
          onPress={()=> investNow(item)}
          testID={"investBtn"}><Text style={{color:"white",fontSize:16}}>Invest Now</Text>
        </TouchableOpacity>
      </View>
    </View>)
}
export default class CompanyList extends CompanyListController {
  constructor(props: Props) {
    super(props);
  }


  render() {
     

    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <FlatList testID="companyFlatList" data={this.state.companyList}
          renderItem={({item}) => <RenderItem item={item} investNow={this.investNow}/>}
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
    width:"100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  itemContainer: {
    marginVertical: 10,
    borderWidth: .5,
    borderRadius: 5,
    padding: 10
  },
  itemTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    width: 200,
    alignSelf: 'center',
    marginVertical: 10
  }
});




// Customizable Area End
