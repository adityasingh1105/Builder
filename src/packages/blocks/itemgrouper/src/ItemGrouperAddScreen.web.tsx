import React from "react";
import {
  // Customizable Area Start
  Box,
  Paper,
  Grid, Typography, IconButton, InputBase, Button, Checkbox, Popover, FormControl, TextField, FormLabel
  // Customizable Area End
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/SearchRounded"
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Customizable Area Start



// Customizable Area End

import ItemGrouperAddScreenController, { ProductListingTestInterface, Props } from "./ItemGrouperAddScreenController";

export default class ItemGrouperAddScreen extends ItemGrouperAddScreenController {
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
        <Grid container spacing={1} >
          <Paper component="form" style={webStyle.itemroot}>
            <InputBase value={this.state.txtInputValue} style={webStyle.itemInput}
              placeholder="Search Category" data-test-id="input-tag"
              onChange={(event) => this.handleChangeText(event.target.value)} />
            <IconButton type="submit" style={webStyle.itemiconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button style={{ marginRight: "20%", height: '35px', marginTop: '20px' }} disabled={!this.state.SelectedProduct.length} data-test-id="modal-save" variant="contained" onClick={(event) => this.handleOpenModal(event.currentTarget)}>Save</Button>
          <Popover
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={this.handleCloseModal}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box >
              <FormControl error={this.state.error}>
                <TextField variant="outlined" data-test-id="Input-group-name" value={this.state.txtInputOfGroup} disabled={!!this.state.CheckUpdate} onChange={(event) => this.handleInputTag(event.target.value)}></TextField>
                <FormLabel>{this.state.error ? "please Enter Name Of Group" : ""}</FormLabel>
                <Button data-test-id="btn-for-Add" onClick={() => this.handleAddGroup()}>{this.state.CheckUpdate?"Update Group":"Add Group"}</Button>
              </FormControl>
            </Box>
          </Popover>
        </Grid>
        {this.state.searchCategory?.map((itemData) => (
          <Accordion key={itemData.id} expanded={this.state.expanded == itemData.id}
            data-test-id="ACC-01"
            onChange={() => this.handleAccordian(itemData.id)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              data-test-id="ACC-02"
              onClick={() => this.handleSubCategory(itemData.id)}
            >
              <Typography >{itemData.attributes.name}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              {this.state.subCategory?.map((subcat) => (
                <Accordion key={subcat.id} expanded={this.state.subExpanded == subcat.id} data-test-id="ACC-03" onChange={() => this.handleSubAccordian(subcat.id)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                    data-test-id="ACC-04"
                    onClick={() => this.handleProducts(subcat.id)}
                  >
                    <Typography >{subcat.attributes.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ display: "flex", flexDirection: "column", width: '300px' }} >
                    {(this.state.productsListing && this.state.productsListing.length) ? this.state.productsListing.map((prolist: ProductListingTestInterface) => (
                      <Box style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }} key={prolist.id}>
                        <Typography style={{ marginTop: "0.4rem" }}>{prolist.attributes.name}</Typography>
                        <div>
                          <Checkbox
                            name={prolist.id}
                            checked={this.state.SelectedProduct.includes(prolist.id)}
                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                            data-test-id="Check-01"
                            onChange={() => this.handleSelectionOfCheckBox(prolist.id)}
                          />
                        </div>
                      </Box>
                    )) : <></>}
                  </AccordionDetails>

                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}


      </Grid>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {


  itemroot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: 'auto',
    marginTop: '20px',
    marginBottom: '20px'

  },
  itemiconButton: {
    padding: 10
  },
  itemInput: {
    marginLeft: 20,
    flex: 1,
  },

};


// Customizable Area End
