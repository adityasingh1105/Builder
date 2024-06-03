import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import AlertBlock from '../../blocks/alert/src/AlertBlock';
import CustomTextItem from "./CustomTextItem";
import NavigationBlock from "../../framework/src/Blocks/NavigationBlock";
import SingletonFactory from '../../framework/src/SingletonFactory';

import HomeScreenAdapter from '../../blocks/adapters/src/HomeScreenAdapter';
import InfoPageAdapter from '../../blocks/adapters/src/InfoPageAdapter';
import AlertPageWebAdapter from "../../blocks/adapters/src/AlertPageWebAdapter";

// Customizable Area Start
import PrivacyPolicyAdapter from "../../blocks/adapters/src/PrivacyPolicyAdapter";
import TermsAndConditionAdapter from "../../blocks/adapters/src/TermsAndConditionAdapter";
import SplashScreenAdapter from "../../blocks/adapters/src/SplashScreenAdapter";
import SocialMediaLogInAdapter from "../../blocks/adapters/src/SocialMediaLogInAdapter";
import EmailAccountLogInAdapter from "../../blocks/adapters/src/EmailAccountLogInAdapter";
import EmailAccountSignUpAdapter from "../../blocks/adapters/src/EmailAccountSignUpAdapter";
import ForgotPasswordAdapter from "../../blocks/adapters/src/ForgotPasswordAdapter";
import MobilePhoneToOTPAdapter from "../../blocks/adapters/src/MobilePhoneToOTPAdapter";
import OtpToNewPasswordAdapter from "../../blocks/adapters/src/OtpToNewPasswordAdapter";
import MobilePhoneLogInAdapter from "../../blocks/adapters/src/MobilePhoneLogInAdapter";
import MobilePhoneToAdditionalDetailsAdapter from "../../blocks/adapters/src/MobilePhoneToAdditionalDetailsAdapter";

//Assembler generated adapters start
const socialMediaLogInAdapter = new SocialMediaLogInAdapter();
const emailAccountLogInAdapter = new EmailAccountLogInAdapter();
const emailAccountSignUpAdapter = new EmailAccountSignUpAdapter();
const forgotPasswordAdapter = new ForgotPasswordAdapter();
const mobilePhoneToOTPAdapter = new MobilePhoneToOTPAdapter();
const otpToNewPasswordAdapter = new OtpToNewPasswordAdapter();
const mobilePhoneLogInAdapter = new MobilePhoneLogInAdapter();
const mobilePhoneToAdditionalDetailsAdapter = new MobilePhoneToAdditionalDetailsAdapter();

//Assembler generated adapters end



const privacyAdapter = new PrivacyPolicyAdapter();
const termAndConditionAdapter = new TermsAndConditionAdapter();
const splashScreenAdapter = new SplashScreenAdapter();
// Customizable Area End


const restAPIBlock = SingletonFactory.getRestBlockInstance();
const alertBlock = new AlertBlock();
const navigationBlock = new NavigationBlock();
const sessionBlock = SingletonFactory.getSessionBlockInstance();
const userAccountManagerBlock = SingletonFactory.getUserManagerInstance();
const homeScreenAdapter = new HomeScreenAdapter();
const infoPageAdapter = new InfoPageAdapter();
const alertPageWebAdapter = new AlertPageWebAdapter()

const instructions = Platform.select({
  // Customizable Area Start
  ios: "The iOS APP to rule them all!",
  android: "Now with Android AI",
  web: "Selector your adventure."
  // Customizable Area End
});

interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
interface S { }

interface SS { }

class HomeScreen extends BlockComponent<Props, S, SS> {

  static instance:HomeScreen;

  constructor(props: Props) {
    super(props);
    HomeScreen.instance = this;
  }

  render() {
    const { navigation } = this.props;
    const _this = this;

    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.welcome}>
                Welcome to DesignProcess!
              </Text>
            </View>

