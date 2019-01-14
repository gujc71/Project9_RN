import React from 'react';
import { AsyncStorage, Button, Text, View } from 'react-native';

export default class SettingsTab extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button title="Logout" onPress={this.logoutAsync} />
      </View>
    );
  }

  logoutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

