import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class Form extends React.Component {
    render(){
        return(
            <View style = {styles.container}>
                <TextInput 
                    style = {styles.inputBox} 
                    underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                    placeholder = "Tài khoản"
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputBox:{
        width:300,
        height:50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 22,
        paddingHorizontal: 16,
        color: '#ffffff',
        marginVertical: 10
    }
  });