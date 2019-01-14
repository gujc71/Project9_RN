import React from 'react';

import {View, Text, Button} from 'react-native';

export default class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Details Screen'),
    };
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
        <Button onPress={() => this.props.navigation.navigate('HomeInput')} title="Modify"/>        
      </View>
    );
  }
}