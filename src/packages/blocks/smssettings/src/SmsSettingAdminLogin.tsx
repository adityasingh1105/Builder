// Customizable Area Start
import React from "react";

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    Button,
    Dimensions
} from "react-native";

import SmsSettingsController, {
    Props,
    configJSON,
} from "./SmsSettingsController";

const width = Dimensions.get('screen').width


export default class SmsSettingAdminLogin extends SmsSettingsController {

    constructor(props: Props) {
        super(props);
    }


    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="always" style={styles.stylecontainer}>
                <TouchableWithoutFeedback
                    testID="keybord"
                    onPress={() => {
                        this.hideKeyboard();
                    }}
                >
                    {/* Merge Engine UI Engine Code */}
                    <View style={styles.StylemainContainer}>
                        <Text style={{ textAlign: "center", marginVertical: 10 }}>{'Login as Admin'}</Text>
                        <TextInput
                            testID="AdminuserName"
                            placeholder={configJSON.userMail}
                            style={styles.InputFiledstyle}
                            {...this.handleUsername}
                        />
                        <TextInput
                            testID="AdminPassword"
                            placeholder={configJSON.pass}
                            style={styles.InputFiledstyle}
                            secureTextEntry
                            {...this.handlePassword}
                        />

                        <Button
                            testID="AdminSubmitBTN"
                            title={configJSON.submit}
                            {...this.handleSubmit}
                        />
                    </View>
                    {/* Merge Engine UI Engine Code */}
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    StylemainContainer: {
        width: width,
        alignSelf: 'center'
    },
    stylecontainer: {
        flex: 1,
        padding: 16,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        backgroundColor: "#ffffffff",
    },
    InputFiledstyle: {
        width: width / 1.1,
        padding: 5, borderRadius: 5, borderWidth: 0.5, alignSelf: "center", marginVertical: 10, paddingLeft: 10
    }

});

// Customizable Area End
