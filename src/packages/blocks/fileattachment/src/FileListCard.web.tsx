import React from "react";

// Customizable Area Start
import {
  Button,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";
// Customizable Area End

import FileListCardController, { Props } from "./FileListCardController.web";

export default class FileListCard extends FileListCardController {
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
      <div data-test-id="container" style={styles.fileCard}>
        <div>
          <span>{this.props.data.attributes.name} </span>
        </div>
        <div style={styles.rowSpaceEvenly}>
          <Button
            data-test-id="viewButton"
            style={styles.downlaod}
            {...this.viewButtonProps}>
            <span style={styles.buttonText}>View</span>
          </Button>

          <Button
            data-test-id="downloadButton"
            style={styles.downlaod}
            {...this.downloadButtonProps}>
            <span style={styles.buttonText}>Download</span>
          </Button>

          <Button
            data-test-id="deleteButton"
            style={styles.downlaod}
            {...this.deleteFileButtonProps}>
            <span style={styles.buttonText}>Delete</span>
          </Button>

          <Button
            data-test-id="editButton"
            style={styles.downlaod}
            {...this.editFileButtonProps}>
            <span style={styles.buttonText}>Edit</span>
          </Button>
        </div>
      </div>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = {
  rowSpaceEvenly: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  fileCard: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "95%",
    borderRadius: 8,
    backgroundColor: "grey",
    padding: 8,
    marginBottom: 10,
  },
  downlaod: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200EE",
    display: "flex",
    width: 120,
    marginRight: 10,
  },
  buttonText: { color: "white", fontSize: 15 },
};
// Customizable Area End
