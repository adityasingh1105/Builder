// Customizable Area Start
import React from "react";

import {
  Container,
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@material-ui/core";

import PublishIcon from '@material-ui/icons/Publish';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import ReceiptCustomisationController, {
  Props,
} from "./ReceiptCustomisationController.web";

export default class ReceiptCustomisation extends ReceiptCustomisationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { first_name, last_name, email, phone, country, state, city, postal, address } = this.state.formData;
    return (
      <Box
        sx={{
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={8} md={6} xs={12}>
              <Card>
                <CardHeader title="RECEIPT CUSTOMISATION" />
                <Divider />
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        data-test-id="txtInputFirstName"
                        fullWidth
                        required
                        label="First Name"
                        variant="outlined"
                        name="first_name"
                        value={first_name}
                        onChange={this.handleChangeFormData}
                        error={Boolean(this.state.isErrorFormData.first_name)}
                      />
                      <Typography
                        variant="body2"
                        style={webStyle.errorMessage}
                      >
                        {this.state.isErrorFormData.first_name}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        data-test-id="txtInputLastName"
                        fullWidth
                        required
                        label="Last Name"
                        variant="outlined"
                        name="last_name"
                        value={last_name}
                        onChange={this.handleChangeFormData}
                        error={Boolean(this.state.isErrorFormData.last_name)}
                      />
                      <Typography
                        variant="body2"
                        style={webStyle.errorMessage}
                      >
                        {this.state.isErrorFormData.last_name}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={email}
                        onChange={this.handleChangeFormData}
                        error={Boolean(this.state.isErrorFormData.email)}
                      />
                      <Typography
                        variant="body2"
                        style={webStyle.errorMessage}
                      >
                        {this.state.isErrorFormData.email}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="Phone"
                        variant="outlined"
                        name="phone"
                        value={phone}
                        onChange={this.handleChangeFormData}
                        error={Boolean(this.state.isErrorFormData.phone)}
                      />
                      <Typography
                        variant="body2"
                        style={webStyle.errorMessage}
                      >
                        {this.state.isErrorFormData.phone}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="Country"
                        variant="outlined"
                        name="country"
                        value={country}
                        onChange={this.handleChangeFormData}
                        error={Boolean(this.state.isErrorFormData.country)}
                      />
                      <Typography
                        variant="body2"
                        style={webStyle.errorMessage}
                      >
                        {this.state.isErrorFormData.country}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="State"
                        variant="outlined"
                        name="state"
                        value={state}
                        onChange={this.handleChangeFormData}
                        error={Boolean(this.state.isErrorFormData.state)}
                      />
                      <Typography
                        variant="body2"
                        style={webStyle.errorMessage}
                      >
                        {this.state.isErrorFormData.state}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="City"
                        variant="outlined"
                        name="city"
                        value={city}
                        onChange={this.handleChangeFormData}
                        error={Boolean(this.state.isErrorFormData.city)}
                      />
                      <Typography
                        variant="body2"
                        style={webStyle.errorMessage}
                      >
                        {this.state.isErrorFormData.city}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="Postal"
                        variant="outlined"
                        name="postal"
                        value={postal}
                        onChange={this.handleChangeFormData}
                        error={Boolean(this.state.isErrorFormData.postal)}
                      />
                      <Typography
                        variant="body2"
                        style={webStyle.errorMessage}
                      >
                        {this.state.isErrorFormData.postal}
                      </Typography>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        required
                        multiline
                        minRows={2.5}
                        label="Address"
                        variant="outlined"
                        name="address"
                        value={address}
                        onChange={this.handleChangeFormData}
                        error={Boolean(this.state.isErrorFormData.address)}
                      />
                      <Typography
                        variant="body2"
                        style={webStyle.errorMessage}
                      >
                        {this.state.isErrorFormData.address}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <Card>
                <CardHeader title="LOGO" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item lg={12} md={12} xs={12}>
                      <Button
                        style={webStyle.chooseLogo}
                        variant="text"
                        component="label"
                        disableRipple
                        disableElevation
                        disableFocusRipple
                      >
                        Choose Files
                        <input
                          data-test-id="handleSelectLogo"
                          hidden
                          type="file"
                          onChange={this.handleSelectLogo}
                        />
                      </Button>
                      <Typography
                        data-test-id="logoName"
                        variant="body1"
                        style={webStyle.logoName}
                      >
                        {this.state.logo ? this.state.logo.name : 'No file chosen'}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={webStyle.errorMessage}
                      >
                        {this.state.isErrorFormData.logo}
                      </Typography>
                    </Grid>
                    {this.state.logo &&
                      <Grid item>
                        <img
                          style={webStyle.logo}
                          src={URL.createObjectURL(this.state.logo)}
                          height="90"
                          width="90"
                        />
                        <HighlightOffIcon
                          data-test-id="deleteIconLogo"
                          style={webStyle.deleteIcon}
                          onClick={this.handleDeleteLogo}
                        />
                      </Grid>
                    }
                  </Grid>
                </CardContent>
                <Divider />
              </Card>
              <Card style={webStyle.card}>
                <CardHeader title="FILE" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item lg={12} md={12} xs={12} style={webStyle.uploadButton}>
                      <Button
                        variant="text"
                        component="label"
                        disableRipple
                        disableElevation
                        disableFocusRipple
                      >
                        <PublishIcon />
                        <input
                          hidden
                          multiple
                          type="file"
                          onChange={this.handleSelectDocument}
                        />Upload File
                      </Button>
                      <Typography
                        variant="body2"
                        style={webStyle.errorMessage}
                      >
                        {this.state.isErrorFormData.documents}
                      </Typography>
                    </Grid>
                    {this.state.documents && this.state.documents.map((item: File, index: number) => {
                      return (
                        <Grid item key={index}>
                          <Typography variant="body1" style={webStyle.fileName}>
                            {item.name}
                          </Typography>
                          <HighlightOffIcon
                            data-test-id="deleteDocument"
                            style={webStyle.deleteIconFile}
                            onClick={() => this.handleDeleteDocument(index)}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </CardContent>
                <Divider />
              </Card>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <Card>
                <CardHeader title="IMAGE" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item lg={12} md={12} xs={12}>
                      <Button
                        style={webStyle.chooseLogo}
                        variant="text"
                        component="label"
                        disableRipple
                        disableElevation
                        disableFocusRipple
                      >
                        Choose Files
                        <input
                          hidden
                          multiple
                          type="file"
                          onChange={this.handleSelectImage}
                        />
                      </Button>
                      <Typography
                        variant="body1"
                        style={webStyle.logoName}
                      >
                        {this.state.images.length ? `${this.state.images.length} files selected.` : 'No file chosen'}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={webStyle.errorMessage}
                      >
                        {this.state.isErrorFormData.images}
                      </Typography>
                    </Grid>
                    {this.state.images && this.state.images.map((item: File, index: number) => {
                      return (
                        <Grid item key={index}>
                          <img
                            src={URL.createObjectURL(item)}
                            height="150"
                            width="200"
                          />
                          <HighlightOffIcon
                            data-test-id="deleteImage"
                            style={webStyle.deleteIconImage}
                            onClick={() => this.handleDeleteImage(index)}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </CardContent>
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item lg={12} md={12} xs={12}>
                      <Button
                        data-test-id="submitButton"
                        variant="contained"
                        color="primary"
                        onClick={() => this.submitButton()}
                      >
                        SUBMIT
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
}

const webStyle = {
  card: {
    marginTop: 20,
  },
  uploadButton: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: "10px"
  },
  chooseLogo: {
    padding: '0px 7px',
    height: '24px',
    textTransform: 'capitalize' as 'capitalize',
    border: '1px solid black',
    backgroundColor: '#ececec',
    borderRadius: '2px',
    fontSize: '15px',
  },
  logoName: {
    display: 'inline-block',
    margin: '0px 0px 0px 4px',
  },
  fileName: {
    display: 'inline-block',
    marginLeft: "5px"
  },
  logo: {
    border: '1px dashed #ccc'
  },
  deleteIcon: {
    position: 'relative' as 'relative',
    bottom: '67px',
    right: '25px',
    cursor: 'pointer',
    color: "grey"
  },
  deleteIconFile: {
    position: 'relative' as 'relative',
    left: '10px',
    top: '6px',
    cursor: 'pointer',
    color: "grey"
  },
  deleteIconImage: {
    position: 'relative' as 'relative',
    bottom: '84%',
    right: '25px',
    cursor: 'pointer',
    color: 'grey',
  },
  errorMessage: {
    marginTop: "5px",
    color: "red"
  }
};
// Customizable Area End
// Customizable Area End
