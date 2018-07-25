import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import axios from 'axios';

import I18n from 'ex-react-native-i18n';

import LoadingScreen from '../components/LoadingScreen';
import Logo from '../components/Logo';
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
            user_id: null,
            email: " ",
            password: " ",
            errorMessage: null,
            ready: false,
            qualified : false,
            user_type: ""
        };
        this.getFromStorage = this.getFromStorage.bind(this);
        this.checkIfQualified = this.checkIfQualified.bind(this);
        this._handleSigninAdmin = this._handleSigninAdmin.bind(this);
        this._handleSigninUser = this._handleSigninUser.bind(this);
    }  
    
    componentWillMount(){
        I18n.initAsync();
        this.getFromStorage();
    }

    checkIfQualified(){
        const access_token = this.state.access_token;
        var passDeactDate;
        axios.get(`https://tinhieu-backend.herokuapp.com/users/me`, {headers: {
            "Authorization" : "Bearer " + access_token
            }
        })
        .then(res => {
            const data = res.data;
            var now = new Date();
            var dateSplit = data.date_of_deactive.split(' ');
            var dateFormat = dateSplit[0].split('/')
            var dateDeact = new Date(dateFormat[2] + '-' + dateFormat[1] + '-' + dateFormat[0]  + "T" + dateSplit[1].split('.')[0] + "Z");
            passDeactDate = dateDeact < now;
            if(passDeactDate) {
                AsyncStorage.multiRemove(['user_id', 'token', 'user_type']);
            }
        }).then(res =>{
            console.log(passDeactDate);
            if(passDeactDate){
                this.setState({access_token : " ", user_id: null, qualified: false, ready: true});
            }
        }).catch(error =>{
            console.log(error);
            this.setState({errorMessage : "Tài khoản của bạn chưa được kích hoạt hoặc đã hết hạn"});
        })
    }

    getFromStorage(){
        console.log('Storage here');
        var token;
        var user_id;
        var user_type;
        AsyncStorage.multiGet(['token', 'user_id', 'user_type']).then((data) =>{
            console.log(data);
            if(data[0][1]){
                token = data[0][1] || null;
                user_id = Number(data[1][1]) || null;
                user_type = data[2][1] || null;
            }
        }).then((user) => {
            console.log(user_id != null);
            console.log(token != null);
            console.log(user_type != null);
            if(user_id != null && token != null && user_type != null){
                this.setState({
                    user_id : user_id,
                    access_token : token,
                    user_type : user_type,
                    qualified : true
                });
            }
        }).then((user) => {
            if(user_id != null && token != null && user_type == "User"){
                this.checkIfQualified();
            }
        }).then((user) => {
            if(!this.state.ready){
                this.setState({ready: true});
            }
        }).done();
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
            const access_token = res.data.access_token;
            const user_id = res.data.user_id;
            if(res.data.user_id && res.data.access_token){
                this.setState({ access_token: access_token, user_id : user_id, user_type : 'User'});
                AsyncStorage.multiSet([['token', this.state.access_token], ['user_id', this.state.user_id.toString()],  ['user_type', 'User']]);
            }
        }).then(res => {
            if(this.state.access_token != null && this.state.user_id != null){
                var passDeactDate;
                axios.get(`https://tinhieu-backend.herokuapp.com/users/me`, {headers: {
                        "Authorization" : "Bearer " + this.state.access_token
                    }
                })
                .then(res => {
                    const data = res.data;
                    var now = new Date();
                    var dateSplit = data.date_of_deactive.split(' ');
                    var dateFormat = dateSplit[0].split('/')
                    var dateDeact = new Date(dateFormat[2] + '-' + dateFormat[1] + '-' + dateFormat[0]  + "T" + dateSplit[1].split('.')[0] + "Z");
                    passDeactDate = dateDeact < now;
                }).then(res =>{
                    if(passDeactDate) {
                        AsyncStorage.multiRemove(['user_id', 'token', 'user_type']);
                    }
                }).then(res =>{
                    console.log(passDeactDate);
                    if(passDeactDate){
                        this.setState({access_token : " ", user_id: null, errorMessage : "Tài khoản của bạn chưa được kích hoạt hoặc đã hết hạn"});
                    }
                }).then(res => {
                    if(this.state.access_token != " ") 
                        this.props.navigation.navigate('Home', {user_id : this.state.user_id, access_token : this.state.access_token, parentNavigation: this.props.navigation });
                }).catch(error =>{
                    console.log(error); 
                    this.setState({errorMessage : "Tài khoản của bạn chưa được kích hoạt hoặc đã hết hạn"});
                });
            }
        }).catch(error =>{
            console.log(error); 
            this.setState({errorMessage : "Tài khoản của bạn không hợp lệ hoặc chưa được kích hoạt"});
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
        }).then(res => {
            const access_token = res.data.access_token;
            if(res.data.access_token){
                this.setState({ access_token: access_token, user_id: 0, user_type : 'Admin'});
                AsyncStorage.multiSet([['token', this.state.access_token], ['user_id', '-1'], ['user_type', 'Admin']]);
            }
        }).then(res => {
            if(this.state.access_token != " ") this.props.navigation.navigate('Admin',  {access_token : this.state.access_token, parentNavigation: this.props.navigation});
        }).catch(error =>{
            this.setState({errorMessage : "Đăng nhập Admin không hợp lệ"})
        });
    
        //
    }


    render(){


        const {navigate} = this.props.navigation;
        //const Layout = this.props.navigation.navigate('Home', {user_id : this.state.user_id, access_token : this.state.access_token, parentNavigation: this.props.navigation });

        if (this.state.ready === false) {
            // render "booting" screen while reading data from storate or remote server
            return <LoadingScreen />;
        }   
        if(!this.state.qualified){

            return(
                <View style={styles.container}>
                    <Logo/>
                    
                    <TextInput 
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        placeholder = {I18n.t('username')}
                        selectionColor="#fff"
                        placeholderTextColor = '#fff'
                        onChangeText={(text) => this.setState({ email : text})}
                    />
                    <TextInput 
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        placeholder = {I18n.t('password')}
                        secureTextEntry={true}
                        selectionColor="#fff"
                        placeholderTextColor = '#fff'
                        onChangeText={(text) => this.setState({ password : text})}
                    />
                    <FormValidationMessage>
                        {this.state.errorMessage}
                    </FormValidationMessage>
                    <View style = {styles.rowContainer}>
                    <Button 
                        buttonStyle = {styles.buttonSignUp}
                        title= {I18n.t('signup')}
                        textStyle = {styles.buttonText}
                        containerViewStyle = {styles.buttonContainer}
                        onPress = {() => this.props.navigation.navigate('SignUp')}
                    />
                    <Button 
                        buttonStyle = {styles.buttonSignIn}
                        title= {I18n.t('signin')}
                        textStyle = {styles.buttonText}
                        containerViewStyle = {styles.buttonContainer}
                        onPress = {this._handleSigninUser}
                    />
                    </View>
                    <View style={styles.signupTextCont}>
                        <Text style = {styles.signupText}></Text>
                        <TouchableOpacity onPress={this._handleSigninAdmin}>
                            <Text
                                style = {styles.signupButton}> {I18n.t('adminsignin')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else{
            if(this.state.user_type == 'User')
            //return (<HomeScreen user_id = {this.state.user_id} access_token = {this.state.access_token}/>)
                return this.props.navigation.navigate('Home', {user_id : this.state.user_id, access_token : this.state.access_token, parentNavigation: this.props.navigation });
            
            else{
                if(this.state.user_type == 'Admin')
                    return this.props.navigation.navigate('Admin', {access_token : this.state.access_token, parentNavigation: this.props.navigation });
            }
        }
    }
}

I18n.fallbacks = true

I18n.translations = {
  'en': {
    username: 'Username',
    password: 'Password',
    signin: 'Sign In',
    signup: 'Sign Up',
    adminsignin: 'Sign In as an Admin'
  },
  'vi-VN': {
    username: 'Tên tài khoản',
    password: 'Mật khẩu',
    signin: 'Đăng nhập',
    signup: 'Đăng ký',
    adminsignin: 'Đăng nhập Admin'
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4C9BCF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
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
        color:'#fff',
        fontSize:16,
        fontWeight:'500'
    },
    inputBox:{
        width:300,
        height:55,
        color: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 22,
        paddingHorizontal: 16,
        marginVertical: 12.5
    },
    buttonSignUp:{
        width:130,
        height:55,
        backgroundColor: '#5F5395',
        borderRadius: 22,
    },
    buttonSignIn:{
        width:130,
        height:55,
        backgroundColor: '#5F5395',
        borderRadius: 22,
    },
    buttonContainer:{
        paddingVertical: 10
    },
    buttonText:{
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        textAlign:'center'
    },
    loginButtonSection:{
        flexGrow:1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
  });
