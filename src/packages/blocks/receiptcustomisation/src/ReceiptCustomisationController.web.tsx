// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

interface FormValues {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  postal?: string;
  address?: string;
  logo?: string;
  documents?: string;
  images?: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  postal?: string;
  address?: string;
  logo?: string;
  documents?: string;
  images?: string;
}

export const configJSON = require("./config");

export interface Props {
  navigation: Function;
  id: string;
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  formData: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    postal: string;
    address: string;
  },
  isErrorFormData: FormErrors;
  logo: File | null;
  isLogoSelected: boolean;
  documents: Array<File>;
  images: Array<File>;
}

interface SS {
  id: number;
}

export default class ReceiptCustomisationController extends BlockComponent<
  Props,
  S,
  SS
> {
  receiptCustomisationApiCallId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      formData: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        city: "",
        postal: "",
        address: "",
      },
      isErrorFormData: {},
      logo: null,
      isLogoSelected: false,
      documents: [],
      images: [],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId && responseJson) {
        if (apiRequestCallId === this.receiptCustomisationApiCallId) {
          if (!responseJson.errors) {
            alert("Form Submitted Successfully!");
          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        }
      }
    }
  }

  handleChangeFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      formData: { ...this.state.formData, [event.target.name]: event.target.value }
    });
  }

  handleSelectLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null;
    if (event.target.files) {
      file = event.target.files[0];
    }
    this.setState({ logo: file, isLogoSelected: true });
  }

  handleDeleteLogo = () => {
    this.setState({ logo: null, isLogoSelected: false });
  }
  
  handleSelectDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files: File[] | null = null;
    if (event.target.files) {
      files = Array.from(event.target.files);
    }
    if(files) {
      this.setState({
        documents: [...this.state.documents, ...files]
      });
    }
  }

  handleDeleteDocument = (index: number) => {
    this.setState({
      documents: [...this.state.documents.slice(0, index), ...this.state.documents.slice(index+1)],
    });
  }

  handleSelectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let files: File[] | null = null;
    if (event.target.files) {
      files = Array.from(event.target.files);
    }
    if(files) {
      this.setState({
        images: [...this.state.images, ...files],
      });
    }
  }

  handleDeleteImage = (index: number) => {
    this.setState({
      images: [...this.state.images.slice(0, index), ...this.state.images.slice(index+1)],
    });
  }

  validateFormData = (values: FormValues) => {
    const errors: FormValues = {}
    const regexName = /^[A-Za-z]+$/;
    const regexEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const regexAddress = /^[#.0-9a-zA-Z\s,-]+$/;
    
    this.validateName(values, errors);
    
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    this.validatePhone(values, errors);
    
    if (!values.country) {
      errors.country = "Country is required!";
    } else if (!regexName.test(values.country)) {
      errors.country = "Please enter alphabetical characters!";
    }
    if (!values.state) {
      errors.state = "State is required!";
    } else if (!regexName.test(values.state)) {
      errors.state = "Please enter alphabetical characters!";
    }
    if (!values.city) {
      errors.city = "City is required!";
    } else if (!regexName.test(values.city)) {
      errors.city = "Please enter alphabetical characters!";
    }
    
    this.validatePostal(values, errors);
    
    if (!values.address) {
      errors.address = "Address is required!";
    } else if (!regexAddress.test(values.address)) {
      errors.address = "Please enter a valid address!";
    }
    if (!this.state.logo) {
      errors.logo = "Logo is required!";
    }
    if (this.state.documents.length === 0) {
      errors.documents = "Document is required!";
    }
    if (this.state.images.length === 0) {
      errors.images = "Image is required!";
    }
    return errors;
  };

  validateName = (values: FormValues, errors: FormValues) => {
    const regexName = /^[A-Za-z]+$/;
    if (!values.first_name) {
      errors.first_name = "Firstname is required!";
    } else if (!regexName.test(values.first_name)) {
      errors.first_name = "Please enter alphabetical characters!";
    }
    if (!values.last_name) {
      errors.last_name = "Lastname is required!";
    } else if (!regexName.test(values.last_name)) {
      errors.last_name = "Please enter alphabetical characters!";
    }
  }

  validatePhone = (values: FormValues, errors: FormValues) => {
    const regexNumbers = /^\d*$/;
    const regexPhone = /^\d{10}$/;
    if (!values.phone) {
      errors.phone = "Phone is required!";
    } else if (!regexNumbers.test(values.phone)) {
      errors.phone = "Please enter numeric values!";
    } else if (values.phone.length !== 10) {
      errors.phone = "Phone number should be 10 digits!";
    } else if (!regexPhone.test(values.phone)) {
      errors.phone = "Please enter a valid phone number!";
    }
    return errors;
  }

  validatePostal = (values: FormValues, errors: FormValues) => {
    const regexNumbers = /^\d*$/;
    if (!values.postal) {
      errors.postal = "Postal is required!";
    } else if (!regexNumbers.test(values.postal)) {
      errors.postal = "Please enter numeric values!";
    } else if (values.postal.length !== 6) {
      errors.postal = "Postal code should be 6 digits!";
    }
  }

  submitButton = () => {
    this.setState({ isErrorFormData: this.validateFormData(this.state.formData) }, 
      () => {
        if(Object.keys(this.state.isErrorFormData).length === 0) {
          this.receiptCustomisation();
          this.setState({
            formData: { ...this.state.formData, first_name: "", last_name: "", email: "", phone: "", country: "", state: "", city: "", postal: "", address: "" },
            logo: null,
            isLogoSelected: false,
            documents: [],
            images: [],
          });
        }
      }
    );
  }

  receiptCustomisation = () => {
    const header = {
      
    };

    let formdata = new FormData();
    formdata.append("receipt[first_name]", this.state.formData.first_name);
    formdata.append("receipt[last_name]", this.state.formData.last_name);
    formdata.append("receipt[address]", this.state.formData.address);
    formdata.append("receipt[email]", this.state.formData.email);
    formdata.append("receipt[country]", this.state.formData.country);
    formdata.append("receipt[postal]", this.state.formData.postal);
    formdata.append("receipt[phone]", this.state.formData.phone);
    if(this.state.logo !== null) {
      formdata.append("receipt[logo]", this.state.logo);
    }
    for(let document of this.state.documents) {
      formdata.append("receipt[documents][]", document);
    }
    formdata.append("receipt[state]", this.state.formData.state);
    formdata.append("receipt[city]", this.state.formData.city);
    for(let image of this.state.images) {
      formdata.append("receipt[images][]", image);
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.receiptCustomisationApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.receiptAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.receiptAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
}
// Customizable Area End
