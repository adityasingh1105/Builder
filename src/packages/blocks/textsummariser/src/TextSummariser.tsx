// Customizable Area Start
import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import TextSummariserController, {
  Props, configJSON
} from "./TextSummariserController";
import { imgSub, imgAdd } from "./assets"
export default class TextSummariser extends TextSummariserController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always"  >
        <View  style={{margin:15}}>
          <View style={{justifyContent:"center"}}>
            <Text>{configJSON.TextLable}</Text>

            <TextInput multiline={true} testID="txtInput"  value={this.state.textInput} style={{ width: "80%", height: 80, borderWidth: 2, borderColor: "lightgrey" }} onChangeText={(text) => this.setText(text)} />
            <Text style={{width:"50%"}}>{configJSON.orLable}</Text>
            <TouchableOpacity testID="dockPicker" style={{height:30,width:"30%",backgroundColor:"green",padding:5,}} onPress={() => this.docPicker()}>
              <Text  style={{color:"white"}}>{configJSON.uploadFileLable}</Text>
            </TouchableOpacity>
            <Text>{configJSON.summaryLineLable}</Text>
              <View style={{flex:1,borderWidth:1,borderColor:"lightgrey",flexDirection:"row",width:"30%",justifyContent:"space-between" ,marginVertical:10}}>
                <TouchableOpacity testID="addLine" onPress={() => { this.handleSummaryLine(true) }}>
                  <Image style={{height:20,width:30}} source={imgAdd} />
                </TouchableOpacity>
                <Text>{this.state.summaryLine}</Text>
                <TouchableOpacity testID="subLine" onPress={() => this.handleSummaryLine(false)}>
                  <Image style={{height:20,width:30}}  source={imgSub} />
                </TouchableOpacity>
              </View>
            <TouchableOpacity testID="summarize" style={{height:30,width:"30%",backgroundColor:"green",padding:5,}} onPress={() => this.summariseText()}>
              <Text style={{color:"white"}}>{configJSON.summarizeTextLable}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>{configJSON.summarizedTextLable}</Text>
            <TextInput multiline={true}  value={this.state.summarisedText} style={{height:200,width:"80%",borderWidth:2,borderColor:"lightgrey"}}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}


// Customizable Area End
