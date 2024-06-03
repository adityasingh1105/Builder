import React from "react";

import {
  Box,
  Button,
  FormControl,
  Stepper,
  Step,
  StepLabel,
  Grid,
  TextField,
  MenuItem
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";


// Customizable Area Start
import * as Yup from 'yup';
// Customizable Area End

import MultipageFormsController, {
  Props,
  Gender,
  Country,
  Industry,
} from "./MultipageFormsController";
import { Formik } from "formik";

interface CountryOptionType {
  name?: string,
  dial_code?: string,
  code?: string
  }


const phoneRegExp = /^\+?\d{7,14}$/;
const FormSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Field is Too Short')
    .max(50, 'Field is Too Long!')
    .required('First Name is required'),
    last_name: Yup.string()
    .min(2, 'Field is Too Short')
    .max(50, 'Field is Too Long!')
    .required('Last Name is required'),
    email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
    phone_number: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone Number is required')
    .min(10, 'Phone Number mush to 10 digit')
    .max(12, 'Phone Number mush be less than 12 digit')
});

const FormSchemaStep2 = Yup.object().shape({
    message: Yup.string()
    .required('Message is required'),
    selectedCountry: Yup.string()
    .required('Country is required'),
    selectedIndustry: Yup.string()
    .required('Industry is required'),
    selectedGender: Yup.string()
    .required('Gender is required'),
});


