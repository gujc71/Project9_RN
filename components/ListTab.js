import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ListTab extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!dddddddddddd</Text>
        <Icon.Button name="home" backgroundColor="#3b5998" onPress={() => this.props.navigation.navigate('Details')}>
          <Text style={{fontFamily: 'Arial', fontSize: 15}}>Login with Facebook</Text>
        </Icon.Button>
      </View>
    );
  }
}
