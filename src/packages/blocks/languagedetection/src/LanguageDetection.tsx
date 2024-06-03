// Customizable Area Start
import React from "react";

import { View, Text, Button, Modal } from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End
import { Picker } from "@react-native-picker/picker";
// import DropdownComponent from "../../CertificationTracking/src/components/DropdownComponent";

import LanguageDetectionController, {
  Props,
} from "./LanguageDetectionController";
import Loader from "../../../components/src/Loader";

export default class LanguageDetection extends LanguageDetectionController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    // Merge Engine - render - Start
    return (
      <View style={{ margin: 50 }}>
        <Text>The device language is: {this.state.selectedLanguage.name}</Text>
        <Picker
          testID="language-select"
          selectedValue={this.state.selectedLanguage.abbreviation}
          onValueChange={(itemValue) => this.handleLanguageChange(itemValue)}>
          {this.state.languages.map((language) => {
            return (
              <Picker.Item
                key={`language_${language.id}`}
                label={language.attributes.name}
                value={language.attributes.abbreviation}
              />
            );
          })}
        </Picker>
        <Modal visible={this.state.loader}>
          <Loader loading={this.state.loader} />
        </Modal>
      </View>
    );
    // Merge Engine - render - End
  }
}


// Customizable Area End
