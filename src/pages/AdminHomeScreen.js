import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, BackAndroid, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

import AdminCurrentOrder from '../navigator/AdminCurrentOrder';
import AdminOldOrder from '../navigator/AdminOldOrder';
import AdminAccount from '../navigator/AdminAccount';
import CreateOrder from '../navigator/CreateOrder';

import AdminNavigator from '../pages/AdminNavigator';


export default class HomeScreen extends React.Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: '#5F5395', height: 40 },
        headerTitleStyle: { color: 'white', alignItems: 'center' },
        title: "Tạo tín hiệu",
    }
    
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            loading: false,
            access_token : navigation.getParam('access_token', 'access_token'),
            user_number: null,
        };
        this.onLogOut = this.onLogOut.bind(this);
    }  

    onLogOut(){
        AsyncStorage.multiRemove(['user_id', 'token', 'user_type']);
        this.setState({access_token : " "});
        this.props.navigation.navigate('Auth');
    }

    render() {

        return (
        
            <View style={styles.container}>
                
                    <StatusBar
                        backgroundColor="#4C9BCF"
                        barStyle="light-content"
                    />
                <AdminNavigator access_token = {this.state.access_token} onLogOut = {this.onLogOut}/>
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
  