export default class MultipageForms extends MultipageFormsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  
  getStepContent(step: number) {
    const { formikData } = this.state
    switch (step) {
      case 0:
        return (
          <Formik 
            initialValues={ formikData.email ? formikData :   {
            first_name: "",
            last_name: "",
            selectedPhoneCountry: "+91",
            phone_number: "",
            email: "",
            countries: this.state.countries,
          }}
          validationSchema={FormSchema }
          enableReinitialize
          onSubmit={(values) => this.stepOnSubmit(values) }
          >
            {({ values, errors, setFieldValue , touched, handleSubmit, }) => (
              <>
              <Grid
              container
              spacing={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} >
                <FormControl style={{ width: "39rem" }}>  
                  <TextField 
                    id="outlined-basic" 
                    data-test-id="txtInputfirstname"
                    label="First Name" 
                    variant="outlined" 
                    value={values.first_name} 
                    onChange={(events)=> setFieldValue("first_name", events.target.value)}
                  />
                  {
                    errors.first_name && touched.first_name && 
                      <div style={webStyle.errorMsg}>{ errors.first_name}</div>
                  }
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl style={{ width: "39rem" }}>
                <TextField 
                    id="outlined-basic" 
                    data-test-id="txtInputlasttname"
                    label="Last Name" 
                    variant="outlined"  
                  value={values.last_name} 
                  onChange={(events)=> setFieldValue("last_name", events.target.value)}/>
                  {
                    errors.last_name && touched.last_name && <div style={webStyle.errorMsg}>{ errors.last_name}</div>
                  }                      
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl style={{ width: "39rem" }}>
                <TextField 
                    id="outlined-basic" 
                    data-test-id="txtInputemail"
                    label="Email" 
                    variant="outlined"  
                  value={values.email} 
                  onChange={(events)=> setFieldValue("email", events.target.value)}/>
                  {
                    errors.email && touched.email && <div style={webStyle.errorMsg}>{ errors.email}</div>
                  } 
                </FormControl>
              </Grid>
              <Grid item xs={12} style={{ width: "40rem", margin: "10px" }}>
              <TextField 
                id="outlined-basic" 
                data-test-id="txtInputCountryPhonenumber"
                variant="outlined"                
                select
                label="Country"
                value={values.selectedPhoneCountry} 
                onChange={(events)=> setFieldValue("selectedPhoneCountry", events.target.value)}
              >               
              {this.state.countries.map((option:CountryOptionType) => (
                <MenuItem key={option.dial_code} value={option.dial_code}>
                  {option.dial_code}
                </MenuItem>
                ))}
              </TextField>
              <FormControl>
                <TextField 
                  id="outlined-basic" 
                  data-test-id="txtInputphonenumber"
                  label="Phone Number" 
                  variant="outlined"  
                  value={values.phone_number} 
                  style={{ width: "543px" }}
                  onChange={(events)=> setFieldValue("phone_number", events.target.value)}
                />
                {
                  errors.phone_number && touched.phone_number && <div style={webStyle.errorMsg}>{ errors.phone_number}</div>
                } 
                {
                  errors.email && touched.selectedPhoneCountry && <div style={webStyle.errorMsg}>{ errors.selectedPhoneCountry}</div>
                } 
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{ width: "39rem", margin: "2rem"}}>
              <FormControl style={{display:'flex',flexDirection:'row' }}>
              <Button
              data-test-id="submitNextButton"
              id="nextButton"
              style={{ marginLeft:'20px' }}
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => handleSubmit()}
              >
                Next
              </Button>
            </FormControl>
            </Grid>
          </Grid>
          </>
            )}
        </Formik>
        );
      case 1:
        return (
          <>
          <Formik 
            initialValues={{
              message: "",
              selectedCountry: "1",
              selectedGender: "1",
              selectedIndustry: "education",
            }}
           validationSchema={FormSchemaStep2 }
            onSubmit={(values)=> this.multiPageFormSubmit(Object.assign(this.state.formikData,values)) }
          >
            {({ values, errors, setFieldValue , handleSubmit }) => (

              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                
                <Grid item xs={12} >
                  <TextField
                    select
                    label="Gender"
                    data-test-id="txtInputGender"
                    style={{width:"40rem"}}
                    value={values.selectedGender}
                    onChange={(events)=> setFieldValue("selectedGender", events.target.value)}
                    variant="outlined"  
                  >
                    {this.state.gender.map((option: Gender) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {
                    errors.selectedGender && <div style={webStyle.errorMsg}>{ errors.selectedGender}</div>
                  } 
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    select
                    label="Country"                    
                    data-test-id="txtInputCountry"  
                    style={{width:"40rem"}}
                    value={values.selectedCountry}
                    onChange={(events)=> setFieldValue("selectedCountry", events.target.value)}
                    variant="outlined"  
                    >
                    {this.state.country.map((option: Country) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {
                    errors.selectedCountry &&<div style={webStyle.errorMsg}>{ errors.selectedCountry}</div>
                  } 
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    id="outlined-select-currency"
                    data-test-id="txtInputIndustry"
                    select
                    label="Industry"
                    style={{width:"40rem"}}   
                    value={values.selectedIndustry}
                    onChange={(events)=> setFieldValue("selectedIndustry", events.target.value)} 
                    variant="outlined"  
                  >
                    {this.state.industry.map((option: Industry) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {
                    errors.selectedIndustry &&  <div style={webStyle.errorMsg}>{ errors.selectedIndustry}</div>
                  } 
                </Grid>
                <Grid item xs={12} >
                <FormControl style={{ width: "40rem" }}>
                <TextField 
                  id="outlined-basic" 
                  data-test-id="txtInputMessage"
                  label="Message" 
                  variant="outlined"  
                  value={values.message} 
                  onChange={(events)=> setFieldValue("message", events.target.value)}/>
                  {
                    errors.message && <div style={webStyle.errorMsg}>{ errors.message}</div>
                  } 
                </FormControl>
              </Grid>
                <Grid item xs={12} style={{ width: "39rem", margin: "2rem"}}>
                  <FormControl style={{display:'flex',flexDirection:'row' }}>
                      <Button 
                        variant="contained" 
                        id="backButton"
                        data-test-id="backButton"
                        color="secondary"  
                        disabled={this.state.activeSteps === 0}
                        onClick={this.handleBack}
                      >
                        Back
                      </Button>
                      <Button
                      style={{ marginLeft:'20px' }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => handleSubmit()}
                      >
                        Submit
                      </Button>
                  </FormControl>
                </Grid>
              </Grid>
             )}
          </Formik>
          </>
        );
        case 2:
          return (
            <>
            <Grid
              container
              spacing={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} >
                <Box className="responseSection">
                  <p style={webStyle.successMsg}>{this.state.successData}</p>
                  <p style={webStyle.errorMsg}>{this.state.errorsData}</p>
                </Box>
                <h1 style={{color:"#df175d"}}>User Details</h1>
                <TextField
                  id="outlined-basic" 
                  data-test-id="txtInputFirstName"
                  label="Name" 
                  variant="outlined"  
                  value={this.state.first_name} 
                ></TextField>
                <TextField
                  id="outlined-basic" 
                  data-test-id="txtInputLastName"
                  label="Name" 
                  variant="outlined"  
                  value={this.state.last_name} 
                ></TextField>
              </Grid> 
              <Grid item xs={12} > 
                <TextField
                  id="outlined-basic" 
                  data-test-id="txtInputemail"
                  label="Email" 
                  variant="outlined"  
                  value={this.state.email} 
                ></TextField>                 
                <TextField
                  id="outlined-basic" 
                  data-test-id="txtInputPhone"
                  label="Phone" 
                  variant="outlined"  
                  value={this.state.phone_number} 
                ></TextField>
              </Grid> 
              <Grid item xs={12} > 
                <TextField
                  id="outlined-basic" 
                  data-test-id="txtInputGender"
                  label="Gender" 
                  variant="outlined"  
                  value={this.state.selectedGender} 
                ></TextField>             
                <TextField
                  id="outlined-basic" 
                  data-test-id="txtInputCountry"
                  label="Country" 
                  variant="outlined"  
                  value={this.state.selectedCountry} 
                ></TextField>
              </Grid>  
              <Grid item xs={12} > 
                <TextField
                  id="outlined-basic" 
                  data-test-id="txtInputemail"
                  label="Industry" 
                  variant="outlined"  
                  value={this.state.selectedIndustry} 
                ></TextField>                     
                <TextField
                  id="outlined-basic" 
                  data-test-id="txtInputemail"
                  label="Message" 
                  variant="outlined"  
                  value={this.state.message} 
                ></TextField>
            </Grid>
          <></>
          </Grid>
            </>
          )

      default:
        return "Unknown step";
    }
  }

  // Customizable Area Start

  steps = this.getSteps();
  // Customizable Area End

  render() {
    if (!this.state?.token_local) {
      return (
        <>
          <h3 style={{ color: "red" }}>Token expired</h3>
          <Button
            data-test-id="btnLogin"
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={this.LoginPage}
          >
            Sign In
          </Button>
        </>
      );
    }
    return (
      // Customizable Area Start
      <>
        <div style={{ width: "100%" }}>
          <Stepper activeStep={this.state.activeSteps}>
            {this.steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {this.state.activeSteps === this.steps.length ? (
              <div>
                <p>All steps completed</p>
              </div>
            ) : (
              <div>                
                {this.getStepContent(this.state.activeSteps)}
                
              </div>
            )}
          </div>
        </div>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
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
  },
  boxStyle: {
    maxWidth: '620px',
    margin: '0 auto',
},
successMsg:{
  color : 'red',
  display:'flex',
  justifyContent:'center',
},
errorMsg:{
  color:'red',
  fontSize:'14px',
  paddingTop:'5px',
}
};
// Customizable Area End
