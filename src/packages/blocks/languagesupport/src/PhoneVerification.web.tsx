//@ts-nocheck
// Customizable Area Start
import React from "react";
import {
  Box,
  Button,
  Typography,
  InputAdornment,
  Grid,
  FormControl,
  TextField,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton
} from "@material-ui/core";
import PhoneVerificationController, {
  Props,
} from "./PhoneVerificationController.web";
import PhoneIcon from "@material-ui/icons/Phone";
import i18n from "i18next"
import { Formik ,Form} from "formik";
import * as Yup from 'yup';
import CloseIcon from '@material-ui/icons/Close';


// Customizable Area End

// Customizable Area Start



const webStyling = {
  

  PhoneDesc: {
    marginTop: "20px",
    color: "#989898",
    fontFamily: "Verdana",
  },
  InputField: {
    marginTop: "10px",
  },


 
  fieldError: {
    textAlign: "start",
    color: "red",
    fontSize: "16px",
  } as React.CSSProperties,
};

const validationSchema=Yup.object().shape({
  agree:Yup.boolean().oneOf([true],
'you must accept the terms and conditions'),

});

const validationphoneSchema=Yup.object().shape({
fullphonenumber:Yup.string().matches(/^\+[1-9]\d{1,14}$/,'Invalid phone number').required('phone number is required'),
});

// Customizable Area End
 export class PhoneVerification extends PhoneVerificationController {
  constructor(props: Props) {
    super(props);

    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  render() {

return (
      <Box width={1 / 4} margin="auto">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item style={{ marginTop: "20px" }}>
              
                  <Box>
                    <Typography
                      variant="h4"
                      style={{
                        color: "#000",
                        fontSize: "22px",
                        fontWeight: "bold",
                        
                      }}
                    >
                      {i18n.t('EnterPhoneNumber')}
                    </Typography>
                  </Box>
                  <Box style={{ marginTop: "10px" }}>
                    <Formik
                    testID="FormikID"
                    initialValues={{
                      fullphonenumber:"",
                      agree:false
                    
                    }}
                   
                      onSubmit={this.handleSubmit}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {(props)=>{
                        const{values,errors,handleChange}=props
                        return(
                          <Form >

                      <FormControl style={webStyling.InputField}>
                        <label
                          style={{
                            textTransform: "uppercase",
                            fontSize: "16px",
                            color: "gray",
                            marginBottom: "10px",
                          }}
                        >
                          {i18n.t('MobileNumber')}
                        </label>
                        <TextField
                          data-test-id="phnumber"
                          variant="outlined"
                          size="small"
                          placeholder={i18n.t('EnterPhoneNumber') || undefined} 
                          type="number"
                          onChange={handleChange}
                         value={values.fullphonenumber}
                          name="fullphonenumber"
                          helperText={errors.fullphonenumber}
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon style={{ width: 20, height: 20 }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                       
                      <Typography
                        style={{
                          textAlign: "start",
                          color: "red",
                          fontSize: "16px",
                        }}
                      >
                        {this.state.FieldError}
                      </Typography>

                      <FormControlLabel
                        control={
                          <Checkbox
                          data-test-id="btnCheck"
                            color="primary"
                            checked={this.state.agree}
                           onChange={()=> this.setRememberMe(!this.state.agree) }
                            name="agree"
                            error={errors.agree !== ""}
                            helperText={errors.agree}
                          />
                        }
                        label={i18n.t('receiveSMSmessage')}
                      />
                      {errors.agree && Touched.agree (
                        <div>{errors.agree}</div>
                      )}

                      <Box style={{ marginTop: "40px", textAlign: "center" }}>
                      <Button
                        data-test-id="changeLangBtn"
                          variant="contained"
                          style={{
                            width: "80%",
                            textTransform: "none",
                            fontWeight: "bold",
                            borderRadius: "6px",
                            marginTop: "5%",
                            marginBottom: "5%",
                          }}
                          onClick={this.handleStart}
                                                  >
                           {i18n.t('ChangeLanguage')}

                        </Button>
                        <Button
                        data-test-id="btnSubmit"
                          type="submit"
                          variant="contained"
                          style={{
                            width: "80%",
                            textTransform: "none",
                            backgroundColor: "#000",
                            color: "#fff",
                            fontWeight: "bold",
                            borderRadius: "6px",
                            marginTop: "5%",
                            marginBottom: "5%",
                          }}
                          
                        >
                          {i18n.t('SUBMIT')}
                        </Button>
                      </Box>
                          </Form>                        )
                      }}




                    </Formik>
                  </Box>
            
             
            </Grid>
          </Grid>


          <Dialog
                        fullWidth
                        maxWidth="sm"
                        open={this.state.languageScreen}
                        onClose={this.handleClose}
                        aria-labelledby="max-width-dialog-title"
                    >
                        <DialogTitle
                            id="max-width-dialog-title"
                            style={webPage.diaHeader}
                        >
                            <Typography variant="h4" style={webPage.langauageTitle}>Select a language</Typography>
                            <Typography variant="body2" style={webPage.langauagePara}>Choose an option</Typography>
                            <IconButton
                                aria-label="close"
                                style={webPage.closeButton}
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogActions style={{ justifyContent: "space-around" }}>
                            <Button style={webPage.langubtn}
                            data-test-id="btnEnglish"
                                onClick={() => this.handleChangeLanguage("En")}
                            >
                                English
                            </Button>
                            <Button
                                style={webPage.langubtn}
                                data-test-id="btnFrench"
                                onClick={() => this.handleChangeLanguage("Fr")}
                            >
                                French
                            </Button>
                            <Button
                                style={webPage.langubtn}
                            data-test-id="btnSpanish"
                                onClick={(() => this.handleChangeLanguage("Sp"))}
                            >
                                Spanish
                            </Button>

                        </DialogActions>
                    </Dialog>
        
      </Box>
    );
  }
  // Customizable Area End
}

// Customizable Area Start
const webPage = {
  logo: {
      width: "200px",
      borderRadius: "50px",
  
  },
  title: {
      fontSize: 28,
      fontWeight: "bold"
  } as React.CSSProperties,
  para: {
      marginTop: "20px",
      fontSize: "18px"
  },

  startbtn: {
      background: "#000",
      color: "#fff",
      margin: "auto",
  },
  diaHeader: {
      display: "flex",
      justifyContent: "space-between",
  },
  langauageTitle: {
      fontWeight: "bold",
      fontSize: "24px"
  } as React.CSSProperties,
  langauagePara: {
      fontSize: "18px",
      marginTop: "10px"
  },
  closeButton: {
      position: "absolute",
      right: "0px",
      top: "0px",
      color: "blue",
  } as React.CSSProperties,
  langubtn: {
      color: "#000",
      width: "65%",
  }

};

export default PhoneVerification
// Customizable Area End
