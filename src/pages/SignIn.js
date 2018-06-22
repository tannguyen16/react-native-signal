import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

import Logo from '../components/Logo';
import SigninForm from '../components/SigninForm';
import HomeScreen from '../pages/HomeScreen';

export default class SignIn extends React.Component {

    static navigationOptions = {
        header:null
      }

    render(){
        return(
            <View style={styles.container}>
                <Logo/>
                <SigninForm type="Đăng nhập"/>
                <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate('HomeScreen')}>
                    <Text style = {styles.buttonText}> Đăng nhập </Text>

                </TouchableOpacity>
                <View style={styles.signupTextCont}>
                    <Text style = {styles.signupText}>Bạn chưa có tài khoản?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignUp')}>
                        <Text
                         style = {styles.signupButton}> Đăng ký
                         </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#455a64',
      alignItems: 'center',
      justifyContent: 'center',
    },
    signupTextCont:{
        flexGrow:1,
        alignItems:'flex-end',
        justifyContent:'center',
        paddingVertical:16,
        flexDirection: 'row'
    },
    signupText:{
        color:'rgba(255, 255, 255, 0.7)',
        fontSize: 16
    },
    signupButton:{
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500'
    },
    button:{
        width:300,
        height:50,
        backgroundColor: '#1c313a',
        borderRadius: 22,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText:{
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign:'center'
    }
  });
