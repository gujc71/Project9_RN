import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import firebase from 'react-native-firebase';

export default class HomeInputScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { board: {} };
  }  

  componentWillMount () {
    const board = this.props.navigation.getParam('board');
    if (board) this.setState({board:board});
  }

  submit2Save = () => {
    let board = this.state.board;

    if (board.brdno) {
      firebase.firestore().collection('boards').doc(board.brdno).update(board);  
    } else {
      const uid = firebase.auth().currentUser.uid;
      firebase.firestore().collection("users").doc(uid).get()
      .then(doc => {
        const user = doc.data();
        console.log(user);
        var newdoc = firebase.firestore().collection('boards').doc();
        board.brdwriter = user.usernm;
        board.brdno = newdoc.id;
        board.brddate = Date.now();
        board.uid = user.uid;
        newdoc.set(board);
      });
    }

    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {{alignItems: 'center'}}>
          <Text style = {styles.title}>Write your post!</Text>
        </View>

        <TextInput style = {styles.input} maxLength = {40} underlineColorAndroid = "transparent" placeholder = "Title" placeholderTextColor = "#9a73ef" autoCapitalize = "none"
          onChangeText={(brdtitle) => this.setState({board: {...this.state.board, brdtitle}})}
          value={this.state.board.brdtitle} />

        <TextInput style = {styles.inputArea} multiline = {true} numberOfLines = {10} editable = {true} underlineColorAndroid = "transparent" placeholder = "Contents" placeholderTextColor = "#9a73ef" autoCapitalize = "none"
          onChangeText={(brdcontents) => this.setState({board: {...this.state.board, brdcontents}})}
          value={this.state.board.brdcontents}/>

        <TouchableOpacity style = {styles.saveButton} onPress = {this.submit2Save}>
            <Text style = {styles.saveButtonText}> Save </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10
  },
  title: {
    fontSize: 18
  },
  input: {
    textAlignVertical: 'top',
    margin: 10,
    borderColor: '#7a42f4',
    borderWidth: 1,
    height: 40,
  },
  inputArea: {
    textAlignVertical: 'top',
    margin: 10,
    borderColor: '#7a42f4',
    borderWidth: 1,
    height: 100,
  },
  saveButton: {
    margin: 10,
    padding: 10,
    backgroundColor: '#7a42f4',
    height: 40,
    alignItems: 'center'
 },
 saveButtonText:{
    color: 'white'
 }
});
