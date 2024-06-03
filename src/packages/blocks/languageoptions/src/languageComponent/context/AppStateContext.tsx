import React, { Component } from "react";
import Context from "./Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_LANGUAGE = "English";
const APP_LANGUAGE = "appLanguage";

class StateProvider extends Component {

  setLanguageToAsyncStorage = async (currentLanguage:string) => {
    await AsyncStorage.setItem(APP_LANGUAGE, currentLanguage);
    if(currentLanguage == "English"){
      await AsyncStorage.setItem("languename", "en");
    }else{
      await AsyncStorage.setItem("languename", "fr"); 
    }
  }

  initLanguage = async () => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
    if(currentLanguage){  
      this.setLanguageToAsyncStorage(currentLanguage);
    }else{
      let localeCode = DEFAULT_LANGUAGE;
      this.setLanguageToAsyncStorage(localeCode);
    }
  }

  // render() {
  //   const {initLanguage, setLanguageToAsyncStorage} = this;
  //   return (
  //     <Context.Provider
  //       value={{
  //         initLanguage,
  //         setLanguageToAsyncStorage,
  //       }}
  //     >
  //       {this.props.children}
  //     </Context.Provider>
  //   );
  // }
}

export { StateProvider };
