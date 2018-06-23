import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createStackNavigator } from 'react-navigation';

import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import HomeScreen from './src/pages/HomeScreen';
import SigninForm from './src/components/SigninForm';
import SignupForm from './src/components/SignupForm';


export default class App extends React.Component {

  render() {
    return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#ffffff"
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
  SignUp: {screen: SignUp} ,
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions:{
      header:null
}}
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
  },
});
