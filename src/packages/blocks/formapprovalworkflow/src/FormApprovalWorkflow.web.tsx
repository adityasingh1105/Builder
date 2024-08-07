// Customizable Area Start
//@ts-nocheck
import React from "react";

import {
  Box,
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
} from "./FormApprovalWorkflowController.web";

export default class FormApprovalWorkflow extends FormApprovalWorkflowController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
      <Box>
        
         <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      />
      </Box>
    );
  }
}


// Customizable Area End
