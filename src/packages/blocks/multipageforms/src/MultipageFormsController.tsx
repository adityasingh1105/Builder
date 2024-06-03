import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName,} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import countrylist from "./CountryCodeList";

// Customizable Area End


export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;/*  */
  // Customizable Area Start
  // Customizable Area End
}

const { baseURL: apiBaseUrl } = require('./../../../framework/src/config')

interface StateType {
  first_name: string;
  last_name: string;
  phone_number: string;
  selectedCountry: string,
  selectedGender: string,
  selectedPhoneCountry: string,
  email: string;
  message: string;
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  activeSteps: number;
  countries: Array<object>,
  gender: Array<Gender>,
  country: Array<Country>,
  industry: Array<Industry>,
  selectedIndustry: string,
  token_local: string | null,
  showErrors: boolean;
  errorsData: string;
  successData: string;
  successDataMsg: string;
  isLoading: boolean;
  isSubmitted: boolean;  
  formikData: FormikData;
  // Customizable Area Start
  
  // Customizable Area End
}

interface FormikData {
  first_name : string,
  last_name : string,
  email : string,
  selectedPhoneCountry: string,
  phone_number: string,
  selectedGender?: string,
  selectedCountry? : string,
  message?: string,
  selectedIndustry? : string,
  countries: Array<object>
}

interface CustomTypeData
{
  contentType: string,
  method: string,
  body: {
    data: CustomTypeBodyData
  },
  endPoint: string,
}

interface CustomTypeBodyData{
  attributes: {
      first_name: string,
      last_name:string,
      phone_number: string,
      email: string,
      gender: string,
      country: string,
      industry: string,
      message: string
    },
    type: string,
  }



interface CustomTypeSubmitvalues {
  first_name: string,
  last_name: string, 
  selectedPhoneCountry: string, 
  phone_number: string, 
  email: string, 
  countries: Array<object>,
  selectedGender?: string, 
  selectedCountry?: string, 
  selectedIndustry?: string, 
  message?: string,
}

interface CustomTypevalues {
  first_name: string,
  last_name: string, 
  selectedPhoneCountry: string, 
  phone_number: string, 
  email: string, 
  selectedGender: string, 
  selectedCountry: string, 
  selectedIndustry: string, 
  message: string,
}

export interface CountriesList {
  Countries : Array<Countries> ;

}

 interface Countries {
    name: string,
    dial_code: string,
    code: string
  }

export interface Gender {
   label: string, 
   value: string 
}

export interface Industry {
  label: string, 
  value: string 
}
export interface Country {
  label: string, 
  value: string 
}
interface SSType {
  SSTypeid: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class MultipageFormsController extends BlockComponent<
  Props,
  StateType,
  SSType
> {
  // Customizable Area Start
  submitTransactionApiCallId: string = "";
  getOrderApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      // Customizable Area End
    ];

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    this.state = {
      first_name: "",
      last_name: "",
      selectedPhoneCountry: "+91",
      phone_number: "",
      email: "",
      message: "",
      selectedCountry: "",
      selectedGender: "",
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      activeSteps: 0,
      countries: countrylist,
      formikData: {
        selectedCountry: "1",
        selectedGender: "1",
        selectedIndustry: "education",
        first_name: "",
        last_name: "",
        email: "",
        selectedPhoneCountry: "",
        message: "",
        phone_number: "",
        countries: countrylist
      },
      
      // Add more countries as neede
      gender: [
        { label: 'Male', value: '1' },
        { label: 'Female', value: '2' },
      ],
      country: [
        { label: 'India', value: '1' },
        { label: 'America', value: '2' },
        { label: 'Canada', value: '3' },
        { label: 'England', value: '4' },
      ],
      industry: [
        { label: 'Education', value: 'education' },
        { label: 'Food', value: 'food' },
        { label: 'Marketing', value: 'marketing' }
      ],
      selectedIndustry: '',
      token_local: localStorage.getItem("loginTokenBlock"),
      showErrors: false,
      errorsData: "",
      isLoading: false,
      successData: "",
      isSubmitted: false,
      successDataMsg: "",
      // Customizable Area Start
      // Customizable Area End
    };

    // Customizable Area Start
    // Customizable Area End
  }
  
   // Customizable Area Start
  getOrderIdFailureCallBack = async (responseJson: string) => {
    alert("@@@@====>");
  };
  
  // Api response
  async receive(from: string, message: Message) {
    
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) 
    {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && responseJson.errors && apiRequestCallId === this.getOrderApiCallId) {
          this.getOrderIdFailureCallBack(responseJson);
      }
      if (responseJson && !responseJson.errors && apiRequestCallId === this.getOrderApiCallId) { 
        
        const data = responseJson.data.attributes;
        this.setState({
          successDataMsg: configJSON.successMessage,
          successData: "",
          isSubmitted: true,
          activeSteps: 2,
          first_name: data.first_name,
          last_name: data.first_name,
          email: data.first_name,
          phone_number: data.phone_number,
          selectedGender: data.gender,
          selectedCountry: data.country,
          selectedIndustry: data.industry,
          message: data.message,
          formikData: {
            selectedCountry: "1",
            selectedGender: "1",
            selectedIndustry: "education",
            first_name: "",
            last_name: "",
            email: "",
            selectedPhoneCountry: "",
            message: "",
            phone_number: "",
            countries: countrylist
          },
        })
        }
      }
    // Customizable Area End
}


  multiPageFormSubmit = async (values : CustomTypevalues) => {
    
    const selectedCountryLabel = this.state.country.filter((item: Country) => {
      return item.value === values.selectedCountry ? item : null
    });
    const selectedGenderLabel = this.state.gender.filter((item: Gender) => {
      return item.value === values.selectedGender ? item : null
    });
    const selectedIndustryLabel = this.state.industry.filter((item: Industry) => {
      return item.value === values.selectedIndustry ? item : null
    });

    const rawData = {
      "data": {
        "attributes": {
          "first_name": `${values.first_name}`,
          "last_name": `${values.last_name}`,
          "phone_number": `${values.selectedPhoneCountry} ${values.phone_number}`,
          "email": `${values.email}`,
          "gender": selectedGenderLabel[0].label,
          "country": selectedCountryLabel[0].label,
          "industry": selectedIndustryLabel[0].value,
          "message": `${values.message}`
        },
        "type": "email_account"
      }
    };
      
      this.getOrderApiCallId = await this.apiCall({
          contentType: "application/json",
          method: 'POST',
          body: rawData,
          endPoint: '/bx_block_multipageforms/user_profiles'
      })
    
  }
  apiCall = async (data: CustomTypeData) => {
    const { contentType, method, endPoint, body } = data;
      const header = {
          "Content-Type": contentType,
      };
      const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
      );
      requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header)
      );
      requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
      );
      requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          method
      );
      body &&
          requestMessage.addData(
              getName(MessageEnum.RestAPIRequestBodyMessage),
              JSON.stringify(body)
          );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return requestMessage.messageId;
  };
  
  stepOnSubmit = (values: CustomTypeSubmitvalues) => {
    this.setState({ formikData: values, activeSteps: this.state.activeSteps + 1 })
  }

  
  handleBack = () => {
    this.setState({ activeSteps: this.state.activeSteps - 1 })
  };

  getSteps() {
    return ["Step 1", "Step 2", "Complete"];
  }

  LoginPage = () => {
    this.props.navigation.navigate('EmailAccountLogin')
  }
  
  txtInputProps = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(message);
  }


  // Customizable Area Start
  // Customizable Area End

}
