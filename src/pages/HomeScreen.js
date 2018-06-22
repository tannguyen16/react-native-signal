import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

import CurrentOrder from '../navigator/CurrentOrder'
import OldOrder from '../navigator/OldOrder'
import Account from '../navigator/Account'


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header:null
    }
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
                <Ionicons name="md-trending-up" size = {24} />
            )
        }
    },
    OldOrder: {
        screen: OldOrder,
        navigationOptions:{
            tabBarLabel:'Tín hiệu cũ',
            tabBarIcon: () => (
                <Ionicons name="md-time" size = {24} />
            )
        }
    },
    Account: {
        screen: Account,
        navigationOptions:{
            tabBarLabel:'Tài khoản',
            tabBarIcon: () => (
                <Ionicons name="md-contact" size = {24} />
            )
        }
    }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
  },
});