            <Text style={styles.instructions}>{instructions}</Text>
            <Text style={styles.header}>DEFAULT BLOCKS</Text>
            <CustomTextItem
              content={'InfoPage'}
              onPress={() => navigation.navigate("InfoPage")}
            />
            <CustomTextItem
              content={'Alert'}
              onPress={() => this.showAlert("Example", "This happened")}
            />
<CustomTextItem content={'Prioritise'}  onPress={() => navigation.navigate("Prioritise")} />
<CustomTextItem content={'core'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'utilities'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'multipageforms'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'SocialMediaAccountRegistrationScreen'}  onPress={() => navigation.navigate("SocialMediaAccountRegistrationScreen")} />
<CustomTextItem content={'social-media-account'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'EmailAccountLoginBlock'}  onPress={() => navigation.navigate("EmailAccountLoginBlock")} />
<CustomTextItem content={'EmailAccountRegistration'}  onPress={() => navigation.navigate("EmailAccountRegistration")} />
<CustomTextItem content={'CountryCodeSelector'}  onPress={() => navigation.navigate("CountryCodeSelector")} />
<CustomTextItem content={'ForgotPassword'}  onPress={() => navigation.navigate("ForgotPassword")} />
<CustomTextItem content={'OTPInputAuth'}  onPress={() => navigation.navigate("OTPInputAuth")} />
<CustomTextItem content={'SocialMediaAccountLoginScreen'}  onPress={() => navigation.navigate("SocialMediaAccountLoginScreen")} />
<CustomTextItem content={'LanguageSupport'}  onPress={() => navigation.navigate("LanguageSupport")} />
<CustomTextItem content={'LanguageOptions'}  onPress={() => navigation.navigate("LanguageOptions")} />
<CustomTextItem content={'MobileAccountLoginBlock'}  onPress={() => navigation.navigate("MobileAccountLoginBlock")} />
<CustomTextItem content={'UserStatus'}  onPress={() => navigation.navigate("UserStatus")} />
<CustomTextItem content={'smssettings'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'dashboard'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'ImportExportData'}  onPress={() => navigation.navigate("ImportExportData")} />
<CustomTextItem content={'timeclock'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'waitinglist'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'watermark'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Notificationsettings'}  onPress={() => navigation.navigate("Notificationsettings")} />
<CustomTextItem content={'UserProfileBasicBlock'}  onPress={() => navigation.navigate("UserProfileBasicBlock")} />
<CustomTextItem content={'EducationalUserProfile'}  onPress={() => navigation.navigate("EducationalUserProfile")} />
<CustomTextItem content={'Analytics'}  onPress={() => navigation.navigate("Analytics")} />
<CustomTextItem content={'fileattachment'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Filteritems'}  onPress={() => navigation.navigate("Filteritems")} />
<CustomTextItem content={'Catalogue'}  onPress={() => navigation.navigate("Catalogue")} />
<CustomTextItem content={'Download'}  onPress={() => navigation.navigate("Download")} />
<CustomTextItem content={'FormApprovalWorkflow'}  onPress={() => navigation.navigate("FormApprovalWorkflow")} />
<CustomTextItem content={'BulkUploading'}  onPress={() => navigation.navigate("BulkUploading")} />
<CustomTextItem content={'receiptcustomisation'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'StripePayments'}  onPress={() => navigation.navigate("StripePayments")} />
<CustomTextItem content={'textsummariser'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'ActivityFeed'}  onPress={() => navigation.navigate("ActivityFeed")} />
<CustomTextItem content={'AutomaticFormCreation'}  onPress={() => navigation.navigate("AutomaticFormCreation")} />
<CustomTextItem content={'annotations'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'AdvancedSearch'}  onPress={() => navigation.navigate("AdvancedSearch")} />
<CustomTextItem content={'Categoriessubcategories'}  onPress={() => navigation.navigate("Categoriessubcategories")} />
<CustomTextItem content={'itemgrouper'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'OrderManagement'}  onPress={() => navigation.navigate("OrderManagement")} />
<CustomTextItem content={'dashboardguests'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'customisableuserprofiles'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'languagedetection'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Pushnotifications'}  onPress={() => navigation.navigate("Pushnotifications")} />
<CustomTextItem content={'Notifications'}  onPress={() => navigation.navigate("Notifications")} />
<CustomTextItem content={'PhoneNumberInput'}  onPress={() => navigation.navigate("PhoneNumberInput")} />
<CustomTextItem content={'VisualAnalytics'}  onPress={() => navigation.navigate("VisualAnalytics")} />
<CustomTextItem content={'Scheduling'}  onPress={() => navigation.navigate("Scheduling")} />
<CustomTextItem content={'Contactus'}  onPress={() => navigation.navigate("Contactus")} />
<CustomTextItem content={'TextComparison'}  onPress={() => navigation.navigate("TextComparison")} />
<CustomTextItem content={'RandomNumberGenerator'}  onPress={() => navigation.navigate("RandomNumberGenerator")} />
<CustomTextItem content={'desktopnotifications'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Translation'}  onPress={() => navigation.navigate("Translation")} />
<CustomTextItem content={'Addresses'}  onPress={() => navigation.navigate("Addresses")} />
<CustomTextItem content={'Print'}  onPress={() => navigation.navigate("Print")} />
<CustomTextItem content={'Customisableusersubscriptions'}  onPress={() => navigation.navigate("Customisableusersubscriptions")} />
<CustomTextItem content={'HelpCentre'}  onPress={() => navigation.navigate("HelpCentre")} />
<CustomTextItem content={'LandingPage'}  onPress={() => navigation.navigate("LandingPage")} />
<CustomTextItem content={'TermsConditions'}  onPress={() => navigation.navigate("TermsConditions")} />
<CustomTextItem content={'ReviewApprovalAdmin'}  onPress={() => navigation.navigate("ReviewApprovalAdmin")} />
<CustomTextItem content={'Baselinereporting2'}  onPress={() => navigation.navigate("Baselinereporting2")} />
<CustomTextItem content={'Filecompression'}  onPress={() => navigation.navigate("Filecompression")} />
<CustomTextItem content={'Smartcategorisation'}  onPress={() => navigation.navigate("Smartcategorisation")} />
<CustomTextItem content={'Adminconsole2'}  onPress={() => navigation.navigate("Adminconsole2")} />
<CustomTextItem content={'Rolesandpermissions2'}  onPress={() => navigation.navigate("Rolesandpermissions2")} />
<CustomTextItem content={'Groups2'}  onPress={() => navigation.navigate("Groups2")} />
<CustomTextItem content={'Convertfile'}  onPress={() => navigation.navigate("Convertfile")} />
<CustomTextItem content={'Multiselect'}  onPress={() => navigation.navigate("Multiselect")} />
<CustomTextItem content={'Multilevelapproval2'}  onPress={() => navigation.navigate("Multilevelapproval2")} />
<CustomTextItem content={'Settings2'}  onPress={() => navigation.navigate("Settings2")} />
<CustomTextItem content={'Paymentadmin2'}  onPress={() => navigation.navigate("Paymentadmin2")} />
<CustomTextItem content={'Servicespecificsettingsadmin2'}  onPress={() => navigation.navigate("Servicespecificsettingsadmin2")} />
<CustomTextItem content={'Stripegatewayapifrontend2'}  onPress={() => navigation.navigate("Stripegatewayapifrontend2")} />
<CustomTextItem content={'Emailnotifications2'}  onPress={() => navigation.navigate("Emailnotifications2")} />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
// Customizable Area End

// Customizable Area Start
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: Platform.OS === "web" ? '100vh' : 'auto',
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#6200EE",
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,

    padding: 10
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#00000000',
    padding: 18,
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'normal'
  }
});
// Customizable Area End
export default HomeScreen;