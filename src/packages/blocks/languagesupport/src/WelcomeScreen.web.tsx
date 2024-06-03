//@ts-nocheck
// Customizable Area Start
import React from "react";
import { Typography, IconButton, Box, Grid, Button } from "@material-ui/core";
import WelcomeScreenController, { Props } from "./WelcomeScreenController.web";
import { rooLogo } from "./assets";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
export const English = require("./LanguageData/En.json");
export const French = require("./LanguageData/Fr.json")  
export const Spanish = require("./LanguageData/Sp.json") 
import { withTranslation ,initReactI18next} from "react-i18next";
import i18n from "i18next"
// Customizable Area End

// Customizable Area Start


i18n.use(initReactI18next).init({
    resources: {
        En: { translation: English },
        Fr: { translation: French },
        Sp: { translation: Spanish },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

// Customizable Area End

export class WelcomeScreen extends WelcomeScreenController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }
    // Customizable Area Start

    render() {
        return (
            <Box
                
                p={3}
            >
                <Box width={3 / 4} margin="auto">
                    <Grid container spacing={3} direction="column" alignItems="center">
                        <Grid item>
                            <Box>
                                <img src={rooLogo} alt="" style={webPage.logo} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box style={{ textAlign: "center" }} >
                                <Typography variant="h6" style={webPage.title}>Welcome to the ROO</Typography>
                                <Typography variant="body2" style={webPage.para}>
                                    Getting you and your car home every time
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item style={{ marginTop: "50px" }}>
                            <Button variant="contained" style={webPage.startbtn}
                            data-test-id="btnstart"
                                onClick={this.handleStart}
                            >
                                LET'S GET STARTED
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <React.Fragment>

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
                            data-test-id="btnCheck"
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
                                onClick={(() => this.handleChangeLanguage("Sp"))}
                            >
                                Spanish
                            </Button>

                        </DialogActions>
                    </Dialog>
                </React.Fragment>
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

export default withTranslation() (WelcomeScreen);
// Customizable Area End

