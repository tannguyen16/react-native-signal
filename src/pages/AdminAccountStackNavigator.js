import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, BackAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

import AdminCurrentOrder from '../navigator/AdminCurrentOrder';
import AdminOldOrder from '../navigator/AdminOldOrder';
import AdminAccount from '../navigator/AdminAccount';
import CreateOrder from '../navigator/CreateOrder';
import UserProfile from '../navigator/UserProfile';
import PushNotification  from '../components/PushNotification';

import SignIn from '../pages/SignIn';
import AdminNavigator from '../pages/AdminNavigator';

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
            <AdminStackNavigator screenProps = {{access_token : this.state.access_token, onLogOut: this.onLogOut}} />
        </View>
            
        );
    }
}

const AdminStackNavigator = createStackNavigator({
    AdminAccount: {screen: AdminAccount},
    CreateOrder: {
        screen: CreateOrder
    },
    UserProfile: {
        screen: UserProfile
    },
    PushNotification: {
        screen: PushNotification
    },
    SignIn: {screen: SignIn,
        navigationOptions:{
            gesturesEnabled:false
        }}
  });
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4C9BCF',
    },
  });
  