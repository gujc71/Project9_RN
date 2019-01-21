import React, { Component } from 'react';
import {StyleSheet, Text, View, AsyncStorage, Dimensions, ToastAndroid} from 'react-native';
import { Input, Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from 'react-native-firebase';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      email_valid: true,
      password: '',
      password_valid: true,
      login_failed: false,
      showLoading: false,
    };
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  validatePassword(password) {
    return password.length > 5;
  }

  submitLoginCredentials = () => {
    const { email, password } = this.state;
    const email_valid = this.validateEmail(email);
    const password_valid = this.validatePassword(password);

    this.setState({
      email_valid: email_valid,
      password_valid: password_valid,
    });

    if (!email_valid || !password_valid) return;

    const _this = this;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      AsyncStorage.setItem('userToken', email, () => {
        _this.setState({showLoading: true});
        _this.props.navigation.navigate('Home');
      });
    }).catch(function(error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    });
  }

  render() {
    const { email, password, email_valid, password_valid, showLoading } = this.state;

    return (
      <View style={styles.container}>
          <View style={styles.loginView}>
            <View style={styles.loginTitle}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.travelText}>Project9</Text>
              </View>
            </View>
            <View style={styles.loginInput}>
              <Input
                leftIcon={<Icon name="user-o" color="rgba(171, 189, 219, 1)" size={25}/>}
                containerStyle={{ marginVertical: 10 }}
                onChangeText={email => this.setState({ email })}
                value={email}
                inputStyle={{ marginLeft: 10, color: 'black' }}
                keyboardAppearance="light"
                placeholder="Email"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                ref={input => (this.emailInput = input)}
                onSubmitEditing={() => {
                  this.setState({ email_valid: this.validateEmail(email) });
                  this.passwordInput.focus();
                }}
                blurOnSubmit={false}
                placeholderTextColor="gray"
                errorStyle={{ textAlign: 'center', fontSize: 12 }}
                errorMessage={
                  email_valid ? null : 'Please enter a valid email address'
                }
              />
              <Input
                leftIcon={<Icon name="lock" color="rgba(171, 189, 219, 1)" size={25} />}
                containerStyle={{ marginVertical: 10 }}
                onChangeText={password => this.setState({ password })}
                value={password}
                inputStyle={{ marginLeft: 10, color: 'black' }}
                secureTextEntry={true}
                keyboardAppearance="light"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                ref={input => (this.passwordInput = input)}
                onSubmitEditing={() => {
                  this.setState({ password_valid: this.validatePassword(password) });
                  this.submitLoginCredentials();
                }}                  
                blurOnSubmit={true}
                placeholderTextColor="gray"
                errorMessage={
                  password_valid ? null : 'Please enter a valid password (over 8 char)'
                }
              />
            </View>
            <Button
              title="LOG IN"
              activeOpacity={1}
              underlayColor="transparent"
              onPress={this.submitLoginCredentials}
              loading={showLoading}
              loadingProps={{ size: 'small', color: 'black' }}
              disabled={!email_valid && password.length < 8}
              buttonStyle={{
                marginTop: 10,
                height: 50,
                width: 250,
                backgroundColor: 'transparent',
                borderRadius: 30,
              }}
              containerStyle={{ marginVertical: 10 }}
              titleStyle={{ color: 'black' }}
              />
            <View style={styles.footerView}>
              <Text style={{ color: 'grey' }}>New here?</Text>
              <Button
                title="Create an Account"
                clear
                activeOpacity={0.5}
                titleStyle={{ color: 'black', fontSize: 15 }}
                containerStyle={{ marginTop: -10 }}
                onPress={() => console.log('Account created')}
              />
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginView: {
    marginTop: 50,
    backgroundColor: 'transparent',
    width: 250,
    height: 400,
  },
  loginTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  travelText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'bold',
  },
  plusText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'regular',
  },
  loginInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});