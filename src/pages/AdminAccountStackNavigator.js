import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, BackAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

import AdminCurrentOrder from '../navigator/AdminCurrentOrder';
import AdminOldOrder from '../navigator/AdminOldOrder';
import AdminAccount from '../navigator/AdminAccount';
import CreateOrder from '../navigator/CreateOrder';

import AdminNavigator from '../pages/AdminNavigator';

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            access_token : this.props.screenProps.access_token,
            user_number: null,
        };
    }  

    render() {

        return (
        <View style={styles.container}>
        <StatusBar
            backgroundColor="#455a64"
            barStyle="light-content"
          />
            <AdminStackNavigator screenProps = {{access_token : this.state.access_token}} />
        </View>
            
        );
    }
}

const AdminStackNavigator = createStackNavigator({
    AdminAccount: {screen: AdminAccount},
    CreateOrder: {
      screen: CreateOrder
    }
  });
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#455a64',
    },
  });
  