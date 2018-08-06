import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

import LoadingScreen from '../components/LoadingScreen';
import CurrentOrder from '../navigator/CurrentOrder';
import OldOrder from '../navigator/OldOrder';
import Account from '../navigator/Account';
import UserCurrentOrderStack from '../pages/UserCurrentOrderStack';
import UserNotification from '../navigator/UserNotification';
import UserOldOrderStack from '../pages/UserOldOrderStack';
import UserAccountStackNavigator from '../pages/UserAccountStackNavigator';

import I18n from 'ex-react-native-i18n';

export default class AdminNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigation : this.props.navigation,
            loading: false,
            user_number: null,
            access_token: this.props.access_token,
            ready: false
        };
        this.onLogOut = this.onLogOut.bind(this);
        this._retrieveData2 = this._retrieveData2.bind(this);
    }  

    componentWillMount(){
        this._retrieveData2();
    }

    async _retrieveData2(){
        try {
            const value = await AsyncStorage.getItem('language');
            if (value !== null) {
                // We have data!!
                console.log(value);
                I18n.locale = value;
                createNavigation();
                this.setState({ready:true});
            }
            } catch (error) {
            // Error retrieving data
        }
    }
    onLogOut(){
        this.props.onLogOut();
    }

    render() {

        if(!this.state.ready){
            return <LoadingScreen />
        }
        else{
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
}

const createNavigation = () => {
    AdminHomeScreenTabNavigator = createBottomTabNavigator({
        UserCurrentOrderStack: {
            screen: UserCurrentOrderStack,
            navigationOptions:{
                tabBarLabel: I18n.t('currentSignal'),
                tabBarIcon: () => (
                    <Ionicons name="md-trending-up" size = {24} color = {'white'}/>
                ),
                header: null
            }
        },
        UserOldOrderStack: {
            screen: UserOldOrderStack,
            navigationOptions:{
                tabBarLabel: I18n.t('oldSignal'),
                tabBarIcon: () => (
                    <Ionicons name="md-time" size = {24} color = {'white'}/>
                ),
                header: null
            }
        },
        UserNotification: {
            screen: UserNotification,
            navigationOptions:{
                tabBarLabel: I18n.t('noti'),
                tabBarIcon: () => (
                    <Ionicons name="md-notifications" size = {24} color = {'white'}/>
                ),
                header: null
            }
        },
        UserAccountStackNavigator: {
            screen: UserAccountStackNavigator,
            navigationOptions:{
                tabBarLabel: I18n.t('account'),
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
    
}

    

  I18n.translations = {
    'en': {
      username: 'Username',
      password: 'Password',
      signin: 'Sign In',
      signup: 'Sign Up',
      adminsignin: 'Sign In as an Admin',
      languageSelect: 'Select your language',
      languagePrompt: 'Please select a language',
      eng: 'English',
      viet: 'Vietnamese',
      info: 'Account information',
      logout: 'Log out',
      account: 'Account',
      currentSignal: 'New Signals',
      oldSignal: 'Old Signals',
      noti: 'Notifications'
    },
    'vi-VN': {
      username: 'Tên tài khoản',
      password: 'Mật khẩu',
      signin: 'Đăng nhập',
      signup: 'Đăng ký',
      adminsignin: 'Đăng nhập Admin',
      languageSelect: 'Chọn ngôn ngữ',
      languagePrompt: 'Xin mời bạn chọn ngôn ngữ',
      eng: 'Tiếng Anh',
      viet: 'Tiếng Việt',
      info: 'Thông tin tài khoản',
      logout: 'Thoát tài khoản',
      account: 'Tài Khoản',
      currentSignal: 'Tín Hiệu Mới',
      oldSignal: 'Tín Hiệu Cũ',
      noti: 'Thông Báo'
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C9BCF',
  },
});
