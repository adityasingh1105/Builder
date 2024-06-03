// Customizable Area Start
import React from "react";

import {
  Box,
  Switch,
  Input,
  Button,
} from "@material-ui/core";

import { Redirect } from "react-router-dom";
import Delete from "@material-ui/icons/Delete";

import SmsSettingsAdminController, {
  Props,
} from "./SmsSettingsAdminController.web";

export default class SmsSettingsAdmin extends SmsSettingsAdminController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    if (!this.props.isAuthenticated) return <Redirect to="/SmsSettings" />;
    return (
      <Box sx={webStyle.mainWrapper}>
        <Input
          data-test-id="add-setting-input-test"
          name="addsetting"
          value={this.state.txtInputValue}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => this.setInputValue(event.target.value)}
          placeholder="Add an SMS Setting"
        />
        <Button
          data-test-id="add-setting-btn-test"
          style={webStyle.buttonStyle}
          onClick={() => this.submitSetting(this.state.txtInputValue)}
        >
          Add Setting
        </Button>
        {this.state.settings.map((setting, parentIndex: number) => {
          return (
            <Box
              key={`${setting.id}-${setting.attributes.title}`}
              sx={webStyle.settingsWrapper}
            >
              <Button
                data-test-id="setting-delete"
                style={{
                  position: "absolute",
                  right: 25,
                  top: 7,
                  border: "none",
                  background: "transparent",
                }}
                onClick={() => this.deleteSetting(setting.id)}
              >
                <Delete />
              </Button>
              <Box sx={webStyle.settingStyle}>
                <p>
                  {setting.attributes.title
                    .slice(0, 1)
                    .toUpperCase()
                    .concat(setting.attributes.title.slice(1))}
                </p>
                <Switch
                  data-test-id="change-setting-btn-test"
                  checked={setting.attributes.togle}
                  onChange={() =>
                    this.handleSettingChange(parentIndex, setting.id)
                  }
                />
              </Box>
              <Box sx={webStyle.addSubSettingInputStyle}>
                <input
                  data-test-id="input-subsetting-test"
                  name="addsubsetting"
                  value={this.state.txtSubInputValue[parentIndex]}
                  onChange={(
                    event: React.ChangeEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  ) => this.setSubInputValue(event.target.value, parentIndex)}
                  placeholder="Add a Sub Setting here"
                />
                <Button
                  data-test-id="btn-subsetting-test"
                  onClick={() =>
                    this.submitSubSetting(
                      this.state.txtSubInputValue[parentIndex],
                      setting.id
                    )
                  }
                >
                  Add SubSetting
                </Button>
              </Box>
              {setting.attributes.subsetting.map((subSetting, subIndex) => {
                return (
                  <Box
                    key={`${subSetting.id}-${subSetting.title}`}
                    sx={webStyle.subSettingsStyle}
                  >
                    <Button
                      data-test-id="subsetting-delete"
                      style={{
                        position: "absolute",
                        left: -45,
                        top: 7.5,
                        border: "none",
                        background: "transparent",
                      }}
                      onClick={() => this.deleteSetting(String(subSetting.id))}
                    >
                      <Delete />
                    </Button>
                    <p>
                      {subSetting.title
                        .slice(0, 1)
                        .toUpperCase()
                        .concat(subSetting.title.slice(1))}
                    </p>
                    <Switch
                      data-test-id="change-subsetting-btn-test"
                      checked={subSetting.togle}
                      onChange={() =>
                        this.handleSubSettingChange(
                          parentIndex,
                          subIndex,
                          subSetting.id
                        )
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
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    width: "100%",
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
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },
  settingsWrapper: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    width: "100%",
    minHeight: "10vh",
    borderRadius: "1em",
    border: "1px solid gray",
    padding: "2em 1em 1em 1em",
    margin: "1em 0",
  },
  settingStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subSettingsStyle: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "2em",
  },
  addSubSettingInputStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "2em",
  },
};

// Customizable Area End
