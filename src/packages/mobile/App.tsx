import React from 'react';

import {
  createStackNavigator
} from "react-navigation";

import HomeScreen from "../components/src/HomeScreen";
import InfoPage from '../blocks/info-page/src/InfoPageBlock'
import Filecompression from "../blocks/filecompression/src/Filecompression";
import OrderManagement from "../blocks/ordermanagement/src/OrderManagement";
import Prioritise from "../blocks/prioritise/src/Prioritise";
import Filteritems from "../blocks/filteritems/src/Filteritems";
import Filteroptions from "../blocks/filteritems/src/Filteroptions";
import Notificationsettings from "../blocks/notificationsettings/src/Notificationsettings";
import PhoneNumberInput from "../blocks/mobile-account-registration/src/PhoneNumberInput";
import AdditionalDetailForm from "../blocks/mobile-account-registration/src/AdditionalDetailForm";
import EducationalUserProfile from "../blocks/educational-user-profile/src/EducationalUserProfile";
import RandomNumberGenerator from "../blocks/randomnumbergenerator/src/RandomNumberGenerator";
import AdvancedSearch from "../blocks/advancedsearch/src/AdvancedSearch";
import HelpCentre from "../blocks/helpcentre/src/HelpCentre";
import HelpCentreQA from "../blocks/helpcentre/src/HelpCentreQA";
import HelpCentreSub from "../blocks/helpcentre/src/HelpCentreSub";
import Emailnotifications2 from "../blocks/emailnotifications2/src/Emailnotifications2";
import OTPInputAuth from "../blocks/otp-input-confirmation/src/OTPInputAuth";
import LanguageSupport from "../blocks/languagesupport/src/LanguageSupport";
import VisualAnalytics from "../blocks/visualanalytics/src/VisualAnalytics";
import Adminconsole2 from "../blocks/adminconsole2/src/Adminconsole2";
import AutomaticFormCreation from "../blocks/automaticformcreation/src/AutomaticFormCreation";
import Notifications from "../blocks/notifications/src/Notifications";
import Smartcategorisation from "../blocks/smartcategorisation/src/Smartcategorisation";
import Download from "../blocks/download/src/Download";
import Servicespecificsettingsadmin2 from "../blocks/servicespecificsettingsadmin2/src/Servicespecificsettingsadmin2";
import UserStatus from "../blocks/userstatus/src/UserStatus";
import FormApprovalWorkflow from "../blocks/formapprovalworkflow/src/FormApprovalWorkflow";
import Paymentadmin2 from "../blocks/paymentadmin2/src/Paymentadmin2";
import Customisableusersubscriptions from "../blocks/customisableusersubscriptions/src/Customisableusersubscriptions";
import SubscriptionDetails from "../blocks/customisableusersubscriptions/src/SubscriptionDetails";
import Stripegatewayapifrontend2 from "../blocks/stripegatewayapifrontend2/src/Stripegatewayapifrontend2";
import Multiselect from "../blocks/multiselect/src/Multiselect";
import Groups2 from "../blocks/groups2/src/Groups2";
import CountryCodeSelector from "../blocks/country-code-selector/src/CountryCodeSelector";
import CountryCodeSelectorTable from "../blocks/country-code-selector/src/CountryCodeSelectorTable";
import Catalogue from "../blocks/catalogue/src/Catalogue";
import Rolesandpermissions2 from "../blocks/rolesandpermissions2/src/Rolesandpermissions2";
import UserProfileBasicBlock from "../blocks/user-profile-basic/src/UserProfileBasicBlock";
import Pushnotifications from "../blocks/pushnotifications/src/Pushnotifications";
import Scheduling from "../blocks/scheduling/src/Scheduling";
import Convertfile from "../blocks/convertfile/src/Convertfile";
import Contactus from "../blocks/contactus/src/Contactus";
import AddContactus from "../blocks/contactus/src/AddContactus";
import Settings2 from "../blocks/settings2/src/Settings2";
import ActivityFeed from "../blocks/activityfeed/src/ActivityFeed";
import Print from "../blocks/print/src/Print";
import Addresses from "../blocks/addressmanagement/src/Addresses";
import AddAddress from "../blocks/addressmanagement/src/AddAddress";
import SocialMediaAccountLoginScreen from "../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import SocialMediaAccountRegistrationScreen from "../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen";
import EmailAccountLoginBlock from "../blocks/email-account-login/src/EmailAccountLoginBlock";
import TextComparison from "../blocks/textcomparison/src/TextComparison";
import ForgotPassword from "../blocks/forgot-password/src/ForgotPassword";
import ForgotPasswordOTP from "../blocks/forgot-password/src/ForgotPasswordOTP";
import NewPassword from "../blocks/forgot-password/src/NewPassword";
import Translation from "../blocks/translation/src/Translation";
import StripePayments from "../blocks/stripepayments/src/StripePayments";
import ImportExportData from "../blocks/importexportdata/src/ImportExportData";
import TermsConditions from "../blocks/termsconditions/src/TermsConditions";
import TermsConditionsDetail from "../blocks/termsconditions/src/TermsConditionsDetail";
import TermsConditionsUsers from "../blocks/termsconditions/src/TermsConditionsUsers";
import BulkUploading from "../blocks/bulkuploading/src/BulkUploading";
import MobileAccountLoginBlock from "../blocks/mobile-account-login/src/MobileAccountLoginBlock";
import LandingPage from "../blocks/landingpage/src/LandingPage";
import EmailAccountRegistration from "../blocks/email-account-registration/src/EmailAccountRegistration";
import Analytics from "../blocks/analytics/src/Analytics";
import Baselinereporting2 from "../blocks/baselinereporting2/src/Baselinereporting2";
import Multilevelapproval2 from "../blocks/multilevelapproval2/src/Multilevelapproval2";
import Categoriessubcategories from "../blocks/categoriessubcategories/src/Categoriessubcategories";
import LanguageOptions from "../blocks/languageoptions/src/LanguageOptions";
import ReviewApprovalAdmin from "../blocks/reviewandapproval/src/ReviewApprovalAdmin";
import ReviewApprovalBasicUser from "../blocks/reviewandapproval/src/ReviewApprovalBasicUser";


