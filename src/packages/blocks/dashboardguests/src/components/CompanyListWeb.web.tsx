// Customizable Area Start
import React from 'react'
import CompanyListWebController, { Props ,ItemWeb} from "./CompanyListWebController.web"
import { Box, Typography, } from "@material-ui/core";
export const RenderItem = ({ item, investNow }: { item: ItemWeb, investNow: (item: ItemWeb) => void }) => {
    const { type, attributes } = item
    const { company_name } = attributes
    return (
        <Box style={{margin:10,padding:10,height:100,width:"10%",border:"1px solid lightgrey",borderRadius:10,justifyContent:"center"}}>
            <Typography data-test-id="companyName">{company_name}</Typography>
            <Typography data-test-id="companyType">{type}</Typography>
            <Box
                style={{ height: 30, width: 60, backgroundColor: "green", borderWidth: 1, borderRadius: 5 }}
                onClick={() => investNow(item)}
                data-test-id={"investBtn"}><Typography style={{ color: "white", fontSize: 16 }}>Invest Now</Typography>
            </Box>

        </Box>
    )
}
export default class CompanyListWeb extends CompanyListWebController {
    constructor(props: Props) {
        super(props)
    }
    render() {

        return (
            <Box style={{ justifyContent: "center", display: "flex" }}>
                {this.state.companyListWeb &&
                    this.state.companyListWeb.map((item, index) => (
                        <RenderItem key={index} item={item} investNow={this.investNowWeb} />
                    ))}
            </Box>
        )
    }
}


// Customizable Area End
