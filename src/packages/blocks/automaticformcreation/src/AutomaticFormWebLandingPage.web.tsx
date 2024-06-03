import React from "react";

import {
  // Customizable Area Start
  Container,
  Box,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start

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

// import { AutomaticField } from "../../../components/src/AutomaticMobileFields";
import AutomaticFormWebLandingPageController , {
    Props,
  } from "./AutomaticFormWebLandingPageController.web";
// import DataContext from "../../../components/src/DataContext";
// Customizable Area End


export default class AutomaticFormWebLandingPage extends AutomaticFormWebLandingPageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // static contextType: React.Context<AutomaticField> = DataContext;
  
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
           {/* {this.state.formData.map((item:AutomaticField,index:number)=> {
return <div style={{border: '1px solid black',width:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',
marginBottom:10,marginTop:10,borderRadius:10,padding:10,paddingTop:0,cursor:'pointer'
}} onClick={()=> this.handleOnClick(item)} key={index} >
<h5 style={{marginBottom:5,fontWeight:'bold',fontSize:16}}>{`Form ${index + 1}`}</h5>
<h5 style={{marginBottom:5,fontSize:15}}> Title:- {item.attributes?.name ?? ''}</h5>
            <h6 style={{fontSize:14,marginBottom:5}}>
              Description:- {item.attributes?.description ?? ''}
            </h6>
              </div>
           }) } */}

           {/* {this.state.formData.length == 0 && <h1>No forms found</h1>} */}
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
  formsWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: "10px",
    marginTop: "10px",
    borderWidth: '1px',
    borderColor: '#702290'
  },
 
};
// Customizable Area End