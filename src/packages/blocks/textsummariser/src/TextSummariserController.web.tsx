// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  textInputWeb:string;
  summaryLineWeb:number;
  summarisedTextWeb:string;
}

interface SS {
  id: any;
}

export default class TextSummariserController extends BlockComponent<
  Props,
  S,
  SS
> {

  file:{}|null=null
  summarizeApiCallIdWeb:string=""

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
      textInputWeb:"",
      summaryLineWeb:0,
      summarisedTextWeb:""
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
      if(apiRequestCallId==this.summarizeApiCallIdWeb){
        this.handleSummariserApiResponseWeb(responseJson,errorReponse)
      }
      }

  }

  setTextWeb=(event:{target:{value:string}})=>{
    if(event.target){

      const {value}=event.target
      this.setState({textInputWeb:value})
    }
  }
  handleSummaryLineWeb=(flag:boolean)=>{
    if(flag){
      this.setState({summaryLineWeb:this.state.summaryLineWeb+1})
    }
    else{
      if(this.state.summaryLineWeb==0){
        return
      }
      this.setState({summaryLineWeb:this.state.summaryLineWeb-1})
    }
  }



  docPicker=(event:React.ChangeEvent<HTMLInputElement>)=>{
    if(this.state.textInputWeb.length > 0){
        this.showAlert("error","can enter text or file at a time")
    }
    else{
      if(event.target){

        const {files}=event.target
        if(files!==null && files[0]!==null){
          this.file=files[0]
        }
      }
    }
  }
  summariseTextWeb=()=>{
    if(this.state.summaryLineWeb===0){
      this.showAlert("error","SummayLine cannot be Zero");
      return
    }

    if(this.state.textInputWeb.length ===0 && this.file==null){
      return 
    }
    const header = {
    };
  
    let formdata=new FormData()
    formdata.append("sentence_count",JSON.stringify(this.state.summaryLineWeb))
    if(this.state.textInputWeb.length>0){
    formdata.append("text",this.state.textInputWeb)
    }else{
      formdata.append("file",this.file as Blob )
    }
 
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.summarizeApiCallIdWeb = requestMessage.messageId;
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
  handleSummariserApiResponseWeb=(responseJson: { error?:string, summarized_text?:string }, errorReponse: undefined|boolean)=>{
    if(errorReponse){
      this.showAlert("error", "Something went wrong")
    }
    if(responseJson && responseJson.error){
      this.showAlert("error", "please select txt,tsx,docx or pdf file")
    }
    else if(responseJson && responseJson.summarized_text){
      this.setState({summarisedTextWeb:responseJson.summarized_text ,textInputWeb:""})
    }
  }
  
}

// Customizable Area End
