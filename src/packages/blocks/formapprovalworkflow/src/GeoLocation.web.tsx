// Customizable Area Start
//@ts-nocheck
import React from "react";

import {
Box,
Button,
} from "@material-ui/core";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import {  Flag } from '../../MapSettings/src/assets';


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

import GeoLocationController, {
Props
} from "./GeoLocationController.web";

class GeoLocation extends GeoLocationController {
constructor(props: Props) {
super(props);
}


render() {
return (
<ThemeProvider theme={theme}>
        <h2 style={{textAlign:"center" , margin:"10px"}} >Geo Location</h2>
<Box>
<Map className="location-map" google={this.props.google} zoom={14} initialCenter={this.state.startLocation} center={this.state.startLocation} style={mapStyles}
>
<Marker position={this.state.startLocation}
className="pickup-marker"
  icon={{
      url: `${Flag}`,
      scaledSize: new this.props.google.maps.Size(40, 60),
    }}  
    />
<Marker position={this.state.endLocation} className="destination-marker" />
{this.state.routeCoordinates.length > 0 && <Polyline className="route"  path={this.state.routeCoordinates} />}
</Map>

<Box style={mapStyles} >
<Button onClick={this.handleCancel} variant="contained"  color="secondary" fullWidth >Cancel</Button>
</Box>
</Box>

</ThemeProvider>
);
}
}

const mapStyles = {
    width: '70%',
    height: '70%',
    margin:"auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

const webStyle = {
Mapimage: {
position: "relative",
height: "140vh",

} as React.CSSProperties, 
};
export default GoogleApiWrapper({
apiKey: 'AIzaSyD24Z2ObJBO-bVH33RyS2Dlj5Ht6SsfqIo'
})(GeoLocation);

// Customizable Area End
