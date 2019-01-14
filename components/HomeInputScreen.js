import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default class HomeInputScreen extends React.Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <View style = {{alignItems: 'center'}}>
          <Text style = {styles.title}>Write your post!</Text>
        </View>

        <TextInput style = {styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          maxLength = {40}
          underlineColorAndroid = "transparent" placeholder = "Title" placeholderTextColor = "#9a73ef" autoCapitalize = "none"/>

        <TextInput style = {styles.inputArea}
          multiline = {true}
          numberOfLines = {10}
          onChangeText={(Contents) => this.setState({Contents})}
          value={this.state.Contents}
          editable = {true} 
          underlineColorAndroid = "transparent" placeholder = "Contents" placeholderTextColor = "#9a73ef" autoCapitalize = "none"/>

        <TouchableOpacity style = {styles.saveButton} onPress = {() => this.props.navigation.navigate('Home')}>
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
