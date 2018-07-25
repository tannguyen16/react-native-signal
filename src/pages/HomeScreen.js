import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, BackAndroid, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

import * as firebase from 'firebase';
import { Permissions, Notifications } from 'expo';

import Navigator from '../pages/Navigator';

export default class HomeScreen extends React.Component {

    

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        var user_id;
        var access_token;
        if(this.props.user_id == null){
          user_id = navigation.getParam('user_id', 0);
        }
        else{
          user_id = this.props.user_id;
        }
        if(this.props.access_token == null){
          access_token = navigation.getParam('access_token', 'access_token');
        }
        else{
          access_token = this.props.access_token;
        }
        this.state = {
            loading: false,
            user_id : user_id,
            access_token : access_token,
            user_number: null,
            notification: []
        };
        if (!firebase.apps.length) {
          firebase.initializeApp({
            apiKey: "AIzaSyDhl4Rmp86P8Vixz3Z0r5yoZQ59bhsHB2I",
            authDomain: "tinhieu-backend.firebaseapp.com",
            databaseURL: "https://tinhieu-backend.firebaseio.com",
            projectId: "tinhieu-backend",
            storageBucket: "tinhieu-backend.appspot.com",
            messagingSenderId: "449954797568"
          });
        }
        
        this.onLogOut = this.onLogOut.bind(this);
        this._handleNotification = this._handleNotification.bind(this);
        this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this);

    }  

    _handleNotification = (notification) => {
        this.setState({notification: notification});
      };

    componentDidMount(){
        this.registerForPushNotificationsAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }
    
    registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
      
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
      
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
      
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        

        firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
            // ...
          });
        let uid = this.state.user_id;
        firebase.database().ref("users").child(uid).update({
            expoPushToken : token
        })
      }
    
    onLogOut(){
      AsyncStorage.multiRemove(['user_id', 'token', 'user_type']);
      this.setState({access_token : " ", user_id: null});
      this.props.navigation.navigate('Auth');
    }

    render() {
        return (
        <View style={styles.container}>
        <StatusBar
            backgroundColor="#4C9BCF"
            barStyle="light-content"
          />
            <Navigator access_token = {this.state.access_token} onLogOut = {this.onLogOut} />
        </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4C9BCF',
    },
  });
  