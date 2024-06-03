// Customizable Area Start
import React from "react";

import {
  Container,
  Box,
  Button,
  InputLabel,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";

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

import LanguageDetectionController, {
  Props,
  configJSON,
} from "./LanguageDetectionController";
import { Modal } from "react-native";
import Loader from "../../../components/src/Loader";

export default class LanguageDetection extends LanguageDetectionController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <Typography variant="h6">{configJSON.labelTitleText}</Typography>
            <Typography variant="subtitle1" component="div">
              {configJSON.labelBodyText} {this.state.selectedLanguage.name}
            </Typography>
            <Box sx={webStyle.inputStyle}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  data-test-id="language-select"
                  value={this.state.selectedLanguage.abbreviation}
                  label="Language"
                  onChange={(event) => {
                    this.handleLanguageChange(String(event.target.value));
                  }}>
                  {this.state.languages.map((language) => {
                    return (
                      <MenuItem
                        key={`language-${language.id}`}
                        value={language.attributes.abbreviation}>
                        {language.attributes.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            {/* <Box
              data-test-id="btnUpdate"
              onClick={() => this.doButtonPressed(this.state.selectedLanguage)}
              component="button"
              sx={webStyle.buttonStyle}>
              <Button color={"primary"}>{configJSON.btnExampleTitle}</Button>
            </Box> */}
          </Box>
        </Container>
        <Modal visible={this.state.loader}>
          <Loader loading={this.state.loader} />
        </Modal>
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
