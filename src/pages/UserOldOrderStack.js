import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, BackAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

import OldOrderLook from '../navigator/OldOrderLook';
import OldOrder from '../navigator/OldOrder';
import Account from '../navigator/Account';

import Navigator from '../pages/Navigator';

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
            backgroundColor="#4C9BCF"
            barStyle="light-content"
          />
            <OldOrderStackNavigator screenProps = {{access_token : this.state.access_token}} />
        </View>
            
        );
    }
}

const OldOrderStackNavigator = createStackNavigator({
    OldOrder: {screen: OldOrder,
        navigationOptions:{
            header: null
        }         
    },
    OldOrderLook: {screen: OldOrderLook,
        navigationOptions:{
        }         
    }
  });

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4C9BCF',
    },
  });
  