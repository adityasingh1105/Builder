import React from "react";

import {
  Container,
  Box,
  Button,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import FileListCard from "./FileListCard.web";
import PreviewModal from "./Preview";
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

import FileAttachmentListController, {
  Props,
} from "./FileAttachmentListController.web";

export default class FileAttachmentList extends FileAttachmentListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={styles.mainWrapper}>
            <div data-test-id={"container"} style={styles.container}>
              {this.state.uploadedFileList.map((item, index) => {
                return (
                  <div key={index}>
                    <FileListCard
                      data-test-id={"fileListCard"}
                      data={item}
                      token={this.state.token}
                      navigation={this.props.navigation}
                      refresh={this.getFileList}
                      onClick={() => this.handlePreviewModalOpen(item)}
                    />
                  </div>
                );
              })}
              <div>
                <Button
                  data-test-id="navTo"
                  style={styles.download}
                  {...this.navfileAttachBtnExampleProps}>
                  Add new file
                </Button>
              </div>
            </div>
          </Box>
          <PreviewModal
            data-test-id={"previewModal"}
            src={this.state.previewModalSrc}
            mimeType={this.state.previewModalMimeType}
            visible={this.state.previewModalVisible}
            onClose={this.handleModalClose}
          />
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = {
  container: {
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  download: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200EE",
    color: "white",
    width: "100%",
  },
};
// Customizable Area End
