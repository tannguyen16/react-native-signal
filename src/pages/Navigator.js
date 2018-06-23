import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

import CurrentOrder from '../navigator/CurrentOrder';
import OldOrder from '../navigator/OldOrder';
import Account from '../navigator/Account';


export default class AppNavigator extends React.Component {
    render() {
        return (
            <HomeScreenTabNavigator />
        );
    }
}

const HomeScreenTabNavigator = createBottomTabNavigator({
    CurrentOrder: {
        screen: CurrentOrder,
        navigationOptions:{
            tabBarLabel:'Tín hiệu mới',
            tabBarIcon: () => (
                <Ionicons name="md-trending-up" size = {24} color = {'white'}/>
            )
        }
    },
    OldOrder: {
        screen: OldOrder,
        navigationOptions:{
            tabBarLabel:'Tín hiệu cũ',
            tabBarIcon: () => (
                <Ionicons name="md-time" size = {24} color = {'white'}/>
            )
        }
    },
    Account: {
        screen: Account,
        navigationOptions:{
            headerTitle: "Home",
            tabBarLabel:'Tài khoản',
            tabBarIcon: () => (
                <Ionicons name="md-contact" size = {24} color = {'white'}/>
            )
        }
    }
},  {
    tabBarOptions: {
        
          activeBackgroundColor :'#1c313a',          
          inactiveBackgroundColor :'black',
          activeTintColor: '#fff',
          showIcon: true,
        
    },
    initialRouteName: 'CurrentOrder'
    /* The header config from HomeScreen is now here */
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
  },
});
