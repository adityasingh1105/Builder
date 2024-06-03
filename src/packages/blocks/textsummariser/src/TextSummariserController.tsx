// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

import DocumentPicker  from "react-native-document-picker";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  textInput:string;
  file:{
    uri:string|null,
    name:string|null,
    type:string|null,
  };
  summaryLine:number;
  summarisedText:string;
}

interface SS {
  id: any;
}

export default class TextSummariserController extends BlockComponent<
  Props,
  S,
  SS
> {

  summarizeApiCallId:string=""

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
    ]);
    this.subScribedMessages = [
    ];

    this.state = {
      textInput:"",
      file:{name:null,uri:"",type:""},
      summaryLine:0,
      summarisedText:""
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);


  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if(apiRequestCallId==this.summarizeApiCallId){
        this.handleSummariserApiResponse(responseJson,errorReponse)
      }
      }

  }

  setText=(text:string)=>{
    this.setState({textInput:text})
  }
  handleSummaryLine=(flag:boolean)=>{
    if(flag){
      this.setState({summaryLine:this.state.summaryLine+1})
    }
    else{
      if(this.state.summaryLine==0){
        return
      }
      this.setState({summaryLine:this.state.summaryLine-1})
    }
  }



  docPicker=async()=>{
    if(this.state.textInput.length > 0){
        this.showAlert("error","can enter text or file at a time")
    }
    else{
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText,
         
          DocumentPicker.types.allFiles,
  
        ],
          copyTo:"documentDirectory"
        });

      this.setState({file:{uri: response[0].fileCopyUri,name:response[0].name,type:response[0].type}})

        this.showAlert("succes","file uploaded!")
    }
  }
  summariseText=()=>{
    if(this.state.summaryLine===0){
      this.showAlert("error","SummayLine cannot be Zero");
      return
    }
    if(this.state.textInput.length ===0 && this.state.file.name==null){
      return 
    }
    const header = {
      // "Content-Type":configJSON.textSummariserApiContentType,
      // "Accept": 'application/json',
    };
  
    let formdata=new FormData()
    formdata.append("sentence_count",JSON.stringify(this.state.summaryLine))
    if(this.state.textInput.length>0){
    formdata.append("text",this.state.textInput)
    }else{
      formdata.append("file",JSON.parse(JSON.stringify(this.state.file )))
    }
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.summarizeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.textSummariserApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),formdata
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  handleSummariserApiResponse=(responseJson: { error?:string, summarized_text?:string }, errorReponse: undefined|boolean)=>{
    if(errorReponse){
      this.showAlert("error", "Something went wrong")
    }
    if(responseJson && responseJson.error){
      this.showAlert("error", "please select txt,tsx,docx or pdf file")
    }
    else if(responseJson && responseJson.summarized_text){
      this.setState({summarisedText:responseJson.summarized_text ,textInput:""})
    }
  }
  
}

// Customizable Area End
