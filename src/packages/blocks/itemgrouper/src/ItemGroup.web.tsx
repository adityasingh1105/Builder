import React from "react";
import {
  // Customizable Area Start
  Grid,
  Box, Button, Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton
  // Customizable Area End
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


// Customizable Area Start



// Customizable Area End

import ItemGroupController, { Product, Props } from "./ItemGroupController";

export default class ItemGroup extends ItemGroupController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {

    return (
      // Customizable Area Start
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-end" style={webStyle.addBtn}>
          <Box>
            <Button variant="outlined" onClick={() => this.handleAddGroup()} data-test-id="group-add">Add Group</Button>
          </Box>
        </Grid>
        <Grid style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop:"30px"
        }}>
          {this.state.GroupList?.map((list) => (
            <Box key={list.id} style={{ display: "flex",justifyContent:"space-betwwen"
            }}>
            <Accordion  style={webStyle.Acordian01}>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                 <Box style={webStyle.EditDel}>
                 <Typography>{list.attributes.name}</Typography>
                 
                 </Box>
              </AccordionSummary>
              <AccordionDetails>

                <List >
                  {list.attributes.products.length ? list.attributes.products.map((product:Product) => (
                    <>
                    <ListItem key={product.id} style={webStyle.ListItem}>
                      <ListItemAvatar>
                        <Avatar alt={product.name} src="/static/images/avatar/1.jpg" />
                      </ListItemAvatar>
                      <ListItemText primary={product.name} secondary={product.name} />
                      <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" >
                      <DeleteIcon onClick={()=>this.handleGroupItem(product.account_item_grouper_id)} data-test-id="del-group-item"/>
                    </IconButton>
                  </ListItemSecondaryAction>
                    </ListItem>
                    </>
                  )) : <>No products available</>}
                </List>
              </AccordionDetails>
            </Accordion>
            <Box style={webStyle.buttonsDel}>
            <DeleteIcon onClick={()=>this.handleGroupDelete(list.id)} data-test-id="del-group"/>
            <EditIcon onClick={()=>this.handleGroupUpdate(list.id)} data-test-id="edit-group"/>
           </Box>
           </Box>
          ))}
        </Grid>
      </Grid>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  addBtn: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px"

  },
  Acordian01: {
    width: "700px",

  },
  ItemGrouperAcc: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  EditDel:{
    display: "flex",
    justifyContent:"space-between",
    width: "635px"
  },
  buttonsDel:{
   color:'grey'
  },
  ListItem:{
    display:"flex",
    justifyContent:"space-between"
  }

};


// Customizable Area End
