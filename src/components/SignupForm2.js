import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


export default class SignupForm extends React.Component {
    render(){
        return(
            <ScrollView style = {styles.container} showsVerticalScrollIndicator = {false}>
                <TextInput 
                    style = {styles.inputBox} 
                    underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                    placeholder = "Tên tài khoản"
                    selectionColor="#fff"
                    placeholderTextColor = '#ffffff'
                />
                <TextInput 
                    style = {styles.inputBox} 
                    underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                    placeholder = "Mật khẩu"
                    secureTextEntry={true}
                    placeholderTextColor = '#ffffff'
                />
                <TextInput 
                    style = {styles.inputBox} 
                    underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                    placeholder = "Nhập lại mật khẩu"
                    secureTextEntry={true}
                    placeholderTextColor = '#ffffff'
                />
                <TextInput 
                    style = {styles.inputBox} 
                    underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                    placeholder = "Email"
                    selectionColor="#fff"
                    placeholderTextColor = '#ffffff'
                    keyboardType = "email-address"
                />
                <TextInput 
                    style = {styles.inputBox} 
                    underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                    placeholder = "Số điện thoại"
                    selectionColor="#fff"
                    placeholderTextColor = '#ffffff'
                    keyboardType = "phone-pad"
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    inputBox:{
        width:300,
        height:50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 22,
        paddingHorizontal: 16,
        color: '#ffffff',
        marginVertical: 10
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