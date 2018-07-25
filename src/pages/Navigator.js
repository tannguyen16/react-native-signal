import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

import CurrentOrder from '../navigator/CurrentOrder';
import OldOrder from '../navigator/OldOrder';
import Account from '../navigator/Account';
import UserCurrentOrderStack from '../pages/UserCurrentOrderStack';
import UserNotification from '../navigator/UserNotification';
import UserOldOrderStack from '../pages/UserOldOrderStack';
import UserAccountStackNavigator from '../pages/UserAccountStackNavigator';



export default class AdminNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigation : this.props.navigation,
            loading: false,
            user_number: null,
            access_token: this.props.access_token
        };

        this.onLogOut = this.onLogOut.bind(this);
    }  

    onLogOut(){
        this.props.onLogOut();
    }

    render() {
        return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#5F5395"
                barStyle="light-content"
            />
            <AdminHomeScreenTabNavigator screenProps = {{access_token : this.state.access_token, onLogOut : this.onLogOut}} />
         </View>
        );
    }
}

const AdminHomeScreenTabNavigator = createBottomTabNavigator({
    UserCurrentOrderStack: {
        screen: UserCurrentOrderStack,
        navigationOptions:{
            tabBarLabel:'Tín hiệu mới',
            tabBarIcon: () => (
                <Ionicons name="md-trending-up" size = {24} color = {'white'}/>
            ),
            header: null
        }
    },
    UserOldOrderStack: {
        screen: UserOldOrderStack,
        navigationOptions:{
            tabBarLabel:'Tín hiệu cũ',
            tabBarIcon: () => (
                <Ionicons name="md-time" size = {24} color = {'white'}/>
            ),
            header: null
        }
    },
    UserNotification: {
        screen: UserNotification,
        navigationOptions:{
            tabBarLabel:'Thông báo',
            tabBarIcon: () => (
                <Ionicons name="md-notifications" size = {24} color = {'white'}/>
            ),
            header: null
        }
    },
    UserAccountStackNavigator: {
        screen: UserAccountStackNavigator,
        navigationOptions:{
            tabBarLabel:'Tài khoản',
            tabBarIcon: () => (
                <Ionicons name="md-contact" size = {24} color = {'white'}/>
            ),
            header: null
        },
    }
},  {
    tabBarOptions: {
        
          activeBackgroundColor :'#5F5395',          
          inactiveBackgroundColor :'black',
          activeTintColor: '#fff',
          showIcon: true,
        
    },
    backgroundColor: '#4C9BCF',
    /* The header config from HomeScreen is now here */
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C9BCF',
  },
});
