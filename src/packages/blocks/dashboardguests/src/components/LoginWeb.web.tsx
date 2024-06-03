// Customizable Area Start
import React from 'react'
import { Box, Typography, Modal, Input } from "@material-ui/core";
import LoginWebController, { Props } from "./LoginWebController.web"

export default class LoginWeb extends LoginWebController {
  constructor(props: Props) {
    super(props)
  }
  render() {

    return (
      <Box style={{ justifyContent: "center", display: "flex" }}>
        <Box style={{}}>
          <Box style={{}}>
            <Typography data-test-id="phonetxt">
              CC
            </Typography>
            <Box
              data-test-id='openContryCodeModal'
              style={{

              }}
            >
              <Typography style={{
                color: 'grey',
                fontSize: 20
              }}>
                +{this.state.countryCodeWeb}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography data-test-id="phonetxt">
              Phone
            </Typography>
            <Input
              data-test-id="txtInput"
              onChange={(event) => { this.setWebPhoneNumber(event) }}
              placeholder='phone'
            />
            <Box />
          </Box>
          <Box>
            <Box
              style={{ marginTop: 10, height: 30, width: 100, backgroundColor: "green", border: "1px solid green", textAlign: "center", borderRadius: 5 }}
              onClick={() => this.onWebLogin()}
              data-test-id="loginBtn">
              <Typography style={{ color: "white", fontSize: 16 }}>Login</Typography>
            </Box>
          </Box>
            <Modal
              open={this.state.modalVisibleWeb}
              onClose={this.setWebModal}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >

          <Box style={{alignSelf:"center",display:"flex",justifyContent:"center"}}>
              <Box style={styles.modalBodyWeb}>
                <Typography>Please check your messages</Typography>
                <Typography>We have sent a OTP to your registered +{this.state.countryCodeWeb}{this.state.phoneNoWeb}
                </Typography>
                <Input
                  data-test-id="txtInputOtp"
                  onChange={(event) => { this.setWebOtp(event) }}
                  placeholder='otp' />
                <Box style={{ display:"flex",margin:10}}>

                  <Box
                    data-test-id="cancleModal"
                    onClick={() => {
                      this.setWebModal(false)
                    }}
                    style={{marginRight:10, height: 30, width: 80, backgroundColor: "red", border: '1px solid red', textAlign: "center", borderRadius: 5 }}
                  >
                    <Typography style={{ alignSelf: 'center', color: 'black' }}>Cancel</Typography>
                  </Box>
                  <Box
                    data-test-id="submitOtp"
                    onClick={() => this.onWebSubmitOtp()}
                    style={{ height: 30, width: 80, backgroundColor: "green", border: '1px solid green', textAlign: "center", borderRadius: 5}}>
                    <Typography style={{ color: 'white', alignSelf: 'center' }}>Verify</Typography>
                  </Box>
                </Box>
                <Box style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-around', width: '80%', marginBottom: 8, }}>
                  <Typography>Didn't recieve the OTP?</Typography>
                  <Box data-test-id="resendOtp" onClick={() => this.getVerificationWebOtp()}>
                    <Typography style={{color:"lightblue"}}> Resend OTP</Typography>
                  </Box>
                </Box>

                <Box style={{ marginTop: 20 }}></Box>


              </Box>
          </Box>
            </Modal>
        </Box>

      </Box>
    )
  }
}
const styles = {
  modalBodyWeb: {
    width: '20%',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    borderRadius: 10,
  },
};

// Customizable Area End
