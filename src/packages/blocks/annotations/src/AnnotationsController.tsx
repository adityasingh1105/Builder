import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";


// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id?: string;
  // Customizable Area Start
  // Customizable Area End
}

export type note = {
  id: number | string,
  title: string,
  description: string,
  time: number
  isUpdated: boolean,

}

interface ApiData {
  contentType?: string;
  method: string;
  endPoint: string;
  body?: FormData | string | object;
  type?: string;
}

export interface NoteArray {
  [key: string]: string | boolean | number
}

export interface AttachmentData {
  id: number;
  type: string;
  attributes: {
    title: string,
    description: string
    account: {
      id: number,
      first_name: string | null,
      last_name: string | null,
      full_phone_number: string | number | null,
      country_code: null,
      phone_number: null,
      email: string | null,
      activated: true,
      device_id: null,
      unique_auth_id: null,
      password_digest: string,
      created_at: string | null,
      updated_at: string | null,
      user_name: null,
      platform: null,
      user_type: null,
      app_language_id: null,
      last_visit_at: null,
      is_blacklisted: false,
      suspend_until: null,
      status: string | null,
      stripe_id: null,
      subscription_id: null,
      subscription_date: null,
      full_name: string | null,
      role_id: null,
      gender: null,
      date_of_birth: null,
      user_age: null,
      is_paid: false,
      new_email: null,
      is_deleted: false,
      language: null,
      reset_email_token: null,
      change_email_token: null,
      last_login_at: string | null,
      push_notificable: true,
      mail_notificable: true,
      is_mail_verified: boolean,
      devices_type: null,
      ios_version: null,
      duration: null
    }
  }
}


interface S {

  // Customizable Area Start
  user_token: string
  editId:string;
  title:string;
  description:string;
  id:string;
  openModal:boolean;
  editModal:boolean;
  notes:NoteArray[] ;
  isEdit:boolean;
  renderEditNote:boolean;
  height:number;
  item: NoteArray[]

  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AnnotationsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  createNoteId: string;
  postNoteId: string;
  patchNoteId: string;
  deleteNoteId: string;
  // Customizable Area End

  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.createNoteId = "";
    this.postNoteId = "";
    this.patchNoteId = "";
    this.deleteNoteId = "";

    this.state = {

      // Customizable Area Start
      user_token: '',
      title:"",
      description:"",
      openModal:false,
      editModal:false,
      isEdit:false,
      notes:[],
      renderEditNote:false,
      id:"",
      height:40,
      editId: "",
      item: []
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }


  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage))
      const errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage))

      if (responseJson) {
        if (apiRequestCallId === this.createNoteId) {
          this.setNotes(responseJson.data)

        }
        else if (apiRequestCallId === this.postNoteId) {
          this.getNotes()
          this.showAlert("Note", "Note Created")
        }
        else if (apiRequestCallId === this.deleteNoteId) {
          this.showAlert("Note", "Note Deleted")
        }
        else if (apiRequestCallId === this.patchNoteId) {
          this.getNotes()
          this.showAlert("Note", "Note Updated")
        }

      } else if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.createNoteId) {
          this.parseApiErrorResponse(responseJson)
        }
      } else if (errorReponse) {
        this.parseApiCatchErrorResponse(errorReponse)
      }
    }
  }

  // Customizable Area Start
  apiCall = async (data: ApiData) => {
    const { contentType, method, endPoint, body, type } = data
    let token: string | null = await AsyncStorage.getItem("LOGIN_TOKEN")
    const header = {
      'Content-Type': contentType,
      token,
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    )
    body && type != 'formData' ?
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
        
      ): 
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }

  async componentDidMount() {
    await this.getToken();
    this.createNoteId = await this.apiCall({
      contentType: configJSON.contentType,
      method: configJSON.apiGetMethod,
      endPoint: configJSON.ApiallUsers, 
    })

  }

  async getToken() {
    let token: string | null = await AsyncStorage.getItem('LOGIN_TOKEN')
    if (token) {
      this.setState({ user_token: token })
    }
  };

 handleModalClose = ()=>{
  this.setState({openModal:false})
  this.setState({title:'',description:''})
}

  

 handleOnSubmit = async (title:string, description:string) => {
  this.postNoteId = await this.apiCall({    
    contentType:configJSON.contentType,
    method: configJSON.apiPostMethod,
    endPoint: configJSON.APIendPoint, // the endpoint is "bx_block_annotations/annotations"
    body:{
      "title":title,
      "description":description
    }
  })

  };

  handleEditModalClose = () => {
    this.setState({isEdit: false, title: "", description: "", editId: "", renderEditNote: false})
  }

  handleSubmit = () => {
    this.handleOnSubmit(this.state.title, this.state.description);
    this.handleModalClose();
  }

  handleOnChangeText = (text: string, valueFor: string) => {
    if (valueFor === 'title') this.setState({ title: text });
    if (valueFor === 'description') this.setState({ description: text });
  };


  handleNoteUpdate = async (_noteDetail: NoteArray, notes: NoteArray[]) => {
    
    this.patchNoteId = await this.apiCall({
      contentType:configJSON.contentType,
      method: configJSON.apiPATCHMethod,
      endPoint: configJSON.APIendPoint+"/"+`${this.state.editId}`,
      body:{
        "title":this.state.title,
        "description":this.state.description
      }
    })
    this.setState({title:'', description:'', editId: '', isEdit:false})

  }

  handleDelete = async (noteDetail: NoteArray, notes: NoteArray[]) => {
    let notesFinal: NoteArray[] = [];
    if (notes?.length>0) {
      notesFinal = notes
    }
    const newNotes = notesFinal.filter(resp => {
      if (resp.id !== noteDetail.id) {
        return resp
      }

    })
    this.deleteNoteId = await this.apiCall({
      contentType: configJSON.contentType,
      method: configJSON.apiDeleteMethod,
      endPoint: configJSON.APIendPoint + "/" + `${noteDetail.id}` // the endpoint is "bx_block_annotations/annotations"
    })

    this.setState({ notes: newNotes, isEdit: false, renderEditNote: false })

  }

  setIsEdit = (load: boolean) => {
    this.setState({ isEdit: load })
  }

  setRenderEditNote = (load: boolean) => {
    this.setState(({ renderEditNote: load }))
  }

  setNotes = (responseJson: AttachmentData[]) => {
    let notesArray: NoteArray[] = [];
    notesArray = responseJson.map((resp: AttachmentData) => {
      return ({ "id": resp.id, "title": resp.attributes.title, "description": resp.attributes.description })
    })
    this.setState({ notes: notesArray })
  }


  getNotes = async () => {
    this.createNoteId = await this.apiCall({
      contentType: configJSON.contentType,
      method: "GET",
      endPoint: configJSON.ApiallUsers, // the endpoint is "bx_block_annotations/annotations"

    })
  }

  handleNoteStateTrue = () => {
    this.setState({ openModal: true });
  }

  handleSetRenderEditNote = (item:NoteArray[]) => {
    this.setState({renderEditNote:true})
    this.setState({item:item})
  }

  handleEditPress = async (itemFromArray: NoteArray) => {
    this.setIsEdit(true)
    this.setState({ 
      isEdit: true, 
      editId: itemFromArray.id as string,  
      title: itemFromArray.title.toString(), 
      description: itemFromArray.description.toString() 
    })
  }
  // Customizable Area End
}
