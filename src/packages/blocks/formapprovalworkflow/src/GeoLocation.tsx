// Customizable Area Start

//@ts-nocheck
import React from "react";
import { StyleSheet, Dimensions, Platform, View, Text, Image, ActivityIndicator } from "react-native";
import MapViewDirections from 'react-native-maps-directions';
import MapView ,{Marker } from 'react-native-maps';
import { heightPercentageToDP } from "react-native-responsive-screen";
const viewportHeight = Dimensions.get("window").height;
const viewportWidth = Dimensions.get("window").width;
import GeoLocationController, { Props } from "./GeoLocationController";
import SwipeButton from 'rn-swipe-button';
import { Close, destinationPin, startpin } from "./assets";



export default class GeoLocation extends GeoLocationController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return <View style={styles.container}>
      <View style={styles.a59ae823bce1411eda51867c9d6a1ec35}>
        <Text>{this.props.navigation.state?.params.sourceAddressinword}<Text style={styles.a59ae823cce1411eda51867c9d6a1ec35}> {'->'} </Text>{this.props.navigation?.state?.params?.destinationaddress}</Text></View>
      {this.state.latitude?
      (
        <MapView style={styles.maps} 
        initialRegion={{
          latitude:  this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121
        }}>
          <MapViewDirections origin={this.state.sourceMarker} destination={this.state.destinationMArker} strokeWidth={5} apikey={'AIzaSyD24Z2ObJBO-bVH33RyS2Dlj5Ht6SsfqIo'} // insert your API Key here
            />
          <Marker.Animated coordinate={this.state.sourceMarker}
          >
            <Image source={startpin} style={styles.a59aea940ce1411eda51867c9d6a1ec35} />
          </Marker.Animated>
          <Marker.Animated coordinate={this.state.destinationMArker}>
            <Image resizeMode='contain' source={destinationPin} style={styles.a59aea941ce1411eda51867c9d6a1ec35} />
          </Marker.Animated>
        </MapView>
      )
    :null}
      <View style={styles.model}>
        {this.state.loading ? <View style={styles.modalContent2}>
          <View style={styles.a59aea943ce1411eda51867c9d6a1ec35}>
            <ActivityIndicator visible={this.state.loading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} animating={true} size={"large"} color="#c2c2c2" />
            <Text style={styles.a59aea944ce1411eda51867c9d6a1ec35}>LOCATING DRIVES NEAR YOU</Text>
          </View>
          <SwipeButton 
           testID={'cancelTrip'}
           containerStyles={{borderRadius: 5,marginTop:15,borderColor:'#c2c2c2'}}
           height={45}
            onSwipeSuccess={() => this.cancelTrip()}
            railBackgroundColor="#c2c2c2"
            railBorderColor='#c2c2c2'
            thumbIconBackgroundColor="#c2c2c2"
            railFillBackgroundColor='#c2c2c2'
            railFillBorderColor='#c2c2c2'
            thumbIconBorderColor='#fff'
            thumbIconImageSource={Close}
            thumbIconStyles={{borderRadius: 5,borderColor:'#c2c2c2'}}
            disabledThumbIconBorderColor={true}
            title="SLIDE TO CANCEL"
          />
        </View> : <>
        </>}{this.state.loading2 ? <View style={styles.a59aea946ce1411eda51867c9d6a1ec35}>
          <ActivityIndicator visible={this.state.loading2} textContent={'Loading...'} textStyle={{
            transform: [{
              scaleX: 2
            }, {
              scaleY: 2
            }]
          }} animating={true} size={"large"} color="#000" />
        </View> : <></>}
      </View>
    </View>
  } 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
    bottom: 0
  },
  bottomModal3: {
    alignItems: 'center'
  },
  model: {
    justifyContent: "flex-end",
    margin: 0,
    borderRadius: 14,
    borderColor: "rgba(0, 0, 0, 0.1)",
    padding: 0,
    bottom: heightPercentageToDP(30)
  },
  map: {
    width: viewportWidth,
    height: viewportHeight,
    position: "absolute",
    top: 0,
    bottom: 0
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  bottomModal2: {
    backgroundColor: 'black'
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginTop: 20
  },
  button2: {
    backgroundColor: "#c2c2c2",
    padding: 10,
    margin: 4,
    justifyContent: 'flex-start',
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginTop: 10,
    flexDirection: 'row',
    flex: 0
  },
  button3: {
    width:'90%',
    backgroundColor: "yellow",
  },
  rowContainer:{
    padding:15
  },
  note:{
    alignSelf:'center',marginRight:25
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 14,
    borderColor: "rgba(0, 0, 0, 0.1)",
    padding: 20,
    height: heightPercentageToDP('35%'),
    bottom: 0
  },
  modalContent2: {
    backgroundColor: "white",
    borderRadius: 14,
    borderColor: "rgba(0, 0, 0, 0.1)",
    padding: 20,
    height: heightPercentageToDP('40%'),
    bottom: 0
  },
  spinnerTextStyle: {
    color: 'black',
    marginTop: 20
  },
  pinView: {
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15
  },
  titleStyle: {
    marginLeft: -30,
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
    textAlign: 'center',
    alignContent: 'center'
  },
  drivercancelbutton: {
    marginTop: heightPercentageToDP(28),
    width: '85%',
    // height: '22%',
    backgroundColor: "black",
    paddingLeft: 8,
    marginLeft: 28,
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    flexDirection: 'row',
    padding: 5
  },
  a59aea940ce1411eda51867c9d6a1ec35:{
    width:40,
    height:40
  },
  a59aea941ce1411eda51867c9d6a1ec35:{
    width:40,
    height:40
  },
  a59aea943ce1411eda51867c9d6a1ec35: {
    marginTop: 0,
    alignItems: 'center'
  },
  a59aea944ce1411eda51867c9d6a1ec35: {
    color: "grey",
    fontSize: 15,
    marginTop: 10
  },
  a59aea945ce1411eda51867c9d6a1ec35: {
    marginTop: 10
  },
  a59aea946ce1411eda51867c9d6a1ec35: {
    marginTop: 0,
    alignItems: 'center'
  },
  a59aea947ce1411eda51867c9d6a1ec35: {
    height: 200,
    width: '100%',
    borderRadius: 5
  },
  a59aea948ce1411eda51867c9d6a1ec35: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  a59aea949ce1411eda51867c9d6a1ec35: {
    flex: 0,
    alignItems: 'center',
    alignSelf: 'center'
  },
  a59ae8239ce1411eda51867c9d6a1ec35: {
    width: 30,
    height: 30,
    marginLeft: 10,
    backgroundColor: '#fff',
    marginTop:8
  },
  a59ae823ace1411eda51867c9d6a1ec35: {
    color: 'white',
    flex: 1,
    marginLeft: -20,
    textAlign: 'center'
  },
  a59ae823bce1411eda51867c9d6a1ec35: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#fff',
    shadowColor: "#858585",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: .8,
    shadowRadius: 6.46,
    elevation: 15,
    padding: 15,
    top: 40,
    borderRadius: 10,
    width: '80%',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
});
 

// Customizable Area End
