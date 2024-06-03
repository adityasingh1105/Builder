import React from "react";
import { Redirect } from "react-router-dom";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import {
  Container,
  Box,
  Button,
  Typography,
  TextField,
  // Customizable Area Start
  Modal,
  // Customizable Area End
} from "@material-ui/core";
// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      contrastText: "#000",
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

import AnnotationsController, {
  Props,
  configJSON,
  NoteArray,
} from "./AnnotationsController";

export default class Annotations extends AnnotationsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderEditNote = (noteDetail: NoteArray) => {
    const {isEdit, notes, title, description } = this.state;
    return (
      <Modal open={isEdit}>
        <Box sx={webStyle.modalBody}>
          <Box sx={webStyle.modalContent}>
            <Typography variant="h6">Edit Text</Typography>
            <Box sx={webStyle.modalInput}>
              <TextField
                value={title}
                onChange={event => this.handleOnChangeText(event.target.value, 'title')}
                placeholder='Title'
                data-test-id="editTitleInput"
                style={webStyle.w100}
              />
              <TextField
                value={description}
                multiline
                placeholder='Note'
                style={webStyle.w100}
                onChange={event => this.handleOnChangeText(event.target.value, 'description')}
                data-test-id="editDescInput"
              />
            </Box>
            <Box sx={webStyle.modalFooter}>
              <Button 
                style={webStyle.buttonStyle} 
                onClick={() => this.handleNoteUpdate(noteDetail, notes)}
                data-test-id="btnEditSubmit"
              >
                {configJSON.btnSave}
              </Button>
              <Button 
                style={webStyle.buttonStyle} 
                onClick={() => { this.handleEditModalClose() }}
                data-test-id="btnEditCancel"
              >
                {configJSON.btnCancel}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  }

  renderNoteList = (noteDetail: NoteArray) => {
    const { title, description } = noteDetail;
    const { renderEditNote, notes } = this.state;
    return (
      <Box sx={webStyle.mainCard} data-test-id="renderedReason">
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
          {renderEditNote && this.renderEditNote(noteDetail)}
          <Box sx={webStyle.actionBtn}>
            <EditOutlinedIcon
              data-test-id="editNote"
              onClick={() => {
                this.setRenderEditNote(true);
                this.handleEditPress(noteDetail);
              }} />
            <DeleteOutlineOutlinedIcon data-test-id="deleteNote" onClick={() => this.handleDelete(noteDetail, notes)} />
          </Box>
        </Box>
      </Box>
    )
  }

  renderCreateNoteModal = (visible: boolean) => {
    const {title, description } = this.state;
    return (
      <Modal open={visible}>
        <Box sx={webStyle.modalBody}>
          <Button onClick={() => this.handleModalClose()} style={webStyle.modalClose}>X</Button>
          <Box sx={webStyle.modalContent}>
            <TextField
              value={title}
              onChange={event => this.handleOnChangeText(event.target.value, 'title')}
              placeholder='Title'
              margin="normal"
              data-test-id="titleInput"
            />
            <TextField
              placeholder='Description'
              onChange={event => 
                this.handleOnChangeText(event.target.value, 'description')
              }
              value={description}
              margin="normal"
              data-test-id="descInput"
            />
            <Box style={webStyle.modalFooter}>
              {title.trim() && description.trim() && <Button 
                  style={webStyle.buttonStyle} 
                  data-test-id="createSubmitNote" 
                  onClick={() => this.handleSubmit()}
                >Save</Button>
              }
              <Button 
                style={webStyle.buttonStyle} 
                onClick={() => this.handleModalClose()}
              >Cancel</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    )
  }

  render() {
    if (!localStorage.getItem("LOGIN_TOKEN")) {
      return <Redirect to='/email-account-login' />
    }
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"md"}>
          <Box sx={webStyle.actionBtn}>
            <Button style={webStyle.buttonStyle} color="primary" data-test-id="createNotes" variant="outlined" title="create notes"
              onClick={() => this.handleNoteStateTrue()}> {configJSON.btnCreateNote} </Button>
          </Box>
          <Box sx={webStyle.mainWrapper} data-test-id="Flatlist">
            {this.state.notes.length > 0  &&
              this.state.notes.map((values) => (this.renderNoteList(values)))}
            {this.renderCreateNoteModal(this.state.openModal)}
          </Box>
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}
// Customizable Area End



// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    gap: "20px",
    flexDirection: "column"
  },
  mainCard: {
    padding: "20px",
    background: "#fff",
    boxShadow: "0px 0px 10px #c9c9c9",
    borderRadius: "10px",
    flexGrow: 1,
    maxWidth: "100%"
  },
  buttonStyle: {
    height: "40px",
    margin: "20px 0",
    border: "none",
    backgroundColor: "#2196f3",
    color: "#fff",
  },
  modalBody: {
    background: "#fff",
    maxWidth: "500px",
    margin: "0 auto",
    position: "relative",
    top: "20%",
    left: 0,
    transform: "translate(0%)",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    padding: "20px"
  },
  modalClose: {
    position: "absolute" as const,
    right: 0,
    top: 0,
    zIndex: 1
  },
  modalFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "10px"
  },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: "15px",
    color: "#2196f3",
    cursor: "pointer"
  },
  modalInput: {
    maxHeight: "200px",
    heignt: "200px",
    overflowY: "auto"
  },
  w100: {
    width: "100%",
  },

};

// Customizable Area End
