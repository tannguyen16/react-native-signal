import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

import AdminCurrentOrder from '../navigator/AdminCurrentOrder';
import AdminOldOrder from '../navigator/AdminOldOrder';
import AdminAccount from '../navigator/AdminAccount';
import AdminCurrentOrderStack from '../pages/AdminCurrentOrderStack';
import AdminOldOrderStack from '../pages/AdminOldOrderStack';
import AdminAccountStackNavigator from '../pages/AdminAccountStackNavigator';



export default class AdminNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user_number: null,
            access_token: this.props.access_token
        };
    }  

    render() {
        return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#1c313a"
                barStyle="light-content"
            />
            <AdminHomeScreenTabNavigator screenProps = {{access_token : this.state.access_token}} />
         </View>
        );
    }
}

const AdminHomeScreenTabNavigator = createBottomTabNavigator({
    AdminCurrentOrderStack: {
        screen: AdminCurrentOrderStack,
        navigationOptions:{
            tabBarLabel:'Tín hiệu mới',
            tabBarIcon: () => (
                <Ionicons name="md-trending-up" size = {24} color = {'white'}/>
            ),
            header: null
        }
    },
    AdminOldOrderStack: {
        screen: AdminOldOrderStack,
        navigationOptions:{
            tabBarLabel:'Tín hiệu cũ',
            tabBarIcon: () => (
                <Ionicons name="md-time" size = {24} color = {'white'}/>
            )
        }
    },
    AdminAccountStackNavigator: {
        screen: AdminAccountStackNavigator,
        navigationOptions:{
            tabBarLabel:'Tài khoản Admin',
            tabBarIcon: () => (
                <Ionicons name="md-contact" size = {24} color = {'white'}/>
            ),
            header: null
        },
    }
},  {
    tabBarOptions: {
        
          activeBackgroundColor :'#1c313a',          
          inactiveBackgroundColor :'black',
          activeTintColor: '#fff',
          showIcon: true,
        
    },
    backgroundColor: '#455a64',
    /* The header config from HomeScreen is now here */
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
  },
});
