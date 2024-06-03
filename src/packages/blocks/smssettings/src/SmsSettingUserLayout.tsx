// Customizable Area Start
import React from "react";

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    FlatList, Switch
} from "react-native";

import SmsSettingsController, {
    Props,
} from "./SmsSettingsController";

const width = Dimensions.get('screen').width


export default class SmsSettingUserLayout extends SmsSettingsController {
    constructor(props: Props) {
        super(props);
    }

    async componentDidMount(): Promise<void> {
        this.SettingsList()
    }

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="always" style={styles.stylecontainer}>
                <View
                    testID="keybord"
                >
                    {/* Merge Engine UI Engine Code */}
                    <Text style={{ textAlign: "center", marginVertical: 10 }}>{'User Settings'}</Text>


                    <View style={styles.StylemainContainer}>
                        <FlatList
                            testID="List_ID"
                            data={this.state.Data}
                            renderItem={({ item, index }) => {
                                const ITEM = item?.attributes
                                return (
                                    <View style={{ alignSelf: "center", borderWidth: 0.5, marginVertical: 10, width: width / 1.2, borderRadius: 10 }}>
                                        <View style={{ ...styles.toggle }}>
                                            <Text>{ITEM?.title}</Text>
                                            <Switch
                                                testID="Switch_ID"
                                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                                onValueChange={() => this.handleUserSwitch(ITEM)}
                                                value={ITEM?.togle}
                                            />
                                        </View>
                                        {ITEM?.subsetting.map((item) => {
                                            return (
                                                <View style={{ width: width / 1.5, flexDirection: "row", justifyContent: 'space-around', alignItems: 'center', marginVertical: 5 }}>
                                                    <Text>{item?.title}</Text>
                                                    <Switch
                                                        testID={"SubSwitch_ID-" + item.id}
                                                        onValueChange={() => this.handleUserSwitch(item)}
                                                        value={item?.togle}
                                                        disabled={ITEM?.togle == false ? true : false}
                                                    />
                                                </View>
                                            )
                                        })
                                        }
                                    </View>
                                )
                            }}
                        />


                    </View>
                    {/* Merge Engine UI Engine Code */}
                </View>
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
        padding: 5, borderRadius: 5, borderWidth: 0.5, alignSelf: "center", marginVertical: 10
    },
    BTN: {
        width: width / 6, height: 50, borderWidth: 0.5, backgroundColor: "#2596be", justifyContent: "center",
        alignItems: "center"
    },
    toggle: {
        width: width / 1.2, flexDirection: "row", backgroundColor: "#D3D3D3", justifyContent: "space-between", height: 50, alignItems: "center", paddingHorizontal: 10, borderRadius: 10
    }

});

// Customizable Area End
