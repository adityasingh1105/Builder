import React from "react";

// Customizable Area Start
import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton,
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
// Customizable Area End

import TranslationController, {
  Props,
  configJSON,
} from "./TranslationController";

export default class Translation extends TranslationController {
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <Typography variant="h6">{configJSON.labelTitleText}</Typography>
            <Typography variant="subtitle1" component="div">
              {configJSON.labelBodyText}
            </Typography>
            <InputLabel style={{ marginTop: 20 }} id="service-shop-name">
              Please Select from language :
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.fromLang}
              label="Age"
              onChange={this.handleChangeFrom}
            >
              {this.state.languages.map((item) => (
                <MenuItem value={item.code}>
                  {item.name + "  -  " + item.code}
                </MenuItem>
              ))}
            </Select>
            <InputLabel style={{ marginTop: 20 }} id="service-shop-name">
              Please Select to language :
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.toLang}
              label="Age"
              onChange={this.handleChangeTo}
            >
              {this.state.languages.map((item) => (
                <MenuItem value={item.code}>
                  {item.name + "  -  " + item.code}
                </MenuItem>
              ))}
            </Select>
            <Box sx={webStyle.inputStyle}>
              <Input
                data-test-id={"txtInput"}
                type={"text"}
                placeholder={configJSON.txtInputPlaceholder}
                fullWidth={true}
                disableUnderline={true}
                value={this.state.txtInputValue}
                onChange={(e) => this.setInputValue(e.target.value)}
              />
            </Box>
            <Box
              data-test-id="btnAddExample"
              onClick={() => this.translateTextWeb()}
              component="button"
              sx={webStyle.buttonStyle}
            >
              <Button
                data-test-id={"btnTranslate"}
                disabled={this.state.txtInputValue != "" ? false : true}
                color={"primary"}
              >
                {configJSON.btnExampleTitle}
              </Button>
            </Box>
            <InputLabel style={{ marginTop: 20 }} id="service-shop-name">
              Converted Text: {this.state.convertedText}
            </InputLabel>
          </Box>
        </Container>
      </ThemeProvider>
    );
    // Customizable Area End
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
  inputStyle: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "50px",
    display: "flex",
    flexDirection: "column",
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
