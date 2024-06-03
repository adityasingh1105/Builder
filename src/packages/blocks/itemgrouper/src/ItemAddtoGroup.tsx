import React from "react";

// Customizable Area Start
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Button,
    TextInput,
    Modal

} from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons"
import Icon from "react-native-vector-icons/FontAwesome"
import CheckBox from "@react-native-community/checkbox";




// Customizable Area End

import ItemAddtoGroupController, {
    Props,
    CategoriesInterface,
    ProductTest,
    SubCatTest,
} from "./ItemAddtoGroupController"


export default class ItemAddtoGroup extends ItemAddtoGroupController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start

    modalShow = () => {

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}>

                <View style={styles.ModalStyle}>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            value={this.state.isEdit ? this.state.groupName : this.state.txtInputOfGroup}
                            onChangeText={this.handleInputTag}
                            editable={!this.state.isEdit}
                        />
                        <Button
                            testID="saveBtn"
                            title="Save"
                            onPress={this.handleSaveGroup}
                        />
                        <TouchableOpacity
                            testID="hideModalPress"
                            onPress={this.hideModal}>
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>


                </View>

            </Modal>

        )
    }


    renderItemSubCategories = ({ item, index }: { item: SubCatTest; index: number }) => {
        return (
            <View>
                <View
                    style={styles.constantStyle}>
                    <Text style={{ fontSize: 20 }}>{item.attributes.name}</Text>
                    <TouchableOpacity testID="subCatPress" onPress={() => this.onPressSub(item)}>
                        <Icons name="keyboard-arrow-down" size={30} />
                    </TouchableOpacity>
                </View>

                {item.isSelected ? (
                    <FlatList
                        testID="productList"
                        data={this.state.productList}
                        ListEmptyComponent={()=>{return <Text>No Products Available</Text>}}
                        renderItem={this.renderItemProduct}
                    />
                ) : null}

            </View>
        );
    };

    renderItemProduct = ({ item, index }: { item: ProductTest; index: number }) => {
        
        const isSelected = this.isItemSelected(item.id);
        return (
            <View>
                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                    <CheckBox testID="productItemCheck" value={isSelected} onValueChange={()=>this.handleSelectItem(item.id)} />
                    <Text>{item.attributes.name}</Text>
                </View>
            </View>
        );
    };

    renderListItem = ({ item, index }: { item: CategoriesInterface; index: number }) => (
        
        <View>
            <View
                style={styles.ListItemStyle} >
           <Text style={{ fontSize: 24 }}>{item.attributes.name}</Text>
                <TouchableOpacity testID="downArrowBtn" onPress={()=>this.isTrue(item, index)}>
                    <Icons name="keyboard-arrow-down" size={30} />
                </TouchableOpacity>
            </View>

             {item.isSelected ? (
                <FlatList
                    testID="subCategoryList"
                    data={this.state.subcategories}
                    renderItem={this.renderItemSubCategories}
                    
                    keyExtractor={(item) => item.id.toString()}
                />
                
             ) : null} 
        </View>
    );

    // Customizable Area End

    render() {
        // Customizable Area Start
        // Merge Engine - render - Start
        const hasSelectedItems = this.state.SelectedProduct && this.state.SelectedProduct.length > 0;

        return (

            <View>
                <View style={{ width: 100, justifyContent: "flex-end", alignSelf: "flex-end" }}>
                    <Button testID="modalSampleBtn" title="Save" disabled={!hasSelectedItems} onPress={this.modalSample} />
                </View>
                <View style={styles.CategoryStyle}>

                    <TextInput
                        testID="searchInput"
                        style={{ flex: 1 }}
                        underlineColorAndroid="transparent"
                        placeholder="Search Here"
                        value={this.state.txtInputValue}
                        onChangeText={this.handleChangeText}
                    />
                    <Icon name="search" size={30} color="#000000" style={styles.IconStyle} />
                </View>

                <FlatList
                    testID="searchList"
                    data={this.state.searchQuery}
                    extraData={this.state}
                    renderItem={this.renderListItem}
                />
                {this.modalShow()}
            </View>

        );
        // Merge Engine - render - End
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //padding: 16,
    },
    title: {
        marginBottom: 32,
        fontSize: 16,
        textAlign: "left",
        marginVertical: 8,
    },
    body: {
        marginBottom: 32,
        fontSize: 16,
        textAlign: "left",
        marginVertical: 8,
    },
    bgPasswordContainer: {
        flexDirection: "row",
        backgroundColor: "#00000000",
        marginBottom: 16,
        borderBottomWidth: 1,
        borderColor: "#767676",
        borderRadius: 2,
        padding: 10,
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: "#009688",
        backgroundColor: "#FFFFFF",
    },
    ListItemStyle:{
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        marginHorizontal: 5,
        paddingHorizontal: 5,
        alignItems: "center",
        backgroundColor: "#B8B8B8"

    },
    CategoryStyle: {
        flexDirection: "row",
        borderWidth: 1,
        marginVertical: 20,
        marginHorizontal: 10,
        borderRadius: 5
    },
    constantStyle:{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 5,
            paddingHorizontal: 5,
            borderWidth: 1,
            alignItems: "center",
            backgroundColor: "#D4D4D4"
        },
    
    IconStyle: {
        paddingRight: 10,
        alignSelf: "center",
    },
    bgMobileInput: {
        flex: 1,
    },
    showHide: {
        alignSelf: "center",
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 20,
        paddingHorizontal: 10
    },
    categoriesView: {
        width: 150,
        height: 200,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 5,
        margin: 6,
        justifyContent: "space-around",
        alignItems: "center",
    },
    categoriesText: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "red",
        width: 150,
    },
    ModalStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        alignSelf: "center",
        height: 260,
        borderRadius: 20,
        padding: 35,
        marginTop: 60,
        backgroundColor: "white",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
},
    CategoriesText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "red",
    },
    CategoriesImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 5,
    },
    firstLetterCategory: {
        fontSize: 50,
        color: "blue",
    },
    textStyle: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10
    },
    container2: {
        flex: 1,
        alignItems: "center",
        paddingBottom: 30,
    },
});
// Customizable Area End