// Customizable Area Start
import React from "react";

import {
  Box,
  Switch,
} from "@material-ui/core";

import { Redirect } from "react-router-dom";

import SmsSettingsUserController, {
  Props,
} from "./SmsSettingsUserController.web";

export default class SmsSettingsUser extends SmsSettingsUserController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    if (!this.props.isAuthenticated) return <Redirect to="/SmsSettings" />;
    return (
      <Box sx={webStyle.mainWrapper}>
        {this.state.currentUserSetting.map((setting, parentIndex: number) => {
          return (
            <Box
              key={`setting-${setting.id}-${parentIndex}`}
              sx={webStyle.settingsWrapper}
            >
              <Box sx={webStyle.settingStyle}>
                <p>
                  {setting.attributes.title
                    .slice(0, 1)
                    .toUpperCase()
                    .concat(setting.attributes.title.slice(1))}
                </p>
                <Switch
                  data-test-id="setting-change-test"
                  checked={setting.attributes.togle}
                  onChange={() =>
                    this.handleSettingChange({
                      settingId: setting.id,
                      togle: setting.attributes.togle,
                    })
                  }
                />
              </Box>
              {setting.attributes.subsettings.map((subSetting, subIndex) => {
                return (
                  <Box
                    key={`subsetting-${subSetting.id}-${subIndex}`}
                    sx={webStyle.subSettingsStyle}
                  >
                    <p>
                      {subSetting.title
                        .slice(0, 1)
                        .toUpperCase()
                        .concat(subSetting.title.slice(1))}
                    </p>
                    <Switch
                      data-test-id="subsetting-change-test"
                      checked={subSetting.togle}
                      onChange={() =>
                        this.handleSettingChange({
                          settingId: subSetting.id,
                          togle: subSetting.togle,
                        })
                      }
                      disabled={!setting.attributes.togle}
                    />
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
    );
  }
}

const webStyle = {
  mainWrapper: {
    display: "flex",
    width: "100%",
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
    height: "45px",
    color: "white",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },
  settingsWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "10vh",
    border: "1px solid gray",
    borderRadius: "1em",
    margin: "1em 0",
    padding: "1em",
  },
  settingStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subSettingsStyle: {
    display: "flex",
    marginLeft: "2em",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

// Customizable Area End
