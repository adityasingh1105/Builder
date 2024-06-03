 
//@ts-nocheck
import React from 'react'
  // Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native'
// Customizable Area End
// Customizable Area Start
import CustomInput from '../../../components/src/CustomInput';
import SignUpScreenOneController, { Props } from './SignUpScreenOneController';
import CheckBox from '@react-native-community/checkbox';
import ButtonComponent from '../../../components/src/ButtonComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import TitleComponent from '../../../components/src/TitleComponent';
// import WithI18nextHook from '../../../components/src/context/HOCHook';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  // Customizable Area End
export default class SignUpScreenOne extends SignUpScreenOneController {
  constructor(props: Props) {
    super(props);
      // Customizable Area Start
        // Customizable Area End
  }

  render() {
      // Customizable Area Start
    return <>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView keyboardVerticalOffset={1} >
            <View style={styles.ab98c6080a87811ed939975a068b6949a}>
              <TouchableOpacity testID='touch1' style={styles.ab98c6081a87811ed939975a068b6949a} onPress={() => this.GotoLogin()}>
                <Entypo name='chevron-thin-left' size={25} />
              </TouchableOpacity>
              <TouchableOpacity testID='touch2' style={styles.ab98c6082a87811ed939975a068b6949a} onPress={() => this.selectlng()}>
                <MaterialCommunityIcons name='google-translate' size={33} />
              </TouchableOpacity>

            </View>
            <View style={styles.childcontainer}>
              <TitleComponent text={this.props?.lan?.languageData?.translation?.enter_mobile_no} />
              <Text style={styles.ab98c8790a87811ed939975a068b6949a}>
                {this.props?.lan?.languageData?.translation?.phone_no}
              </Text>
              <View style={styles.ab98c8791a87811ed939975a068b6949a}>
                <View style={{borderWidth:1,width:50,alignContent:'center',alignItems:'center',borderColor: 'rgba(0, 0, 0, 0.1)',borderRadius: 5}}><Text style={{alignSelf:'center',marginTop:15}}>+1</Text></View>
                <CustomInput 
                testID="CustomInputID"
                style={styles.ab98c8793a87811ed939975a068b6949a} placeholder={this.props?.lan?.languageData?.translation?.SignUpScreenOne?.mobile_no} maxLength={10} contextMenuHidden={true} {...this.inputNumberProps} />
              </View>
              <View style={styles.ab98c8794a87811ed939975a068b6949a}>
                <View style={styles.ab98c8795a87811ed939975a068b6949a}>
                  {Platform.OS === 'ios' ? 
                  <CheckBox testID='check1' boxType="square" style={styles.abc} onAnimationType="fill" offAnimationType="fill" onFillColor="black" onCheckColor="white" onTintColor="black" value={this.state.isSelected}   onChange={() => this.setvalues()} />
                 : <CheckBox testID='check1' style={styles.abc} onAnimationType="fill" offAnimationType="fill" onFillColor="black" onCheckColor="white" onTintColor="black" value={this.state.isSelected} onChange={() => this.setvalues()} />}
                </View>
                <View>
                  <Text style={styles.tnc}>
                    {this.props?.lan?.languageData?.translation?.SignUpScreenOne?.checkbox_term}
                  </Text>
                </View>
              </View>

              <ButtonComponent 
              testID="nextbtn"
              text={this.props?.lan?.languageData?.translation?.common?.next_button} textStyle={{
              color: 'white',
              fontSize: 16
            }} onPress={() => this.callGetValidationApi(this.state.phoneNumber)} buttonStyle={[{
              borderRadius: 5,
              marginTop: 40,
              paddingVertical: 15,
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center'
            }, {
              backgroundColor: this.state.isSelected ? 'black' : '#ccc'
            }]} disabled={!this.state.isSelected} />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>;
  }
    // Customizable Area End

}
const styles = StyleSheet.create({
    // Customizable Area Start
  ab98c6080a87811ed939975a068b6949a: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ab98c6081a87811ed939975a068b6949a: {
    paddingLeft: 15
  },
  ab98c6082a87811ed939975a068b6949a: {
    paddingRight: 20
  },
  ab98c8790a87811ed939975a068b6949a: {
    marginTop: 35,
    color: 'grey',
    fontSize: 12
  },
  ab98c8791a87811ed939975a068b6949a: {
    paddingTop: 10,
    flexDirection: 'row',
    zIndex: 100
  },
  ab98c8792a87811ed939975a068b6949a: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    backgroundColor: 'white',
    zIndex: 100
  },
  ab98c8793a87811ed939975a068b6949a: {
    width: '66%',
    marginLeft: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5
  },
  ab98c8794a87811ed939975a068b6949a: {
    paddingTop: 20,
    flexDirection: 'row',
    width: '90%',
    zIndex: 1
  },
  ab98c8795a87811ed939975a068b6949a: {
    alignItems: 'flex-start',
    marginRight: 5
  },
  abc: {
    width: 20,
    height: 20,
    marginTop: 5,
    borderRadius: 15
  },
 
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  childcontainer: {
    padding: 15
  },
  tnc: {
    color: 'black',
    paddingLeft: 5,
    fontSize: 13,
    fontWeight: '300'
  }
    // Customizable Area End
});
// export default WithI18nextHook(SignUpScreenOne);