// Customizable Area Start
import React from "react";

import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    Button,
    Dimensions
} from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import SmsSettingsController, {
    Props,
    configJSON,
} from "./SmsSettingsController";

const width = Dimensions.get('screen').width

export default class SmsSettingRegistration extends SmsSettingsController {
    constructor(props: Props) {
        super(props);
    }


    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
                <TouchableWithoutFeedback
                    testID="keyboardID"
                    onPress={() => {
                        this.hideKeyboard();
                    }}>
                    {/* Merge Engine UI Engine Code */}
                    <View style={styles.MainContainer}>

                        <TextInput
                            testID="userName"
                            placeholder={configJSON.userName}
                            style={styles.InputFiledstyle}
                            {...this.handleRegistrationName}
                        />

                        <TextInput
                            testID="userEmail"
                            placeholder={configJSON.UserEMAIL}
                            style={styles.InputFiledstyle}
                            {...this.handleRegistrationMail}
                        />
                        <TextInput
                            testID="Pass"
                            placeholder={configJSON.Pass}
                            style={styles.InputFiledstyle}
                            {...this.handleRegistrationPass}
                        />

                        <TextInput
                            testID="confimPass"
                            placeholder={configJSON.ConfirmPass}
                            style={styles.InputFiledstyle}
                            {...this.handleRegistrationConfirmPass}
                        />

                        <ModalDropdown
                            testID="Modal_ID"
                            defaultTextStyle={styles.defaultGenderStyle}
                            style={[styles.dropdownStyle, {
                                borderWidth: 0.5,
                                borderRadius: 5, marginVertical: 10,
                            }]}
                            defaultValue={'Select role'}
                            textStyle={styles.genderText}
                            options={this.state.Option}
                            dropdownStyle={styles.genderdropdown}
                            dropdownTextStyle={styles.genderdropdownText}
                            showsVerticalScrollIndicator={false}
                            onSelect={(index: string, value: string) => { this.handleOnSelect(index, value) }
                            }
                        >
                        </ModalDropdown>
                        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                            <Button
                                testID="Submit"
                                title={'Registeration'}
                                {...this.handleRegistration}
                            />
                        </View>
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
        width: "100%",
    },
    MainContainer: {
        marginTop: "30%",
        padding: 10
    },
    InputFiledstyle: {
        width: width / 1.2,
        padding: 5, borderRadius: 5, borderWidth: 0.5, alignSelf: "center", marginVertical: 10
    },
    dropdownStyle: {
        padding: 8,
        justifyContent: "center",
        width: width / 1.2, alignSelf: "center"
    },
    defaultGenderStyle: {
        color: 'grey'
    },
    genderText: {
        marginLeft: 10,
        fontSize: 13,
        color: 'black',

    },
    genderdropdown: {
        marginTop: 10,
        height: 160,
        width: width / 2.2,
        marginLeft: 8,
        borderWidth: 0.5,
        borderColor: '#767676',

    },
    genderdropdownText: {
        fontSize: 16,


    },
});

// Customizable Area End
