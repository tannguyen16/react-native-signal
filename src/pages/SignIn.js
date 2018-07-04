import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';


import axios from 'axios';

import Logo from '../components/Logo';
import SigninForm from '../components/SigninForm';
import HomeScreen from '../pages/HomeScreen';

export default class SignIn extends React.Component {

    static navigationOptions = {
        header:null
     }

    constructor(props) {
        super(props);
    
        this.state = {
            loading: false,
            access_token : " ",
            email: " ",
            password: " ",
            errorMessage: null
        };

        this._handleSigninAdmin = this._handleSigninAdmin.bind(this);
        this._handleSigninUser = this._handleSigninUser.bind(this);

    }  

    _handleSigninUser() {
        const username = this.state.email;
        const password = this.state.password;
        this.setState({loading: true});
        
        axios.post(`https://tinhieu-backend.herokuapp.com/log-in/user`, {
            username: username,
            password: password
        })
        .then(res => {
            const data = res.data.access_token;
            this.setState({ access_token: data});
        }).then(res => {
            if(this.state.access_token != " ") this.props.navigation.navigate('HomeScreen', {access_token : this.state.access_token});
        }).catch(error =>{
            console.log(error);
            this.setState({errorMessage : "Đăng nhập không hợp lệ"});
        });
    }

    _handleSigninAdmin() {
        const email = this.state.email;
        const password = this.state.password;
        this.setState({loading: true});
        console.log(email)
        
        axios.post(`https://tinhieu-backend.herokuapp.com/log-in/admin`, {
            email: email,
            password: password
        })
        .then(res => {
            const data = res.data.access_token;
            this.setState({ access_token: data});
        }).then(res => {
            if(this.state.access_token != " ") this.props.navigation.navigate('AdminHomeScreen',  {access_token : this.state.access_token});
        }).catch(error =>{
            this.setState({errorMessage : "Đăng nhập không hợp lệ"})
        });
    
        //
    }

    _autologin(){
        const username = this.state.email;
        const password = this.state.password;
    }

    render(){
        return(
            <View style={styles.container}>
                <Logo/>
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
                    selectionColor="#fff"
                    placeholderTextColor = '#ffffff'
                    onChangeText={(text) => this.setState({ password : text})}
                />
                <FormValidationMessage>
                    {this.state.errorMessage}
                </FormValidationMessage>
                <Button 
                    buttonStyle = {styles.button}
                    title="Đăng nhập User"
                    textStyle = {styles.buttonText}
                    containerViewStyle = {styles.buttonContainer}
                    onPress = {this._handleSigninUser}
                />
                <Button 
                    buttonStyle = {styles.button}
                    title="Đăng nhập Admin"
                    textStyle = {styles.buttonText}
                    containerViewStyle = {styles.buttonContainer}
                    onPress = {this._handleSigninAdmin}
                />
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
    inputBox:{
        width:300,
        height:50,
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 22,
        paddingHorizontal: 16,
        marginVertical: 10
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
