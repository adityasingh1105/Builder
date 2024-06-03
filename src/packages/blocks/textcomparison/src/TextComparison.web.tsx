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
  Switch,
  TextField,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
// Customizable Area End

import TextComparisonController, {
  Props,
  configJSON,
} from "./TextComparisonController";

export default class TextComparison extends TextComparisonController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
  render() {
    // Customizable Area Start
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <TextField
              data-test-id="txtLeft"
              value={this.state.firstString}
              onChange={(e) => this.setState({ firstString: e.target.value })}
              multiline={true}
              minRows={5}
              fullWidth
              variant="outlined"
              style={{ marginTop: 50 }}
            />
            <TextField
              data-test-id="txtRight"
              value={this.state.secondString}
              onChange={(e) => this.setState({ secondString: e.target.value })}
              multiline={true}
              minRows={5}
              fullWidth
              variant="outlined"
              style={{ marginTop: 50 }}
            />

            <Typography variant="h6" color="inherit">
              <pre>
                {this.state.result.map((item: any, index: number) => {
                  return (
                    <span
                      key={index}
                      style={{
                        backgroundColor: item?.added
                          ? "#90EE90"
                          : item?.removed
                          ? "#FFCCCB"
                          : "#FFF",
                      }}
                    >
                      {item?.value}
                    </span>
                  );
                })}
              </pre>
            </Typography>

            <Typography variant="h6">Added: {this.state.added}</Typography>
            <Typography variant="h6">Remove: {this.state.removed}</Typography>
          </Box>
        </Container>
      </ThemeProvider>

      // Customizable Area End
    );
  }
}

// Customizable Area Start
const theme = createTheme({
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",

    height: "100vh",
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
