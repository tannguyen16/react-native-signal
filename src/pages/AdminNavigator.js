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
            ),
            header: null
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
