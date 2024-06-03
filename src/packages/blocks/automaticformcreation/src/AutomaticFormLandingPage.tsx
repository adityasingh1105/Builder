import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End
// import { AutomaticField } from "../../../components/src/AutomaticMobileFields";
// import DataContext from "../../../components/src/DataContext";
import AutomaticFormLandingPageController, {
    Props,
  } from "./AutomaticFormLandingPageController";
// Customizable Area End



export default class AutomaticFormLandingPage extends AutomaticFormLandingPageController {
 
    constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // static contextType: React.Context<AutomaticField> = DataContext;
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback>
          <View style={{marginTop:20}}>
    {/* {this.state.automaticData.map((item:AutomaticField,index:number)=> {
return <TouchableOpacity
onPress={()=>this.handleOnPress(item)}><View key={index} style={[styles.inputMainView]}>
    <Text style={{width:'90%',fontSize:17,fontWeight:'700',marginBottom:5}}>{`Form ${index + 1}`}</Text>
<Text style={{width:'90%',fontSize:16,fontWeight:'700',marginBottom:5}}>{item.attributes?.name ?? ''}</Text>
            <Text numberOfLines={1} style={{width:'90%',fontSize:15,fontWeight:'600',marginBottom:5}}>{item.attributes?.description ?? ''}</Text>
              </View>
              </TouchableOpacity>
           }) } */}

           {/* {this.state.automaticData.length == 0 && <Text style={{width:'90%',textAlign:'center',color:'black',fontSize:18}}>No forms found</Text>} */}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Merge Engine - render - End
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
  inputMainView: {
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 20,
    borderWidth:1,
    borderColor:'black',
    borderRadius:10,
    padding:10
  }
});
// Customizable Area End