import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  FlatList
} from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons"

// Customizable Area End

import ItemGrouperController, {
  ProductGroupInterface,
  GroupInterface,
  Props,
} from "./ItemGrouperController"

export default class ItemGrouper extends ItemGrouperController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  // Customizable Area End
  renderGroup = ({ item, index }: { item: GroupInterface; index: number }) => {
    return (
      <View>
        <View style={styles.mainStyle}>
          <View style={{ width: "70%", paddingRight: 5 }}>
            <Text numberOfLines={1} style={{ color: "black" }}>{item.attributes.name}</Text>
          </View>
          <View style={styles.newGroupStyle}>
            <TouchableOpacity testID="hgTest" onPress={() => { this.handleGroupTest(item) }}>
              <Icons name="edit" size={20} />
            </TouchableOpacity>
            <TouchableOpacity testID="hgDelete" onPress={() => { this.handleGroupDelete(item.id) }}>
              <Icons name="delete" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              testID="isTrueBtn"
              onPress={() => {
                this.isTrue(item, index);
              }}
            >
              <Icons name="keyboard-arrow-down" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        
        {item.isSelected ? (
          <FlatList
            testID="productList"
            data={item.attributes.products}
            renderItem={this.renderItemProducts}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : null}
      </View>
    )
  }

  renderItemProducts = ({ item, index }: { item: ProductGroupInterface; index: number }) => {
    return (
      <View
        style={{
          marginVertical: 5,
          marginHorizontal: 5,
        }}
      >
        <Text style={{ color: '#5A5A5A' }}>{index + 1 + ". " + item.name}</Text>
      </View>
    )
  }

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <Button testID="addGroupBtn" title="Add To group" onPress={this.handleAddGroup} />
        <FlatList
          testID="groupList"
          data={this.state.GroupList}
          
          renderItem={this.renderGroup}
          ListEmptyComponent={<Text style={{color:"black"}}>No Groups Added</Text>}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView> 
    )
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
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
  grouplist: {
    fontSize: 30
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
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  mainStyle:{ flexDirection: 'row', 
  width: "100%", 
  marginTop: 10,
   paddingHorizontal: 5, 
   paddingVertical: 5, 
   borderWidth: 1, 
   borderColor: "gray"
  },
  CategoryStyle: {
    flexDirection: "row",
    borderWidth: 1,
    marginVertical: 20
  },
  IconStyle: {
    paddingRight: 10,
    alignSelf: "center"
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  newGroupStyle:{
    width: "30%",
     flexDirection: "row",
      justifyContent: "space-between"
},

  categoriesView: {
    width: 150,
    height: 200,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 5,
    margin: 6,
    justifyContent: "space-around",
    alignItems: "center"
  },
  categoriesText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "red",
    width: 150
  },
  CategoriesText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "red"

  },
  CategoriesImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 5
  },
  firstLetterCategory: {
    fontSize: 50,
    color: "blue"
  },

  container2: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 30,
  }
});
// Customizable Area End