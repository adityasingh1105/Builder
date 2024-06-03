import React from "react";

// Customizable Area Start
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End

import AutomaticFormCreationController, {
  Props,
  configJSON,
} from "./AutomaticFormCreationController";
// import { CheckboxFieldMobile, DatePickerFieldMobile, FieldName, TextInputFieldMobile } from "../../../components/src/AutomaticMobileFields";

// Customizable Area End

export default class AutomaticFormCreation extends AutomaticFormCreationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", () => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  

  // Customizable Area Start

  renderInputType =(type: string,name: string)=>{
    switch(type){
     case "text":
     case "string":
      case "integer":
//    case "float":
//   return <TextInputFieldMobile field_type={type} field_name={name} handleInputChange={this.onChangeValues}/>  
//  case "date":
//   case "time":
//    return <DatePickerFieldMobile field_name={name} field_type={type} handleInputChange={this.onChangeValues}/>  
//    case "boolean":
//      return <CheckboxFieldMobile field_name={name} handleInputChange={this.onChangeValues}/>   
 }
   }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View>
            {/* <Text style={{width:'90%',textAlign:'center',fontSize:18,fontWeight:'700',marginVertical:10}}>{this.state.automaticFormData?.attributes?.name ?? ''}</Text>
            <Text style={{width:'90%',textAlign:'center',fontSize:15,fontWeight:'600',marginBottom:10}}>{this.state.automaticFormData?.attributes?.description ?? ''}</Text>
          {this.state.automaticFormData?.attributes?.field_name.map((item:FieldName,index:number)=> {
               return <View key={index} style={[styles.inputMainView,{height: item.field_type == "boolean" ? 40 : 80} ]}>
                    {(item.field_type ?? "text") != "boolean" && <Text>
                         {item.field_name ?? ""} </Text>}
                {this.renderInputType(item.field_type ?? "text",item.field_name ?? "")}
              </View>
           })} */}

            <Button
              onPress={()=> this.onButtonPressed()}
              testID={"btnExample"} //Merge Engine::From BDS
              title={configJSON.btnExampleTitle} //UI Engine::From Sketch
              // {...this.btnExampleProps} //Merge Engine::From BDS - {...this.testIDProps}
            />
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
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  inputMainView: {
    width: "100%",
    height: 80,
    justifyContent: "space-between",
    marginBottom: 20
  }
});

// Customizable Area End