import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, BackHandler } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createStackNavigator } from 'react-navigation';

import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import HomeScreen from './src/pages/HomeScreen';
import AdminHomeScreen from './src/pages/AdminHomeScreen';
import SigninForm from './src/components/SigninForm';
import SignupForm from './src/components/SignupForm';


export default class App extends React.Component {

  
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  handleBackButton() {
    return true;
  }


  render() {
    return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#1c313a"
            barStyle="light-content"
          />
          <AppStackNavigator screenProps = {{navigation: this.props.navigation}}/>
        </View>

    );
  }
}

//Stack cho SignIn, SignUp và HomeScreen
const AppStackNavigator = createStackNavigator({
  SignIn: {screen: SignIn},
  SignUp: {screen: SignUp},
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions:{
      header:null
  }},
  AdminHomeScreen: {
    screen: AdminHomeScreen,
    navigationOptions:{
    header:null
  }}
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#455a64',
  },
});
