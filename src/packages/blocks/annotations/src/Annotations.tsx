import React from "react";

import {
  StyleSheet,
  Text,
    TouchableOpacity,
  View,
  TextInput,
  Button,
  Platform,
  // Customizable Area Start
  Modal,
  FlatList
  // Customizable Area End
} from "react-native";
import Scale from "../../../components/src/Scale";

import AnnotationsController, {
  Props,
  configJSON,
  NoteArray,
} from "./AnnotationsController";


export default class Annotations extends AnnotationsController {

  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  
  // Customizable Area Start


  renderEditNote = (item:NoteArray[]) =>{
    const itemFromArray= item;
    const title = item[0]?.title;
    const description = item[0]?.description
    const notesArray = this.state.notes
    return (
      <View style={styles.container}>
        <Modal>
    
       {this.state.isEdit?
   
       (<View>
        <Modal>
          <View style={styles.container3}>
        <Text>edit enabled</Text>
        <TextInput
        value={this.state.title}
        onChangeText={text => this.handleOnChangeText(text, 'title')}
        placeholder='Title'
        style={[styles.input, styles.title1]}
      />
      <TextInput
        value={this.state.description}
        multiline
        placeholder='Note'
        style={[styles.input1, styles.desc]}
        onChangeText={text => this.handleOnChangeText(text, 'description')}
      />          
      
        <TouchableOpacity  style={styles.button} testID='saveButton'  onPress={()=>this.handleNoteUpdate(itemFromArray[0],notesArray)}><Text style={styles.buttontxt}>save</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} testID='cancelButton' onPress={()=>{this.setIsEdit(false)}}><Text style={styles.buttontxt}>cancel</Text></TouchableOpacity>
        </View>
        </Modal>
      </View>):
      
      (
        <View  style={styles.container3}>
       <Text style={styles.title}>{title}</Text>
       <Text style={styles.descriptionTxt}>{description}</Text>

      <TouchableOpacity style={styles.button} testID="editNote"  onPress={ ()=> this.handleEditPress(item[0])}><Text style={styles.buttontxt}>edit</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} testID="deleteNote"   onPress={()=>this.handleDelete(itemFromArray[0],notesArray)}><Text style={styles.buttontxt}> delete note</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} testID="goBack" onPress={()=>this.setRenderEditNote(false)}><Text style={styles.buttontxt}>go back</Text></TouchableOpacity>

      </View>
      )
      }

       </Modal>
      </View>
    );
  }

  

  renderNote = ( item1:NoteArray[]) => {
  const title = item1[0]?.title;
  const description = item1[0]?.description


    return (
      <TouchableOpacity  style={styles.container2} 
      testID="renderedReason"
      onPress={ ()=>{
      this.handleSetRenderEditNote(item1)
      }}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text numberOfLines={3}>{description}</Text>
      </TouchableOpacity>
    );
  };
  

  renderNoteInpuModal = (visible:boolean) => {

    
    
    return (
      <View>
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
          <TextInput
            value={this.state.title}
            testID="titleInput"
            onChangeText={text => this.handleOnChangeText(text, 'title')}
            placeholder='Title'
            style={[styles.input, styles.title1]}
          />
          <TextInput
            multiline
            testID="descInput"
            placeholder='Note'
            style={[styles.input1, styles.desc]}
            onChangeText={text => this.handleOnChangeText(text, 'description')}
            value={this.state.description}
          />
        </View>
     <Button title="save" testID ="onSubmit"  onPress={this.handleSubmit}/>
     {this.state.title.trim() || this.state.description.trim() ? (
     <Button title="cancel" onPress={this.handleModalClose}/>):null}

      </Modal>
      </View>
    )
  }

  // Customizable Area End

  render() {
    return (
    //Customizable Area Start
      <View style={styles.container}>
       <Button testID="createNotes" title="create notes" onPress={this.handleNoteStateTrue}/>
       {this.state.notes?(<FlatList testID= "Flatlist" numColumns={2} data={this.state.notes} keyExtractor={item => item.id.toString()} renderItem={({item})=>this.renderNote([item])}/>
):null}
       {this.renderNoteInpuModal(this.state.openModal)}
       {this.state.renderEditNote?this.renderEditNote(this.state.item):null}

      </View>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },

  container2: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: '#d8e0ed',
    margin:7,
    padding:7,
    borderRadius:6
  
  },
  button:{
backgroundColor:"#b07c6a",
borderRadius:5,
padding:8,
paddingLeft:10,
paddingRight:10,
margin:5
  },
  buttontxt:{color:"white"},
  buttons:{
    justifyContent:"space-around",
display:"flex",
flexDirection:"row",
flexWrap:"nowrap",
alignContent:"space-around",
alignItems:"flex-start"

  },
  container3: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: '#d8e0ed',
    margin:7,
    borderRadius:6,
  
  },
  title: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight:"bold",
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 12,
    textAlign: "left",
    marginVertical: 16,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  descriptionTxt: {
  
    marginBottom: 12,
    fontSize: 12,
    textAlign: "left",
    marginVertical: 8,
    marginLeft:3,
    marginRight:3
  },

  comentBox: {
    height: Scale(105),
    borderRadius: Scale(10),
    backgroundColor: "#F2F2F7",
    marginTop: Scale(10),
  },

 
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  input: {
margin:3,
    fontSize: 20,

  },
  input1: {
    margin:3,
    fontSize: 15,
    height:200
  },
  title1: {
    height: 40,
    // marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});
// Customizable Area End
