import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView,KeyboardAvoidingView  } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Logo from '../components/Logo';
import SignupForm from '../components/SignupForm';

import axios from 'axios';

export default class SignUp extends React.Component {
  static navigationOptions = {
      headerStyle: { backgroundColor: '#1c313a', height: 40 }
  }

  constructor(props) {
    super(props);

    this.state = {
        loading: false,
        access_token : " ",
        username: " ",
        email: " ",
        password: " ",
        confirm_password: " ",
        phone: " ",
        errorMessage: null
    };

    this._handleSignup = this._handleSignup.bind(this);

  }  

  _handleSignup() {
      const username = this.state.username;
      const email = this.state.email;
      const password = this.state.password;
      const confirm_password = this.state.confirm_password;
      const phone = this.state.phone;
      if (password != confirm_password) {
        this.setState({errorMessage : "Nhập lại mật khẩu không khớp"})
      }
      else{
        this.setState({loading: true});
        axios.post(`https://tinhieu-backend.herokuapp.com/sign-up/user`, {
            username: username,
            password: password,
            email: email,
            phone: phone

        })
        .then(res => {
          this.setState({errorMessage : "Đăng ký thành công"})
        }).then(res => {
          this.props.navigation.navigate('SignIn');
        }).catch(error =>{
          console.log(error);
          this.setState({errorMessage : "Tên đăng nhập này đã tồn tại"})
        });
      }
  }

	render() {
		return(
			<View style={styles.container}>
				<Logo/>
				<KeyboardAwareScrollView scrollEnabled showsVerticalScrollIndicator = {false}>
                <TextInput 
                    style = {styles.inputBox} 
                    underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                    placeholder = "Tên tài khoản"
                    selectionColor="#fff"
                    placeholderTextColor = '#ffffff'
                    onChangeText={(text) => this.setState({ username : text})}
                />
                <TextInput 
                    style = {styles.inputBox} 
                    underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                    placeholder = "Mật khẩu"
                    secureTextEntry={true}
                    selectionColor="#fff"
                    placeholderTextColor = '#ffffff'
                    onChangeText={(text) => this.setState({ password : text})}

                />
                <TextInput 
                    style = {styles.inputBox} 
                    underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                    placeholder = "Nhập lại mật khẩu"
                    secureTextEntry={true}
                    selectionColor="#fff"
                    placeholderTextColor = '#ffffff'
                    onChangeText={(text) => this.setState({ confirm_password : text})}

                />
                <TextInput 
                    style = {styles.inputBox} 
                    underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                    placeholder = "Email"
                    selectionColor="#fff"
                    placeholderTextColor = '#ffffff'
                    keyboardType = "email-address"
                    onChangeText={(text) => this.setState({ email : text})}

                />
                <TextInput 
                    style = {styles.inputBox} 
                    underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                    placeholder = "Số điện thoại"
                    selectionColor="#fff"
                    placeholderTextColor = '#ffffff'
                    keyboardType = "phone-pad"
                    onChangeText={(text) => this.setState({ phone : text})}
                />
                <FormValidationMessage>
                    {this.state.errorMessage}
                </FormValidationMessage>
            </KeyboardAwareScrollView>
            <Button 
                    buttonStyle = {styles.button}
                    title="Đăng ký"
                    textStyle = {styles.buttonText}
                    containerViewStyle = {styles.buttonContainer}
                    onPress = {this._handleSignup}
                />
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Bạn đã có tài khoản?</Text>
					<TouchableOpacity onPress={()=> this.props.navigation.navigate('SignIn')}>
          <Text
            style = {styles.signupButton}> Đăng nhập
          </Text>
          </TouchableOpacity>
				</View>
			</View>	
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
  button:{
    width:300,
    height:50,
    backgroundColor: '#1c313a',
    borderRadius: 22,
  },
  buttonText:{
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff',
      textAlign:'center'
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
  inputText:{
      color: '#ffffff',
  },
  loginButtonSection:{
      flexGrow:1,
      width: '100%',
      height: '20%',
      justifyContent: 'center',
      alignItems: 'center'
  }
});