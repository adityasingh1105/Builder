import React from "react";

import {
  Container,
  Box,
  CircularProgress,
  // Customizable Area Start
  Typography,
  Snackbar,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { scaledSize } from "../../../framework/src/Utilities";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

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

import TimeclockController, { Props, configJSON } from "./TimeclockController";

export default class Timeclock extends TimeclockController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const startGameButton = (
      <Box
        sx={webStyle.buttonStyle}
        data-test-id="startGameButton"
        onClick={() => this.onStartGame()}
        component="button"
        color={"primary"}
      >
        <Box sx={webStyle.startGameButtonText}>
          {configJSON.timerButtonLabel}
        </Box>
      </Box>
    );

    const startGameContainer = (
      <>
        <Box sx={webStyle.startGameContainer}>
          <Box sx={webStyle.startGameTimeTextView}>
            <Box sx={webStyle.startGameTimeText}>
              {this.convertHHMMSS(this.state.gameTime)}
            </Box>
          </Box>
        </Box>
        <>
          <Box
            sx={webStyle.buttonStyle}
            onClick={() => this.onFinishGame()}
            component="button"
            data-test-id="finishGameButton"
          >
            <Box sx={webStyle.startGameButtonText}>
              {configJSON.finishButtonLabel}
            </Box>
          </Box>
        </>
      </>
    );
    const startGameScreenView = () => {
      if (this.state.dataLoading) {
        return (
          <Box sx={webStyle.loadingContainer}>
            {configJSON.loaderMessage} &nbsp;{" "}
            <CircularProgress size="15" color="secondary" />
          </Box>
        );
      } else {
        if (this.state.isStartGame) {
          return startGameContainer;
        } else {
          return startGameButton;
        }
      }
    };

    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <Typography variant="h6">{configJSON.labelTitleText}</Typography>
          </Box>
          <Box sx={webStyle.mainWrapper}>{startGameScreenView()}</Box>
        </Container>

        {this.state.gameMessage && (
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            style={webStyle.anchorOriginTopCenter}
            open={this.state.alertType}
            onClose={() => this.onCloseMessage()}
            autoHideDuration={3500}
          >
            <Alert severity="info">{this.state.gameMessage}</Alert>
          </Snackbar>
        )}
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
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  startGameButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  anchorOriginTopCenter: {
    marginTop: "45px",
  },
  startGameButton: {
    paddingHorizontal: scaledSize(10),
    paddingVertical: scaledSize(10),
    backgroundColor: "#2a9df4",
    borderRadius: scaledSize(10),
  },
  startGameButtonText: {
    fontSize: scaledSize(17.5),
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  startGameContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  startGameTimeTextView: {
    marginTop: "40px",
    marginVertical: scaledSize(20),
  },
  startGameTimeText: {
    alignSelf: "center",
    fontSize: scaledSize(30),
    color: "#2a9df4",
    textAlign: "center",
    fontWeight: "bold",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
};
// Customizable Area End
