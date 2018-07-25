import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, BackAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

import CurrentOrder from '../navigator/CurrentOrder';
import OldOrder from '../navigator/OldOrder';
import Account from '../navigator/Account';
import UserProfile from '../navigator/UserProfile';
import PushNotification from '../components/PushNotification';

import SignIn from '../pages/SignIn';
import Navigator from '../pages/Navigator';

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            access_token : this.props.screenProps.access_token,
            user_number: null,
        };
        this.onLogOut = this.onLogOut.bind(this);
    }  

    onLogOut(){
        this.props.screenProps.onLogOut();
    }
    render() {

        return (
        <View style={styles.container}>
        <StatusBar
            backgroundColor="#4C9BCF"
            barStyle="light-content"
          />
            <UserAccountStackNavigator screenProps = {{access_token : this.state.access_token, onLogOut: this.onLogOut}} />
        </View>
            
        );
    }
}

const UserAccountStackNavigator = createStackNavigator({
    Account: {screen: Account},
    UserProfile: {
      screen: UserProfile
    },
    PushNotification: {
        screen: PushNotification
    }
  });

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4C9BCF',
    },
  });
  