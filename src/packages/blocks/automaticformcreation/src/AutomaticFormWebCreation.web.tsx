import React from "react";

import {
  // Customizable Area Start
  Container,
  Box,
  Button,
  Typography,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
// import { CheckboxField, DatePickerField, TextInputField, TimePickerField } from "../../../components/src/AutomaticFields.web";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

import AutomaticFormWebCreationController, {
  Props,
  configJSON,
} from "./AutomaticFormWebCreationController.web";
// import { FieldName } from "../../../components/src/AutomaticMobileFields";
// Customizable Area End




export default class AutomaticFormWebCreation extends AutomaticFormWebCreationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start


  
  renderInputType =(type: string,name: string)=>{
    switch(type){
     case "text":
//      case "string":
//   return <TextInputField field_type={"text"} field_name={name} handleInputChange={this.onNewChangeValues} />
//   case "integer":
//    case "float":
//    return <TextInputField field_type={type} field_name={name}  handleInputChange={this.onNewChangeValues} />
//  case "date":
//    return <DatePickerField field_name={name}  handleInputChange={this.onNewChangeValues} />
//    case "time":
//    return <TimePickerField field_name={name} handleInputChange={this.onNewChangeValues} />
//    case "boolean":
//     return <CheckboxField field_name={name} handleInputChange={this.onNewChangeValues} />
 }
   }
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            {/* <Typography variant="h6"> {this.state.automaticData?.attributes?.name ?? ''}</Typography>
            <Typography variant="subtitle1" component="div">
              {this.state.automaticData?.attributes?.description ?? ''}
            </Typography>
           {this.state.automaticData?.attributes?.field_name.map((item:FieldName,index:number)=> { 
return <Box key={index} sx={(item.field_type ?? "text") != "boolean" ? webStyle.dynamicInputStyle : webStyle.checkboxInputStyle}>

{(item.field_type ?? "text") != "boolean" && <Typography variant="subtitle1" component="div">
              {item.field_name ?? ""}
            </Typography>}
                {this.renderInputType(item.field_type ?? "text",item.field_name ?? "")}
              </Box>
           }) }
            <Box
              data-test-id="btnAddExample"
              onClick={()=> this.doButtonPressed()}
              component="button"
              sx={webStyle.buttonStyle}
            >
              <Button color={"primary"}>{configJSON.btnExampleTitle}</Button>
            </Box> */}
          </Box>
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  dynamicInputStyle: {
    width: "100%",
    height: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  checkboxInputStyle: {
    width: "100%",
    height: "40px",
    marginLeft: "-10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },
};
// Customizable Area End