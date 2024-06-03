//@ts-nocheck

import { IBlock } from '../../../framework/src/IBlock'
import { Message } from '../../../framework/src/Message'
import { BlockComponent } from '../../../framework/src/BlockComponent'
import MessageEnum, {
  getName,
} from '../../../framework/src/Messages/MessageEnum'
import { runEngine } from '../../../framework/src/RunEngine'
import { Alert } from 'react-native'
import {  setStorageData } from 'framework/src/Utilities'

export const configJSON = require('./config')

export interface Props {
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isSelected:boolean;
  phoneNumber: string
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

class SignUpScreenOneController extends BlockComponent<
  Props,
  S,
  SS
> {
  apiAccountCallId: ''

  constructor(props: Props) {
    super(props)
    this.receive = this.receive.bind(this)

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ]
    // Customizable Area End
    this.state = {
        // Customizable Area Start
        isSelected:false,
        phoneNumber: '',
        // Customizable Area End
    }
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages)
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage),
    )
    if (apiRequestCallId == this.apiAccountCallId) {
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage))
      let errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage))
      if (!!responseJson && responseJson.meta?.token) {
        // configJSON.token = responseJson.meta.token
        // await StorageProvider.setItem('token', responseJson?.meta?.token)
      } else if (apiRequestCallId === this.createAccountApiCallId) {}
      else { Alert.alert(this.props.lan.languageData.translation.SignUpScreenOne.already_registered)}
     
      if (errorReponse) {
      }

    }
    // Customizable Area End
  }
  // Customizable Area Start
  setvalues(){
    this.setState({
      isSelected: !this.state.isSelected
    })
  }
  selectlng(){
    Alert.alert("Select a language", "Choose an option ", [
      {
      text: "English",
      onPress: () => this.changeLang('English')
    }, {
      text: "Spanish",
      onPress: () => {this.changeLang('Spanish')}
    }, {
      text: "French",
      onPress: () => {this.changeLang('French')}
    }])
  }

   changeLang(value: string) {
    if (value === 'French') {
      this.props.lan?.alternateLanguage('fr');
       setStorageData('chosenLanguage', 'fr')
    }
    else if (value === 'Spanish') {
      this.props.lan?.alternateLanguage('es');
       setStorageData('chosenLanguage', 'es')
    }
    else {
      this.props.lan?.alternateLanguage('en');
       setStorageData('chosenLanguage', 'en')
    }
  }



  onChangeText = (textInput: string) => {
    this.setState({ phoneNumber: textInput })
  }

  inputNumberProps = {
    keyboardType: 'numeric',
    onChangeText: this.onChangeText,
  }


  GotoLogin = () => { 
    const msgSucces: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msgSucces.addData(getName(MessageEnum.NavigationPropsMessage),this.props );
    msgSucces.addData(getName(MessageEnum.Language1MessageData),{});
    this.send(msgSucces);
  }

  callGetValidationApi(mobileNumber:number) {
    if (mobileNumber != '' || mobileNumber.length == 10) {
       if( mobileNumber.length == 10) {
        const headers = { 'Content-Type': configJSON.validationApiContentType}
        const params = {
       data: {
            type: 'sms_account',
            attributes: {
              fullPhoneNumber: '+1' + mobileNumber,
              role_id: 1,
            },
          },
        } 

        const getValidationsMsg = new Message(
          getName(MessageEnum.RestAPIRequestMessage),
        )
        this.apiAccountCallId = getValidationsMsg.messageId

        getValidationsMsg.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.urlaccounts,
        )

        getValidationsMsg.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(headers),
        )

        getValidationsMsg.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          configJSON.validationApiMethodType,
        )

        getValidationsMsg.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify({
            ...params,
          }),
        )

        runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg)

      }
    }
    else {
      Alert.alert(this.props?.lan?.languageData?.translation?.SignUpScreenOne?.valid_NO)
    }
  }
  
  // Customizable Area End
}

export default SignUpScreenOneController;

