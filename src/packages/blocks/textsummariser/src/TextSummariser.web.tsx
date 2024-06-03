// Customizable Area Start
import React from "react";

import {
  Box,
  Input,
  Button,
 
  TextField
} from "@material-ui/core";





import TextSummariserController, {
    Props,
} from "./TextSummariserController.web";
import { imgAdd, imgSub } from "./assets";
import { configJSON } from "./TextSummariserController";

export default class TextSummariser extends TextSummariserController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
      <Box  style={{marginLeft:"15px",justifyContent:"center"}}>
      <Box style={{justifyContent:"center",}}>
        <h3>{configJSON.TextLable}</h3>
        <Box style={{width:"70%",border:"1px solid lightgrey"}}>

        <TextField data-test-id="txtInput"  multiline={true}  fullWidth label="Enter Text"  id="fullWidth"  value={this.state.textInputWeb} onChange={(event) => this.setTextWeb(event)}  />
        </Box>
        <h3 style={{width:"50%"}}>{configJSON.orLable}</h3>
        <Input data-test-id="dockPicker" type="file" style={{height:30,width:"30%",backgroundColor:"green",padding:5,}} onChange={(event:React.ChangeEvent<HTMLInputElement>) => this.docPicker(event)}/>
        <h3>{configJSON.summaryLineLable}</h3>
          <Box style={{display:"flex",border:"1px solid lightgrey",flexDirection:"row",width:"30%",justifyContent:"space-between" }}>
            <Button data-test-id="addLine" onClick={() => { this.handleSummaryLineWeb(true) }}>
              <img style={{height:20,width:30}} src={imgAdd} />
            </Button>
            <h3>{this.state.summaryLineWeb}</h3>
            <Button data-test-id="subLine" onClick={() => this.handleSummaryLineWeb(false)}>
              <img style={{height:20,width:30}}  src={imgSub} />
            </Button>
          </Box>
        <Button data-test-id="summarize" style={{height:30,width:"30%",backgroundColor:"green",padding:5,marginTop:"10px"}} onClick={() => this.summariseTextWeb()}>
          {configJSON.summarizeTextLable}
        </Button>
      </Box>
      <Box>
        <h3>{configJSON.summarizedTextLable}</h3>
        <Box style={{width:"70%",border:"1px solid lightgrey"}}>

        <TextField fullWidth   multiline={true}  label="Summarize Text"   id="fullWidth"  value={this.state.summarisedTextWeb}/>
        </Box>
      </Box>
    </Box>
    );
  }
}


// Customizable Area End
// Customizable Area End
