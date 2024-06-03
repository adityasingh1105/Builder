// import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initReactI18next } from "react-i18next";
import { enus } from "../translationFiles/Translation";

export const langaugeFunction = async () => {
  let dataaa: string | null = "";
  let languename = "en";
  let parseData: typeof enus = enus;

  dataaa = await AsyncStorage.getItem("langDataController")
  languename = await AsyncStorage.getItem("languename") || "en";

if(dataaa){
    try{
      parseData = await JSON.parse(dataaa);
    }catch (error){
      console.error(error);
    }
  }

  const resources = {
    enus: {
      translation: enus,
    },
    [languename]: {
      translation: parseData,
    },
  };
  // try {
  //   await i18n.use(initReactI18next).init({
  //     lng: languename,
  //     fallbackLng: "enus",
  //     compatibilityJSON: "v2",
  //     resources,
  //     interpolation: {
  //       escapeValue: false,
  //     },
  //     react: {
  //       useSuspense: true,
  //     },
  //   });
  // } catch (error) {
  //   console.error(error);
  // }
};

// export default i18n;
