// Customizable Area Start
import React from "react";

import {
  Box,
  Button,
  Input,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

import { Redirect } from "react-router-dom";

import SmsSettingsLoginController, {
  Props,
} from "./SmsSettingsLoginController.web";

export default class SmsSettingsLogin extends SmsSettingsLoginController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    if (this.props.credentials.isAuthenticated) {
      return <Redirect to="/SmsSettings" />;
    }

    let registerBox;
    if (this.state.isRegistering) {
      registerBox = (
        <Box sx={webStyle.formStyle}>
          <Button onClick={() => this.goBack()}>Go Back</Button>
          <Input
            data-test-id="username-register"
            name="username"
            type="text"
            value={this.state.registerData.username}
            onChange={(event) => this.handleRegisterChange(event)}
            placeholder="Username"
          />
          <Input
            data-test-id="email-register"
            name="email"
            type="email"
            value={this.state.registerData.email}
            onChange={(event) => this.handleRegisterChange(event)}
            placeholder="Email"
          />
          <Input
            data-test-id="password-register"
            name="password"
            type="password"
            value={this.state.registerData.password}
            onChange={(event) => this.handleRegisterChange(event)}
            placeholder="Password"
          />
          <Input
            data-test-id="passwordConfirm-register"
            name="passwordConfirm"
            type="password"
            value={this.state.registerData.passwordConfirm}
            onChange={(event) => this.handleRegisterChange(event)}
            placeholder="Re-Enter Password"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InputLabel>Select Role:</InputLabel>
            <Select
              data-test-id="role-register"
              id="role"
              name="role"
              value={this.state.registerData.role}
              label="role"
              onChange={(event) => this.handleRegisterChange(event)}
            >
              <MenuItem value={"user"}>User</MenuItem>
              <MenuItem value={"super_user"}>Super User</MenuItem>
            </Select>
          </Box>
          <Button
            data-test-id="submit-register"
            onClick={() => this.registerUser()}
          >
            Register
          </Button>
        </Box>
      );
    } else {
      registerBox = (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            data-test-id="register"
            style={{ ...webStyle.buttonStyle, fontWeight: "bold" }}
            onClick={() => this.toRegister()}
          >
            Registration
          </Button>
          <Button
            data-test-id="loginuser"
            style={{ ...webStyle.buttonStyle, fontWeight: "bold" }}
            onClick={() => this.loginAsUser()}
          >
            Login as User
          </Button>
          <Button
            data-test-id="loginadmin"
            style={{ ...webStyle.buttonStyle, fontWeight: "bold" }}
            onClick={() => this.loginAsUser()}
          >
            Login as Admin
          </Button>
        </Box>
      );
    }

    return (
      <Box sx={webStyle.mainWrapper}>
        {this.state.loginUser ? (
          <Box sx={webStyle.formStyle}>
            <Button data-test-id="goback" onClick={() => this.goBack()}>
              Go Back
            </Button>
            <Input
              data-test-id="email-login"
              name="email"
              type="text"
              value={this.state.userEmail}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => this.setUserEmail(event.target.value)}
              placeholder="Email"
            />
            <Input
              data-test-id="password-login"
              name="password"
              type="password"
              value={this.state.userPassword}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => this.setUserPassword(event.target.value)}
              placeholder="Password"
            />
            <Button
              data-test-id="email-login-btn"
              onClick={() => this.loginUser()}
            >
              Login
            </Button>
          </Box>
        ) : (
          registerBox
        )}
      </Box>
    );
  }
}

const webStyle = {
  mainWrapper: {
    display: "flex",
    height: "80vh",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    justifyContent: "center",
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
    color: "white",
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

// Customizable Area End
