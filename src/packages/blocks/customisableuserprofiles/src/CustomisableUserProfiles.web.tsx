import React from "react";
// Customizable Area Start
import {
  Container,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  TextField,
  FormControl,
  FormLabel
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// Customizable Area End

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff"
    }
  }
});

import CustomisableUserProfilesController, {
  Props,
  IField
} from "./CustomisableUserProfilesController";
// Customizable Area End

export default class CustomisableUserProfiles extends CustomisableUserProfilesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  getFieldType = (field: IField) => {
    if (
      field.field_type === "integer" ||
      field.field_type === "number" ||
      field.field_type === "float"
    )
      return "number";
    return "text";
  };

  renderField = (field: IField, index: number) => {
    if (
      field.field_type === "text" ||
      field.field_type === "string" ||
      field.field_type === "file" ||
      field.field_type === "textarea" ||
      field.field_type === "number" ||
      field.field_type === "integer" ||
      field.field_type === "float"
    )
      return (
        <div key={index + "renderField"}>
          <TextField
            data-test-id={field.name}
            label={field.title}
            multiline={field.field_type === "textarea"}
            value={this.state.profile[field.name]}
            onChange={(event) =>
              this.changeFormValue(field.name, event.target.value, field.field_type)
            }
            disabled={!field.is_enable}
            required={field.is_required}
            type={this.getFieldType(field)}
            onKeyPress={(event) => this.onKeyPress(event, field)}
            InputLabelProps={{
              shrink: true
            }}
            // defaultValue='Enter Value'
          />
        </div>
      );

    if (field.field_type === "date" || field.field_type === "datetime")
      return (
        <div key={index + "renderField"}>
          <div style={{ color: "rgba(0, 0, 0, 0.54)" }}>
            {field.title + (field.is_required ? "*" : "")}
          </div>
          <div style={{ marginBottom: "5px", marginTop: "5px" }}>
            <DatePicker
              data-test-id={field.name}
              selected={
                new Date(this.state.profile[field.name] as string).toString() !== "Invalid Date"
                  ? new Date(this.state.profile[field.name] as string)
                  : null
              }
              onChange={(date:Date) => this.changeFormValue(field.name, date, field.field_type)}
              disabled={!field.is_enable}
              required={field.is_required}
            />
          </div>
        </div>
      );

    if (field.field_type === "checkbox")
      return (
        <div key={index + "renderField"}>
          <Checkbox
            data-test-id={field.name}
            disabled={!field.is_enable}
            checked={this.state.profile[field.name] as boolean}
            onChange={(event) =>
              this.changeFormValue(field.name, event.target.checked, field.field_type)
            }
            color='primary'
          />
          {field.title}
        </div>
      );
    if (field.field_type === "boolean")
      return (
        <div key={index + "renderField"}>
          <FormControl>
            <FormLabel>{field.title}</FormLabel>
            <RadioGroup
              row
              data-test-id={field.name}
              onChange={(event) => {
                this.changeFormValue(field.name, event.target.value, field.field_type);
              }}
              value={
                this.state.profile[field.name] === undefined
                  ? undefined
                  : String(this.state.profile[field.name])
              }
            >
              <FormControlLabel value={"true"} control={<Radio />} label='True' />
              <FormControlLabel value={"false"} control={<Radio />} label='False' />
            </RadioGroup>
          </FormControl>
        </div>
      );
  };

  render() {
    // Customizable Area Start
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth='md'>
          {/* Customizable Area Start */}
          {this.state.fields.map((element, index) => this.renderField(element, index))}
          <div style={{ marginTop: "20px" }}>
            <Button
              data-test-id={"cancelButton"}
              style={{ marginRight: "10px" }}
              color='secondary'
              variant='outlined'
              onClick={this.cancelChanges}
              disabled={!this.state.cancelEnabled}
            >
              Cancel
            </Button>
            <Button
              data-test-id={"saveButton"}
              variant='outlined'
              color='primary'
              onClick={this.updateCustomizableProfile}
              disabled={!this.state.saveEnabled}
            >
              Save
            </Button>
          </div>

          {/* Customizable End Start */}
        </Container>
      </ThemeProvider>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start

// Customizable Area End
