import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'


export default class Form extends React.Component {
    render(){
        return(
            <View style = {styles.container} showsVerticalScrollIndicator = {false}>   
            <KeyboardAvoidingView>
                <TextInput 
                    style = {styles.inputBox} 
                    underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                    placeholder = "Tên tài khoản"
                    selectionColor="#fff"
                    placeholderTextColor = '#ffffff'
                    onChangeText={(text) => this.setState({ email : text})}
                />
                <TextInput 
                    style = {styles.inputBox} 
                    underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                    placeholder = "Mật khẩu"
                    secureTextEntry={true}
                    placeholderTextColor = '#ffffff'
                    onChangeText={(text) => this.setState({ password : text})}
                />
                <Button 
                buttonStyle = {styles.button}
                title="Đăng nhập User"
                textStyle = {styles.buttonText}
                containerViewStyle = {styles.buttonContainer}
                onPress = {this.handleSigninUser}
                 />
                <Button 
                buttonStyle = {styles.button}
                title="Đăng nhập Admin"
                textStyle = {styles.buttonText}
                containerViewStyle = {styles.buttonContainer}
                onPress = {this.handleSigninAdmin}
             />
            </KeyboardAvoidingView>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
      flexGrow:1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputBox:{
        width:300,
        height:50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 22,
        paddingHorizontal: 16,
        marginVertical: 10
    },
    inputText:{
        color: '#ffffff',
    },
    button:{
        width:300,
        height:50,
        backgroundColor: '#1c313a',
        borderRadius: 22,
    },
    buttonContainer:{
        paddingVertical: 10
    },
    buttonText:{
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign:'center'
    },
    loginButtonSection:{
        flexGrow:1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
  });