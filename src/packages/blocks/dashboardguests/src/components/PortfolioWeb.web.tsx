// Customizable Area Start
import React from 'react'
import PortfolioWebController, { Props ,DummyDataWeb} from "./PortfolioWebController.web"
import { Box, Typography,Grid } from "@material-ui/core";

export const RenderPortfolioWebItem = ({ item }: { item: DummyDataWeb }) => {
    const { type, attributes } = item
    const { company_name, invest_amount, date_of_invest } = attributes
    return (
        <Grid item md={3} spacing={3} style={{height:200,margin:5,border:"1px solid lightgrey",borderRadius:10,padding:10}}>
            <Box style={{display:"flex"}}>
                <Typography >Company Name:</Typography>
                <Typography data-test-id="ComapanyName">{company_name}</Typography>
            </Box>
            <Box style={{display:"flex"}}>
                <Typography>Company Type:</Typography>
                <Typography data-test-id="ComapnayType">{type}</Typography>
            </Box>
            <Box style={{display:"flex"}}>
                <Typography>invest amount:</Typography>
                <Typography data-test-id="investAmount">{invest_amount}</Typography>
            </Box>
            <Box style={{display:"flex"}}>
                <Typography>date of invest:</Typography>
                <Typography data-test-id="dateOfInvest">{date_of_invest}</Typography>
            </Box>

        </Grid>
    )
}
export default class PortfolioWeb extends PortfolioWebController {
    constructor(props: Props) {
        super(props)
    }
    render() {

        return (
            <Box style={{ justifyContent: "center", display: "flex" }}>
               <Grid container  style={{ display: "flex", width: '70%', margin: 'auto'}}>
                {this.state.portfoilioDataWeb &&
                    this.state.portfoilioDataWeb.map((item, index) => (
                        <RenderPortfolioWebItem key={index} item={item} />
                    ))}
                    </Grid>
            </Box>
        )
    }
}


// Customizable Area End