const HomeStack = createStackNavigator({
Home: { screen: ReviewApprovalAdmin, navigationOptions: { header: null, title: "Home" } },
Filecompression:{ screen:Filecompression,navigationOptions:{ title:"Filecompression"}},
OrderManagement:{ screen:OrderManagement,navigationOptions:{ title:"OrderManagement"}},
Prioritise:{ screen:Prioritise,navigationOptions:{ title:"Prioritise"}},
Filteritems:{ screen:Filteritems,navigationOptions:{ title:"Filteritems"}},
Filteroptions:{ screen:Filteroptions,navigationOptions:{ title:"Filteroptions"}},
Notificationsettings:{ screen:Notificationsettings,navigationOptions:{ title:"Notificationsettings"}},
PhoneNumberInput:{ screen:PhoneNumberInput,navigationOptions:{ title:"PhoneNumberInput"}},
AdditionalDetailForm:{ screen:AdditionalDetailForm,navigationOptions:{ title:"AdditionalDetailForm"}},
EducationalUserProfile:{ screen:EducationalUserProfile,navigationOptions:{ title:"EducationalUserProfile"}},
RandomNumberGenerator:{ screen:RandomNumberGenerator,navigationOptions:{ title:"RandomNumberGenerator"}},
AdvancedSearch:{ screen:AdvancedSearch,navigationOptions:{ title:"AdvancedSearch"}},
HelpCentre:{ screen:HelpCentre,navigationOptions:{ title:"HelpCentre"}},
HelpCentreQA:{ screen:HelpCentreQA,navigationOptions:{ title:"HelpCentreQA"}},
HelpCentreSub:{ screen:HelpCentreSub,navigationOptions:{ title:"HelpCentreSub"}},
Emailnotifications2:{ screen:Emailnotifications2,navigationOptions:{ title:"Emailnotifications2"}},
OTPInputAuth:{ screen:OTPInputAuth,navigationOptions:{ title:"OTPInputAuth"}},
LanguageSupport:{ screen:LanguageSupport,navigationOptions:{ title:"LanguageSupport"}},
VisualAnalytics:{ screen:VisualAnalytics,navigationOptions:{ title:"VisualAnalytics"}},
Adminconsole2:{ screen:Adminconsole2,navigationOptions:{ title:"Adminconsole2"}},
AutomaticFormCreation:{ screen:AutomaticFormCreation,navigationOptions:{ title:"AutomaticFormCreation"}},
Notifications:{ screen:Notifications,navigationOptions:{ title:"Notifications"}},
Smartcategorisation:{ screen:Smartcategorisation,navigationOptions:{ title:"Smartcategorisation"}},
Download:{ screen:Download,navigationOptions:{ title:"Download"}},
Servicespecificsettingsadmin2:{ screen:Servicespecificsettingsadmin2,navigationOptions:{ title:"Servicespecificsettingsadmin2"}},
UserStatus:{ screen:UserStatus,navigationOptions:{ title:"UserStatus"}},
FormApprovalWorkflow:{ screen:FormApprovalWorkflow,navigationOptions:{ title:"FormApprovalWorkflow"}},
Paymentadmin2:{ screen:Paymentadmin2,navigationOptions:{ title:"Paymentadmin2"}},
Customisableusersubscriptions:{ screen:Customisableusersubscriptions,navigationOptions:{ title:"Customisableusersubscriptions"}},
SubscriptionDetails:{ screen:SubscriptionDetails,navigationOptions:{ title:"SubscriptionDetails"}},
Stripegatewayapifrontend2:{ screen:Stripegatewayapifrontend2,navigationOptions:{ title:"Stripegatewayapifrontend2"}},
Multiselect:{ screen:Multiselect,navigationOptions:{ title:"Multiselect"}},
Groups2:{ screen:Groups2,navigationOptions:{ title:"Groups2"}},
CountryCodeSelector:{ screen:CountryCodeSelector,navigationOptions:{ title:"CountryCodeSelector"}},
CountryCodeSelectorTable:{ screen:CountryCodeSelectorTable,navigationOptions:{ title:"CountryCodeSelectorTable"}},
Catalogue:{ screen:Catalogue,navigationOptions:{ title:"Catalogue"}},
Rolesandpermissions2:{ screen:Rolesandpermissions2,navigationOptions:{ title:"Rolesandpermissions2"}},
UserProfileBasicBlock:{ screen:UserProfileBasicBlock,navigationOptions:{ title:"UserProfileBasicBlock"}},
Pushnotifications:{ screen:Pushnotifications,navigationOptions:{ title:"Pushnotifications"}},
Scheduling:{ screen:Scheduling,navigationOptions:{ title:"Scheduling"}},
Convertfile:{ screen:Convertfile,navigationOptions:{ title:"Convertfile"}},
Contactus:{ screen:Contactus,navigationOptions:{ title:"Contactus"}},
AddContactus:{ screen:AddContactus,navigationOptions:{ title:"AddContactus"}},
Settings2:{ screen:Settings2,navigationOptions:{ title:"Settings2"}},
ActivityFeed:{ screen:ActivityFeed,navigationOptions:{ title:"ActivityFeed"}},
Print:{ screen:Print,navigationOptions:{ title:"Print"}},
Addresses:{ screen:Addresses,navigationOptions:{ title:"Addresses"}},
AddAddress:{ screen:AddAddress,navigationOptions:{ title:"AddAddress"}},
SocialMediaAccountLoginScreen:{ screen:SocialMediaAccountLoginScreen,navigationOptions:{ title:"SocialMediaAccountLoginScreen"}},
SocialMediaAccountRegistrationScreen:{ screen:SocialMediaAccountRegistrationScreen,navigationOptions:{ title:"SocialMediaAccountRegistrationScreen"}},
EmailAccountLoginBlock:{ screen:EmailAccountLoginBlock,navigationOptions:{ title:"EmailAccountLoginBlock"}},
TextComparison:{ screen:TextComparison,navigationOptions:{ title:"TextComparison"}},
ForgotPassword:{ screen:ForgotPassword,navigationOptions:{ title:"ForgotPassword"}},
ForgotPasswordOTP:{ screen:ForgotPasswordOTP,navigationOptions:{ title:"ForgotPasswordOTP"}},
NewPassword:{ screen:NewPassword,navigationOptions:{ title:"NewPassword"}},
Translation:{ screen:Translation,navigationOptions:{ title:"Translation"}},
StripePayments:{ screen:StripePayments,navigationOptions:{ title:"StripePayments"}},
ImportExportData:{ screen:ImportExportData,navigationOptions:{ title:"ImportExportData"}},
TermsConditions:{ screen:TermsConditions,navigationOptions:{ title:"TermsConditions"}},
TermsConditionsDetail:{ screen:TermsConditionsDetail,navigationOptions:{ title:"TermsConditionsDetail"}},
TermsConditionsUsers:{ screen:TermsConditionsUsers,navigationOptions:{ title:"TermsConditionsUsers"}},
BulkUploading:{ screen:BulkUploading,navigationOptions:{ title:"BulkUploading"}},
MobileAccountLoginBlock:{ screen:MobileAccountLoginBlock,navigationOptions:{ title:"MobileAccountLoginBlock"}},
LandingPage:{ screen:LandingPage,navigationOptions:{ title:"LandingPage"}},
EmailAccountRegistration:{ screen:EmailAccountRegistration,navigationOptions:{ title:"EmailAccountRegistration"}},
Analytics:{ screen:Analytics,navigationOptions:{ title:"Analytics"}},
Baselinereporting2:{ screen:Baselinereporting2,navigationOptions:{ title:"Baselinereporting2"}},
Multilevelapproval2:{ screen:Multilevelapproval2,navigationOptions:{ title:"Multilevelapproval2"}},
Categoriessubcategories:{ screen:Categoriessubcategories,navigationOptions:{ title:"Categoriessubcategories"}},
LanguageOptions:{ screen:LanguageOptions,navigationOptions:{ title:"LanguageOptions"}},
ReviewApprovalAdmin:{ screen:ReviewApprovalAdmin,navigationOptions:{ title:"ReviewApprovalAdmin"}},
ReviewApprovalBasicUser:{ screen:ReviewApprovalBasicUser,navigationOptions:{ title:"ReviewApprovalBasicUser"}},

  InfoPage: { screen: InfoPage, navigationOptions: { title: "Info" } }, 
});

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: "HomeScreen"
  };
  const homeScreen = new HomeScreen(defaultProps);
}

export function App() {
  return (
    <HomeStack />
  );
};
