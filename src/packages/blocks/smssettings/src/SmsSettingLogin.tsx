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


export default class SmsSettingLogin extends SmsSettingsController {
    constructor(props: Props) {
        super(props);
    }


    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
                <TouchableWithoutFeedback
                    testID="keybord"
                    onPress={() => {
                        this.hideKeyboard();
                    }}
                >
                    {/* Merge Engine UI Engine Code */}
                    <View style={styles.mainContainer}>




                        <Text style={{ textAlign: "center", marginVertical: 10 }}>{'Login as User'}</Text>



                        <TextInput
                            testID="userName"
                            placeholder={configJSON.userMail}
                            style={styles.InputFiled}
                            {...this.handleUsername}
                        />
                        <TextInput
                            testID="Password"
                            placeholder={configJSON.pass}
                            style={styles.InputFiled}
                            secureTextEntry
                            {...this.handlePassword}
                        />

                        <Button
                            testID="SubmitBTN"
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
    container: {
        flex: 1,
        padding: 16,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        backgroundColor: "#ffffffff",
        alignSelf: "center"
    },
    mainContainer: {
        width: width,
        alignSelf: 'center'
    },
    InputFiled: {
        width: width / 1.1,
        padding: 5, borderRadius: 5, borderWidth: 0.5,
        alignSelf: "center", marginVertical: 10, paddingLeft: 10
    }

});

// Customizable Area End
