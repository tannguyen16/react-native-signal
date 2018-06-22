import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity
} from 'react-native';

import Logo from '../components/Logo';
import SignupForm from '../components/SignupForm';


export default class SignUp extends React.Component {
    static navigationOptions = {
        headerStyle: { backgroundColor: '#1c313a', height: 40 }
      }

	render() {
		return(
			<View style={styles.container}>
				<Logo/>
				<SignupForm type="Đăng ký"/>
        <TouchableOpacity style={styles.button}>
          <Text style = {styles.buttonText}> Đăng ký </Text>

        </TouchableOpacity>
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