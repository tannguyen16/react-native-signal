import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

import CurrentOrder from '../navigator/CurrentOrder';
import OldOrder from '../navigator/OldOrder';
import Account from '../navigator/Account';

import Navigator from '../pages/Navigator';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <Navigator />
        );
    }
}
