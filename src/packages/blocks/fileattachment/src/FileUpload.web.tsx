import React from "react";

// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  Container,
  Box,
  Button,
  Select,
  MenuItem,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";
import PreviewModal from "./Preview";
// Customizable Area End

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

import FileUploadController, {
  Props,
  configJSON,
  DocumentExtensions,
} from "./FileUploadController.web";

export default class FileUpload extends FileUploadController {
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
            <div
              data-test-id="scrollView"
              style={webStyle.container}
              className="container">
              <div>
                <div data-test-id="desc">Description</div>
                <input
                  data-test-id={"descInput"}
                  type="text"
                  value={this.state.descInputValue}
                  placeholder={configJSON.descriptionTextInputPlaceHolder}
                  style={webStyle.bgMobileInput}
                  {...this.descInputWebProps}
                />
              </div>

              <div data-test-id="container">
                <div>Tag</div>
                <input
                  data-test-id={"tagInput"}
                  type="text"
                  value={this.state.tagInputValue}
                  placeholder={configJSON.tagTextInputPlaceholder}
                  style={webStyle.bgMobileInput}
                  {...this.tagInputWebProps}
                />
              </div>

              <div>
                <span style={{ marginRight: 16 }}>Select file type</span>
                <Select
                  data-test-id={"fileTypePicker"}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.selectedDocumentType}
                  label="Age"
                  {...this.pickerProps}>
                  <MenuItem value={"doc"}>
                    {configJSON.pickerDocTypeLabel}
                  </MenuItem>
                  <MenuItem value={"jpg"}>
                    {configJSON.pickerImagesTypeLabel}
                  </MenuItem>
                  <MenuItem value={"pdf"}>
                    {configJSON.pickerPDFTypeLabel}
                  </MenuItem>
                  <MenuItem value={"mp3"}>
                    {configJSON.pickerAudioTypeLabel}
                  </MenuItem>
                  <MenuItem value={"mp4"}>
                    {configJSON.pickerVideoTypeLabel}
                  </MenuItem>
                </Select>
              </div>
              <div style={{ marginTop: 16 }}>
                <input
                  style={{ display: "none" }}
                  ref={this.handleFileInputRef}
                  type={"file"}
                  onChange={(event) => {
                    this.handleUploadInputChange(event);
                  }}
                  accept={DocumentExtensions[
                    this.state.selectedDocumentType
                  ].reduce(
                    (previous, current, index) =>
                      previous + (index !== 0 ? "," : "") + current,
                    "",
                  )}
                  data-test-id="fileAttach"
                />
                <Button
                  style={webStyle.buttonContainer}
                  data-test-id={"chooseFileBtn"}
                  onClick={this.handleChooseFileClick}>
                  Choose File
                </Button>
                <div>
                  {this.state.file ? (this.state.file as File).name : ""}
                </div>
              </div>
              <Button
                style={webStyle.buttonContainer}
                data-test-id={"viewUploadBtn"}
                onClick={this.handleViewModal}>
                View
              </Button>
              <Button
                disabled={this.state.isUploading}
                style={webStyle.buttonContainer}
                data-test-id={"sendButton"}
                onClick={() => {
                  const isEdit = localStorage.getItem("isEdit");
                  this.fileUploadUpdate(!!isEdit);
                }}>
                {!this.state.isUploading ? "Send" : "Loading"}
              </Button>
            </div>
          </Box>
          <PreviewModal
            src={this.state.previewModalSrc}
            mimeType={this.state.previewModalMimeType}
            visible={this.state.previewModalVisible}
            onClose={this.handleViewModalClose}
          />
        </Container>
      </ThemeProvider>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyle = {
  container: {
    display: "flex",
    width: " 100%",
    height: "100%",
    justifyContent: "center",
    flexDirection: "column" as const,
  },
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  buttonView: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200EE",
    color: "white",
  },
  buttonText: { color: "white", fontSize: 15 },
  bgMobileInput: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200EE",
    display: "flex",
    width: 120,
    color: "white",
    marginTop: 16,
  },
};
// Customizable Area End
