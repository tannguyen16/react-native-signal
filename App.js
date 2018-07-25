import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, BackHandler } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import HomeScreen from './src/pages/HomeScreen';
import AdminHomeScreen from './src/pages/AdminHomeScreen';

const AuthenticationNavigator = createStackNavigator({
  SignIn: {screen: SignIn},
  SignUp: {screen: SignUp}
});


const AppNavigator = createSwitchNavigator({
  /* 
   * Rather than being rendered by a screen component, the
   * AuthenticationNavigator is a screen component
   */
  Auth: AuthenticationNavigator,
  Home: HomeScreen,
  Admin: AdminHomeScreen, 
});

const WrappedStack = ({t}) => {
  return <AppNavigator screenProps={{ t }} />;
}

const ReloadAppOnLanguageChange = translate('common', {
  bindI18n: 'languageChanged',
  bindStore: false
})(WrappedStack);



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
    console.disableYellowBox = true;
    return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#5F5395"
            barStyle="light-content"
          />
          <ReloadAppOnLanguageChange screenProps = {{navigation: this.props.navigation}}/>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#4C9BCF',
  },
});
