import React from "react";

// Customizable Area Start
import {
  Container,
  Box,
  Button,
  Typography, 
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  CardActions,
  Avatar,
  Chip,
  CircularProgress
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});
// Customizable Area End

import WaitinglistController, {
  Props,
  Waiting,
} from "./WaitinglistController";

export default class Waitinglist extends WaitinglistController {
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
      <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid container spacing={2} style={webStyle.mainGrid}>
          <Grid item md={3} style={webStyle.gridCard} >
            <Card style={webStyle.gridCard} >
              <CardContent style={webStyle.leftCardContent}>
              <Box style={webStyle.backButtonContainer}>
                  <Button 
                    onClick={this.backToCataloguePage}
                    style={{backgroundColor:'#096fff', color:'#fff'}}
                    variant='contained'
                    size='small'
                    data-testid={`backToCataloguePage`}
                    startIcon={<ArrowBackIosIcon/>}
                    >
                    Back to Catalogue
                  </Button>
                </Box>
                <List >
                  <ListItem>
                    <Card variant="outlined" style={webStyle.leftListcard}>
                      <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                          Waiting List Orders
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          {
                            `Category - ${this.state.selectedProductName}`
                          }
                        </Typography>
                        <Typography variant="body2" component="p">
                          {
                            `Type - ${this.state.selectedProductCategory}`
                          }
                        </Typography>
                      </CardContent>
                    </Card>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={9} style={webStyle.gridCard} >
            {
              this.state.waitingListData.length>0 ? <Card style={{height:'100%', overflowY:"scroll"}}>
              <CardContent>
                <List >
              {
                this.state.waitingListData.map((item:Waiting, keyIdx:number) => {
                  return(
                    <ListItem key={keyIdx}>
                      <Card variant="outlined" style={{width:'100%'}}>
                        <CardContent>
                          <div style={webStyle.headerContainer}>
                            <Typography variant="h5" style={{marginRight:10}} >
                              {`Category - ${item.attributes.order_items[0].attributes.product_name}`}
                            </Typography>
                            <Chip
                              size='small'
                              label={item.attributes.status}
                              style={webStyle.chipWaiting}
                            />
                          </div>
                          <Typography variant="h6" color="textSecondary" >
                              {`Order Id - ${item.attributes.order_number}`}
                            </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {'Order Date' + this.returnNewDataTime(item.attributes.order_date)}
                          </Typography>
                        </CardContent>
                        <div style={{marginTop:5, marginLeft:15}}>
                          <Box style={webStyle.statusChip}>
                            <Avatar sizes="small" style={webStyle.statusConfirmed}>
                              {
                                item.attributes.order_items[0].attributes.quantity -
                                item.attributes.order_items[0].attributes.waiting_qty
                              }
                            </Avatar>
                            <Chip
                              size='small'
                              label="Confimed"
                              style={webStyle.chipConfirmed}
                            />
                          </Box>
                          <Box style={webStyle.statusChip}>
                            <Avatar style={webStyle.statusWaiting}>
                              {item.attributes.order_items[0].attributes.waiting_qty}
                            </Avatar>
                            <Chip
                              size='small'
                              label="Waiting"
                              style={webStyle.chipWaiting}
                            />
                          </Box>
                        </div>
                        <CardActions>
                          <Button 
                            color='primary'
                            variant='contained' 
                            style={{backgroundColor:'#096fff', color:'#fff'}}
                            size="small"
                            onClick={() => this.handleUpdateWaitingList(item.id)}
                            data-testid={`waitingListData${keyIdx}`}
                          >
                            Update
                          </Button>
                          <Button 
                            color='secondary' 
                            variant='contained' 
                            size="small"
                            data-testid={`productCancelBtn${keyIdx}`}
                            onClick={() => this.handleCancelOrder(item.id)}
                          >
                            Cancel
                          </Button>
                        </CardActions>
                      </Card>
                    </ListItem>
                  )
                })
              }
              </List>
              </CardContent>
              </Card>
              :
              <Card style={webStyle.gridCard} >
                <CardContent style={webStyle.noDataMessage}>
                  {this.state.noWaitingListOrderMessage === '' && <CircularProgress size={25} />}
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    {this.state.noWaitingListOrderMessage === '' ? 'Loading...' : this.state.noWaitingListOrderMessage}
                  </Typography>
                </CardContent>
              </Card>
            }
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainGrid:{
    padding:10, 
    height:'90vh'
  },
  gridCard:{
    height:'100%'
  },
  leftCardContent:{
    padding:0
  },
  backButtonContainer:{
    height:50, 
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center'
  },
  leftListcard:{
    minWidth:200
  },
  headerContainer:{
    display:'flex', 
    alignItems:'center'
  },
  statusContainer:{
    marginTop:5, 
    marginLeft:15
  },
  statusChip:{
    display:'flex', 
    alignItems:'center', 
    marginBottom:5
  },
  statusConfirmed:{
    backgroundColor:'#4caf50', 
    width:25, 
    height:25, 
    fontSize:'12px', 
    marginRight:5
  },
  chipConfirmed:{
    backgroundColor:'#4caf50', 
    color:'#ffffff'
  },
  chipWaiting:{
    backgroundColor:'#ff5722', 
    color:'#ffffff'
  },
  statusWaiting:{
    backgroundColor:'#ff5722', 
    width:25, 
    height:25, 
    fontSize:'12px', 
    marginRight:5
  },
  noDataMessage:{
    height:'100%', 
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center'
  }
};
// Customizable Area End
