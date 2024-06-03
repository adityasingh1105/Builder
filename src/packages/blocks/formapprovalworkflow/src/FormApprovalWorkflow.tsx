// Customizable Area Start

//@ts-nocheck
import React from "react"; 
import { StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity,KeyboardAvoidingView, StatusBar } from "react-native"; 
// import MapInput from '../../../components/src/MapInput';
import { heightPercentageToDP } from "react-native-responsive-screen"; 
import FormApprovalWorkflowController from "./FormApprovalWorkflowController";
import { Close,Maplogo,Plus } from "./assets";
export default class FormApprovalWorkflow extends FormApprovalWorkflowController {
  render() {
    return <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootcontainer}>
        <KeyboardAvoidingView style={styles.rootcontainer}>
          <View style={styles.rootcontainer}>
            <View style={styles.root}>
              <View style={styles.ac9f65620c49c11edbab44b47c6f0d623}>
                <View style={styles.closeIcon} >
                  <Image style={styles.ac9f65621c49c11edbab44b47c6f0d623} source={Close} />
                </View>

                <View style={styles.mapIcon}>
                  <Image style={styles.ac9f65622c49c11edbab44b47c6f0d623} source={Maplogo} />
                </View>
              </View>
              <View style={styles.ac9f65623c49c11edbab44b47c6f0d623}>
                <View style={styles.ac9f65624c49c11edbab44b47c6f0d623}>
                  <View style={styles.ac9f67d30c49c11edbab44b47c6f0d623}></View>
                </View>
                <TouchableOpacity testID={'getLocationbtn'} style={styles.currentLocation} onPress={() => this.getLocation()}>
                  <Text style={styles.currentText}>Current Location</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.line} />
              <View style={styles.ac9f67d31c49c11edbab44b47c6f0d623}>
                <View style={styles.enterDestinationBox}>
                  <View style={styles.destinationLocation}>
                    <View style={styles.ac9f67d32c49c11edbab44b47c6f0d623}>
                      <View style={styles.ac9f67d33c49c11edbab44b47c6f0d623}></View>
                    </View>
                    <View style={styles.ac9f67d34c49c11edbab44b47c6f0d623}>
                    <View style={styles.root2}>
                                {/* <MapInput testID={'searchDestination'} notifyChange={( location) => this.getCoordsFromName(location)} /> */}
                            </View>
                        </View>
                  </View>
                  <View style={styles.lineVertical} />
                  <View style={styles.addIcon}>
                    <Image style={styles.ac9f6a440c49c11edbab44b47c6f0d623} source={Plus} // style={styles.plusIcon}
                    />
                  </View>
                </View>
              </View>
            </View>
            
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>; 
  }
}
const styles = StyleSheet.create({
  ac9f62f10c49c11edbab44b47c6f0d623: {
    width: '80%',
    marginLeft: 10
  },
  ac9f62f11c49c11edbab44b47c6f0d623: {
    height: 2,
    width: "100%",
    backgroundColor: "#e3e3e3",
    marginLeft: 60,
    marginRight: 30
  },
  ac9f65620c49c11edbab44b47c6f0d623: {
    marginTop: 20,
    flexDirection: 'row',
    padding: 0
  },
  ac9f65621c49c11edbab44b47c6f0d623: {
    width: 30,
    height: 30,
    marginLeft: 5
  },
  ac9f65622c49c11edbab44b47c6f0d623: {
    width: 30,
    height: 30,
    marginRight: 5
  },
  ac9f65623c49c11edbab44b47c6f0d623: {
    flexDirection: 'row',
    flex: 0,
    padding: 10,
    marginTop: 0
  },
  ac9f65624c49c11edbab44b47c6f0d623: {
    alignContent: 'center',
    justifyContent: 'center'
  },
  ac9f67d30c49c11edbab44b47c6f0d623: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#000',
    marginLeft: 10,
    marginTop: 25
  },
  ac9f67d31c49c11edbab44b47c6f0d623: {
  },
  ac9f67d32c49c11edbab44b47c6f0d623: {
    alignContent: 'center',
    justifyContent: 'center',padding:10,
  },
  ac9f67d33c49c11edbab44b47c6f0d623: {
    padding: 8,
    borderRadius: 0,
    backgroundColor: 'black',
    marginLeft: -10,marginTop:-750,position:'relative'
  },
  ac9f67d34c49c11edbab44b47c6f0d623: {
    width:400,
    marginTop:10
  },
  aea34e231c49c11edbab44b47c6f0d623: {
    marginTop: -20,
    backgroundColor: 'blue',
    width:250,marginLeft:-20
},
  ac9f6a440c49c11edbab44b47c6f0d623: {
    width: 30,
    height: 30
  },
  rootcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 0
  },
  root: {
    flex: 1,
    height: heightPercentageToDP('25%'),
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: "#fff",
    shadowColor: "#858585",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 15 // overflow: "hidden",
  },
  root2: {
    height: "100%",
    backgroundColor: "#fff",

},
  main: {
    flex: 3,
    backgroundColor: "white",
    marginTop: 20,marginLeft:-10
  },
  mapclose: {
    flexDirection: "row",
    marginVertical: 16,
    alignItems: "center",
    marginBottom: 20 // width: "100%",

  },
  closeIcon: {
    flex: 1,
    marginLeft: 5
  },
  mapIcon: {
    right: 10
  },
  plusIcon: {
    width: 30,
    height: 30
  },
  line: {
    height: 1,
    backgroundColor: "#bebebe",
    marginHorizontal: 0,
    marginTop: -5,
    width: '80%',
    marginLeft: 55
  },
  lineVertical: {
    height: 25,
    width: 2,
    backgroundColor: "#d9d9d9",
    marginTop: 5,
    marginLeft: 90
  },
  locationBox: {
    flexDirection: "row"
  },
  destinationIcon: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 6
  },
  enterDestinationBox: {
    flexDirection: "row",
    marginTop: -10,
    padding: 10,
    marginLeft: 10
  },
  addIcon: {
    marginTop: 0,
    paddingLeft: 0,
    alignContent: 'center',
    marginLeft: 20
  },
  currentLocation: {

    padding: 10
  },
  destinationLocation: {
    flexDirection: 'row',

    width: '55%'
  },
  lBox: {
    textAlign: "left"
  },
  currentText: {
    fontSize: 18,
    color: "#79ccd0",
    paddingLeft: 10,
    marginTop: 20,
    marginLeft: 0
  },
  destinationText: {
    fontSize: 18,
    width: '100%',
    marginLeft: 10
  },
  savedAddressBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "white",
    elevation: 15,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    shadowColor: "#858585",
    shadowOpacity: 0.15,
    shadowRadius: 5.46
  },
  homeIcon: {
    height: 35,
    width: 35,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: "#e5e5e5",
    marginLeft: 15,
    margin: 15
  },
  savedAddressText: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold"
  },
  rightArrow: {
    position: "absolute",
    right: 12,
    height: 35,
    width: 35
  },
  destinationHistory: {
    flex: 6
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    margin: 6,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%"
  },
  title: {
    fontSize: 15,
    textAlign: "left"
  },
  value: {
    fontSize: 16,
    color: "#dbdbdb"
  },
  locationIcon: {
    left: 0,
    width: 30,
    height: 30
  },
  destinationHistoryBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  },
  historyIcon: {
    height: 35,
    width: 35,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: "#e5e5e5",
    marginLeft: 15,
    margin: 15
  },
  historyText: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold"
  } 

});


// Customizable Area End
