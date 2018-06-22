import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Logo from '../components/logo';
import Form from '../components/form';

export default class Login extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <Logo/>
                <Form/>
                <View style={styles.signupTextCont}>
                    <Text style = {styles.signupText}>Bạn chưa có tài khoản?</Text>
                    <Text style = {styles.signupButton}> Đăng ký</Text>
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
    }
  });
