import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, BackHandler, AsyncStorage, Button, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import HomeScreen from './src/pages/HomeScreen';
import AdminHomeScreen from './src/pages/AdminHomeScreen';
import I18n from 'ex-react-native-i18n';



const AuthenticationNavigator = createStackNavigator({
  SignIn: {screen: SignIn},
  SignUp: {screen: SignUp}
});


const AppNavigator = createSwitchNavigator({
  /* 
   * Rather than being rendered by a screen component, the
   * AuthenticationNavigator is a screen component
   */
  Auth: AuthenticationNavigator,
  Home: HomeScreen,
  Admin: AdminHomeScreen, 
});

export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        language: "vi-VN"
    };
    
  }  
  componentWillMount(){

  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  handleBackButton() {
    return true;
  }
  

  render() {
    console.disableYellowBox = true;
    return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#5F5395"
            barStyle="light-content"
          />
          <AppNavigator screenProps = {{navigation: this.props.navigation, I18n: I18n}}/>
        </View>

    );
  }
}

I18n.fallbacks = true

I18n.translations = {
  'en': {
    username: 'Username',
    password: 'Password',
    signin: 'Sign In',
    signup: 'Sign Up',
    haveaccount: 'You had an account?',
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
    noti: 'Notifications',
    first: 'First Name',
    last: 'Last Name',
    ID: 'ID Number',
    phonenumber: 'Phone Number',
    area: 'Area Code',
    dateactive: 'Activated Date',
    datedeact: 'Expired Date',
    inactive: 'Unactivated',
    passwordconfirm: 'Confirm Password',
    running: 'Waiting'
  },
  'vi-VN': {
    username: 'Tên tài khoản',
    password: 'Mật khẩu',
    signin: 'Đăng nhập',
    signup: 'Đăng ký',
    haveaccount: 'Bạn đã có tài khoản?',
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
    noti: 'Thông Báo',
    first: 'Tên',
    last: 'Họ',
    ID: 'Mã ID',
    phonenumber: 'Số điện thoại',
    area: 'Mã vùng',
    dateactive: 'Ngày kích hoạt',
    datedeact: 'Ngày hết hạn',
    inactive: 'Chưa kích hoạt',
    passwordconfirm: 'Nhập lại mật khẩu',
    running: 'Lệnh đang chạy'
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#4C9BCF',
  },
});
