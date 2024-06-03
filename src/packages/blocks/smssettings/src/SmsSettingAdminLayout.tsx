// Customizable Area Start
import React from "react";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
    Dimensions,
    FlatList,
    Switch,
    Image
} from "react-native";
import * as DeleteIcon from "./assets";
import SmsSettingsController, {
    Props,
    configJSON,
} from "./SmsSettingsController";

const width = Dimensions.get('screen').width





export default class SmsSettingAdminLayout extends SmsSettingsController {
    constructor(props: Props) {
        super(props);
    }



    async componentDidMount(): Promise<void> {
        this.SettingsList()
    }


    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="always" style={styles.stylecontainer}>
                <TouchableOpacity
                    testID="keybord"
                    onPress={() => {
                        this.hideKeyboard();
                    }}
                >
                    {/* Merge Engine UI Engine Code */}
                    <Text style={{ textAlign: "center", marginVertical: 10 }}>{'Admin Settings'}</Text>
                    <View style={styles.StylemainContainer}>
                        <View style={{ flexDirection: "row", width: width / 1.2, alignSelf: "center" }}>

                            <TextInput
                                testID="createSettingID"
                                placeholder="Create Settings"
                                style={{ width: width / 1.5, padding: 10, alignSelf: "center", borderWidth: 0.5 }}
                                {...this.handlePost}
                            />
                            <TouchableOpacity
                                style={{ ...styles.BTN }}
                                testID="BTNID"
                                {...this.handleCreateSetting}
                            >
                                <Text style={{ color: '#ffff' }}>{'Submit'}</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            <FlatList
                                testID="Setting_List"
                                data={this.state.Data}
                                renderItem={({ item, index }) => {
                                    const ITEM = item?.attributes
                                    return (
                                        <View style={{ width: width / 1.3, alignSelf: "center", justifyContent: 'center', marginVertical: 10 }}>
                                            <View key={item.id} style={{ borderWidth: 0.5, }}>
                                                <View style={{ flexDirection: "row", width: width / 1.3, justifyContent: "space-between", backgroundColor: "#D3D3D3", padding: 10 }}>
                                                    <Text>{ITEM.title}</Text>
                                                    <View style={{ flexDirection: 'row', width: width / 5, marginRight: 30, justifyContent: "space-between", }} >
                                                        <TouchableOpacity
                                                            testID="Delete_BTN"
                                                            onPress={() => {this.DeleteSettings(ITEM.id) }}>
                                                            <Image source={DeleteIcon.DeleteIcon} style={{ width: 20, height: 20, top: 5 }} resizeMode="contain" />
                                                        </TouchableOpacity>
                                                        <Switch
                                                            testID="Switch_ID"
                                                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                                                            ios_backgroundColor="#3e3e3e"
                                                            onValueChange={() => this.handleUserSwitch(ITEM)}
                                                            value={ITEM.togle}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                                    <TextInput
                                                        testID="Subsetting_ID"
                                                        value={this.state.SubSettings[index]}
                                                        placeholder={configJSON.SubSettingPlace}
                                                        onChangeText={(text: string) => this.handleSubSetingTexts(index, text)}
                                                        style={{ ...styles.SubSEttings }}
                                                    />
                                                    <TouchableOpacity
                                                        style={{ ...styles.BTN2 }}
                                                        testID="BTNID2"
                                                        onPress={() => {
                                                            this.SubSettingsFun(ITEM.id)
                                                        }}
                                                    >
                                                        <Text style={{ color: '#ffff', marginTop: 2 }}>{'Submit'}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {ITEM.subsetting.map((item) => {
                                                    return (
                                                        <View style={{ flexDirection: "row", width: width / 1.4, justifyContent: "space-around" }}>
                                                            <Text>{item?.title}</Text>
                                                            <View style={{ flexDirection: "row", width: width / 6, marginRight: 30, justifyContent: "space-between", }}>
                                                                <Switch
                                                                    testID={"SubSetting_toggle-" + item.id}
                                                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                                                    ios_backgroundColor="#3e3e3e"
                                                                    onValueChange={() => this.handleUserSwitch(item)}
                                                                    value={item.togle}
                                                                    disabled={ITEM.togle == false ? true : false}
                                                                />

                                                                <TouchableOpacity
                                                                testID={"childDeleteBTN-" + item.id}
                                                                 onPress={() => { this.DeleteSettings(item.id)}}>
                                                                    <Image source={DeleteIcon.DeleteIcon} style={{ width: 20, height: 20, top: 5 }} resizeMode="contain" />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </ScrollView>
                    </View>
                    {/* Merge Engine UI Engine Code */}
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    InputFiledstyle: {
        width: width / 1.1,
        padding: 5, borderRadius: 5, borderWidth: 0.5, alignSelf: "center", marginVertical: 10
    },
    StylemainContainer: {
        width: width,
        alignSelf: 'center'
    },
    SubSEttings: {
        width: width / 2, borderWidth: 0.5,
        padding: 1, marginVertical: 5, paddingLeft: 10
    },
    stylecontainer: {
        flex: 1,
        padding: 16,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        backgroundColor: "#ffffffff",
    },
    BTN2: {
        width: width / 6, height: 30, borderWidth: 0.5, backgroundColor: "#2596be", alignItems: "center", alignContent: "center", marginTop: 5

    },
    BTN: {
        width: width / 6, height: 50, borderWidth: 0.5, backgroundColor: "#2596be", justifyContent: "center",
        alignItems: "center"
    },

});

// Customizable Area End
