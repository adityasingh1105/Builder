// Customizable Area Start
import React from "react";
import {
  Container,
  Box,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Route, Switch, Redirect } from "react-router-dom";
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

import SmsSettingsController, { Props } from "./SmsSettingsController.web";
import SmsSettingsLogin from "./SmsSettingsLogin.web";
import SmsSettingsAdmin from "./SmsSettingsAdmin.web";
import SmsSettingsUser from "./SmsSettingsUser.web";

export default class SmsSettings extends SmsSettingsController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <Switch>
              <Route
                exact
                path="/SmsSettings"
                render={() => {
                  if (this.state.isUserAuthenticated) {
                    if (this.state.isAdmin) {
                      return <Redirect to="/SmsSettings/admin" />;
                    } else {
                      return <Redirect to="/SmsSettings/user" />;
                    }
                  } else {
                    return <Redirect to="/SmsSettings/credentials" />;
                  }
                }}
              />
              <Route
                exact
                path={"/SmsSettings/credentials"}
                render={() => (
                  <SmsSettingsLogin
                    credentials={{
                      isAuthenticated: this.state.isUserAuthenticated,
                      isAdmin: this.state.isAdmin,
                      setAuth: (
                        isAdmin: boolean,
                        user: string,
                        token: string,
                        userId: number
                      ) => this.setAuthLogin(isAdmin, user, token, userId),
                    }}
                  />
                )}
              />
              <Route
                exact
                path={"/SmsSettings/admin"}
                render={() => (
                  <SmsSettingsAdmin
                    isAuthenticated={this.state.isUserAuthenticated}
                    credentials={{
                      token: this.state.currentToken,
                      user: this.state.currentUser,
                    }}
                  />
                )}
              />
              <Route
                exact
                path={"/SmsSettings/user"}
                render={() => (
                  <SmsSettingsUser
                    credentials={{
                      token: this.state.currentToken,
                      user: this.state.currentUser,
                      id: this.state.currentId,
                    }}
                    isAuthenticated={this.state.isUserAuthenticated}
                  />
                )}
              />
            </Switch>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}
const webStyle = {
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },
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
};

// Customizable Area End
