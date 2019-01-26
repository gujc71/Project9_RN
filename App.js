import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import SignInScreen from './components/member/SignInScreen';
import AuthLoadingScreen from './components/member/AuthLoadingScreen';

import HomeTab from './components/HomeTab';
import HomeInputScreen from './components/HomeInputScreen';
import SettingsTab from './components/SettingsTab';
import DetailsScreen from './components/DetailsScreen';

const defaultNavigationOptions = {
  defaultNavigationOptions: {
    title: 'Project9',
    headerStyle: {
      backgroundColor: '#3F51B5',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
};

const defaultTapOptions ={
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `home`;
      } else if (routeName === 'Settings') {
        iconName = `cog`; 
      }

      return <Icon name={iconName} size={30}  color={tintColor}/>
    },
  }),
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'black',
    inactiveTintColor: 'lightgray',
  },
  animationEnabled: false,
  swipeEnabled: false,
};

const AuthStack = createStackNavigator({ 
  SignIn: SignInScreen 
}, {
  headerMode: 'none',
});

const HomeStack = createStackNavigator({
  Home: { screen: HomeTab },
  Details: { screen: DetailsScreen },
  HomeInput: {screen: HomeInputScreen},
}, defaultNavigationOptions);

const TabStack = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Settings: { screen: SettingsTab },
  }, defaultTapOptions
);

const FullScreenStack = createStackNavigator({
  Main: {screen: TabStack },
  NewScreen: {screen: HomeInputScreen },
}, {
  headerMode: 'none',
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: FullScreenStack,
    Auth: AuthStack,
  }, {
    initialRouteName: 'AuthLoading',
  }
));

