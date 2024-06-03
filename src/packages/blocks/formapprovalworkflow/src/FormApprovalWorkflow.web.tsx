// Customizable Area Start
//@ts-nocheck
import React from "react";

import {
  Container,
  Grid
} from "@material-ui/core";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Select from 'react-select';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

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

import FormApprovalWorkflowController, {
  Props,
  configJSON,
} from "./FormApprovalWorkflowController.web" ;

export default class FormApprovalWorkflow extends FormApprovalWorkflowController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
      <ThemeProvider theme={theme}>
        <h2 style={{textAlign:"center"}} >Search Destination</h2>
        <Container maxWidth="md" style={{padding:"20px"}} >
         <Grid container spacing={4}>
          <Grid md={12} xs={12} item>
<Select className="pickup-dropdown" value={this.state.currentLocation} onFocus={this.getCurrentLocation} />
          </Grid>
          <Grid md={12} xs={12} item>


    <GooglePlacesAutocomplete
    data-test-id="destination-dropdown"
     styles={{
      container: {
          flex: 1,

      },
      description: {
          color: '#000',
          fontSize: 16,
      },
      predefinedPlacesDescription: {
          color: '#3caf50',
      },
  }}
  selectProps={{
    onChange: (data)=> this.handleGetDestinationList(data),
  }}   
    placeholder='Enter Destination'
  minLength={2} // minimum length of text to search
  autoFocus={true}
  returnKeyType={'search'} // Can be left out for default return key 
  listViewDisplayed={false}    // true/false/undefined
  fetchDetails={true}
      apiKey="AIzaSyD24Z2ObJBO-bVH33RyS2Dlj5Ht6SsfqIo"
      nearbyPlacesAPI='GooglePlacesSearch'
      debounce={300}
    />
       
          </Grid>
         </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}

const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  inputStyle: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
