import React from 'react';

import {StyleSheet, Alert, View, Text, Button} from 'react-native';
import dateFormat from 'dateformat';

import firebase from 'react-native-firebase';

export default class DetailsScreen extends React.Component {

  handleDelete = (brdno) => {
    Alert.alert(
      'Board delete',
      'Are you sure you want to delete?',
      [
        {text: 'Cancel'},
        {text: 'OK', onPress: () => firebase.firestore().collection("boards").doc(brdno).delete()
                                      .then(doc => {
                                        this.props.navigation.navigate('Home')
                                      })
                                    },
      ],
      { cancelable: false }
    )
  }

  render() {
    const board = this.props.navigation.getParam('board');

    const isModify = board.uid===firebase.auth().currentUser.uid;

    return (
      <View style={styles.container}>
        <View><Text>{board.brdtitle}</Text></View>
        <View style={{ height: 30, marginTop: 10}}>
          <View style={{ flex: 1, flexDirection: 'row'}}>
            <Text>{board.brdwriter}</Text>
            <Text style={{marginLeft: 20}}>{dateFormat(board.brddate, "yyyy-mm-dd")}</Text>
          </View>
        </View>
        <View style={styles.row}><Text>{board.brdcontents}</Text></View>

        <View style={isModify ? {height: 30, marginTop: 50}:null }>
          <View style={{ flex: 1, flexDirection: 'row'}}>
            <Button onPress={() => this.props.navigation.navigate('HomeInput', {board: board})} title="Modify"/>
            <Button onPress={() => this.handleDelete(board.brdno)} title="Delete"/>
          </View>  
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    marginTop: 5,
    marginBottom: 5,
  },
});  