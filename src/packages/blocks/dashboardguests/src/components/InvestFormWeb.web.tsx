// Customizable Area Start
import React from "react";

import { Box, Typography, Input } from "@material-ui/core";

import InvestFormWebController, {
    Props,
} from "./InvestFormWebController.web";
import moment from "moment";

export default class InvestFormWeb extends InvestFormWebController {
    constructor(props: Props) {
        super(props);
    }


    render() {
        // Merge Engine - render - Start
        return (
            <Box style={{ justifyContent: "center", display: "flex", alignContent: "center" }}>

                <Box style={{ justifyContent: "center", height: 300, }}>
                    <Box>
                        <Typography data-test-id="titlext">
                            Start Investing
                        </Typography>
                        <Input
                            data-test-id="txtInputAmount"
                            onChange={(event) => { this.setWebInvestmentAmount(event) }}
                            placeholder='Investment Amount'
                        />

                    </Box>
                    <Box style={{ height: 30, width: "10%", margin: 10 }}>
                        <Typography data-test-id="date">{moment(new Date()).format('YYYY/MM/DD')}</Typography>
                    </Box>
                    <Box style={{ width: 300 }}>
                        <Box
                            onClick={() => this.investWeb()}
                            style={{ width: 80, height: 30, backgroundColor: "green", "borderRadius": 5, borderWidth: 1, padding: 5 }}
                            data-test-id={"inestBtn"}>
                            <Typography style={{ color: "white", fontSize: 16 }}>Invest</Typography>
                        </Box>
                    </Box>
                </Box>

            </Box>
        );
        // Merge Engine - render - End
    }
}



// Customizable Area End
