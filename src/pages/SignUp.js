import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Picker  } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, PricingCard, ButtonGroup } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Logo from '../components/Logo';
import RNPickerSelect from 'react-native-picker-select';


import axios from 'axios';

export default class SignUp extends React.Component {
  static navigationOptions = {
      headerStyle: { backgroundColor: '#5F5395', height: 40 }
  }


  constructor(props) {
    super(props);

    this.state = {
        loading: false,
        access_token : " ",
        first_name: " ",
        last_name: " ",
        username: " ",
        email: " ",
        password: " ",
        confirm_password: " ",
        area_code: " ",
        phone: " ",
        plan: null,
        errorMessage: null,
        selectedIndex: 0,
        items: [
            {
                label: '   Plan 1: 1 tháng ()',
                value: '   Plan 1: 1 tháng ()',
                color: '#5F5395'
            },
            {
                label: '   Plan 2: 3 tháng ()',
                value: '   Plan 2: 3 tháng ()',
                color: '#5F5395'
            },
            {
                label: '   Plan 3: 6 tháng ()',
                value: '   Plan 3: 6 tháng ()',
                color: '#5F5395'
            },
        ],
    };

    this._handleSignup = this._handleSignup.bind(this);
    this.updateIndex = this.updateIndex.bind(this)

  }  

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  _handleSignup() {
      const first_name  = this.state.first_name;
      const last_name = this.state.last_name;
      const username = this.state.username;
      const email = this.state.email;
      const password = this.state.password;
      const confirm_password = this.state.confirm_password;
      const phone = this.state.area_code + this.state.phone;
      var plan;
      if (this.state.selectedIndex == 0){
            plan = "Plan 1: 1 tháng (250k)"
      }
      else{
        if (this.state.selectedIndex == 1){
            plan = "Plan 2: 3 tháng (500k)"
        }
        else {
            plan = "Plan 3: 6 tháng (750k)"
        }
      }
      if (password != confirm_password) {
        this.setState({errorMessage : "Nhập lại mật khẩu không khớp"})
      }
      else{
        this.setState({loading: true});
        axios.post(`https://tinhieu-backend.herokuapp.com/sign-up/user`, {
            first_name : first_name,
            last_name: last_name,
            username: username,
            password: password,
            email: email,
            phone: phone,
            plan: plan
        })
        .then(res => {
          this.setState({errorMessage : "Đăng ký thành công"})
        }).then(res => {
          this.props.navigation.navigate('SignIn');
        }).catch(error =>{
          console.log(error);
          this.setState({errorMessage : "Tên đăng nhập không hợp lệ hoặc đã tồn tại"})
        });
      }
    }

    
	render() {
        const buttons = ['Plan 1: 1 tháng\n(250k)', 'Plan 2: 3 tháng\n(250k)', 'Plan 3: 6 tháng\n(250k)'];
        const { selectedIndex } = this.state;
		return(
			<View style={styles.container}>
				<Logo/>
				<KeyboardAwareScrollView style= {{height : 300}} scrollEnabled showsVerticalScrollIndicator = {false}>
                <View style = {styles.rowContainer}>
                    <TextInput 
                        style = {styles.inputName} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        placeholder = "Họ"
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        onChangeText={(text) => this.setState({ last_name : text})}
                    />
                    <TextInput 
                        style = {styles.inputName} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        placeholder = "Tên"
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        onChangeText={(text) => this.setState({ first_name : text})}
                    />
                </View>
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
                <View style = {styles.rowContainer}>
                    <TextInput 
                        style = {styles.inputPhone1} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        placeholder = "Mã vùng"
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        onChangeText={(text) => this.setState({ area_code : text})}
                    />
                    <TextInput 
                        style = {styles.inputPhone2} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        placeholder = "Số điện thoại"
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        onChangeText={(text) => this.setState({ phone : text})}
                    />
                    
                </View>
                {/* <View style = {styles.containerPicker}> */}
                {/* <RNPickerSelect
                    placeholder={{
                        label: '    Mời bạn chọn gói tài khoản...',
                        value: null,
                    }}
                    items={this.state.items}
                    onValueChange={(value) => {
                        this.setState({
                            plan: value,
                        });
                    }}
                    style={styles.pickerBox}
                    value={this.state.plan}
                />
                </View> */}
                {/* <ModalDropdown 
                    options={['Plan 1: 1 tháng ()', 'Plan 2: 3 tháng ()', 'Plan 3: 6 tháng ()']}
                    onSelect = {(itemIndex, itemValue) => this.setState({plan: itemValue})}
                    style = {styles.pickerBox3}
                    dropdownStyle = {{flexGrow: 1, width: 200, borderRadius: 18}}
                    dropdownTextStyle= { {fontSize: 14}}
                    defaultValue = {"Chọn gói tài khoản..."}
                    textStyle = {{color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 14}}
                 /> */}
                {/* <View style = {styles.containerPicker}> */}
                {/* <Picker
                    selectedValue={this.state.plan}
                    style={{ height: 200, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({plan: itemValue})}>
                    <Picker.Item label="Plan 1: 1 tháng ()" value="Plan 1: 1 tháng ()" />
                    <Picker.Item label="Plan 2: 3 tháng ()" value="Plan 2: 3 tháng ()" />
                    <Picker.Item label="Plan 3: 6 tháng ()" value="Plan 3: 6 tháng ()" />
                </Picker> */}
                {/* </View> */}
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{
                        height: 100,
                        width: 310,
                        backgroundColor:'transparent', 
                        borderWidth: 0,
                        borderColor: '#4C9BCF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        selectionColor: '#4C9BCF'
                    }}
                    innerBorderStyle = {{color: '#4C9BCF'}}
                    underlayColor = {'#4C9BCF'}
                    buttonStyle = {{
                        backgroundColor : '#9FC490',
                        borderRadius : 0
                    }}
                    selectedButtonStyle={{
                        backgroundColor : '#C0DFA1',
                        borderRadius: 0
                    }}
                    textStyle = {{
                        fontSize: 12,
                        alignSelf: 'center',
                        textAlign:'center',
                        justifyContent: 'center'}}
                    
                 />
                <FormValidationMessage>
                    {this.state.errorMessage}
                </FormValidationMessage>
                <Text/>
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
    backgroundColor:'#4C9BCF',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  containerPicker : {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    flex: 1,
    alignItems:'center',
    justifyContent :'center',
    borderRadius: 22,
    borderWidth: 1, 
    overflow: 'hidden',
    borderColor: '#4C9BCF',
    width: 310,
    height: 50,
    marginVertical: 10,
    marginHorizontal: 10
  },
  pricing: {
    backgroundColor: '#4C9BCF',
    borderRadius: 22,
    width: 100,
    height: 100
  },
  rowContainer: {
    backgroundColor: '#4C9BCF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonGroup:{
    width:100,
    height:100,
    backgroundColor: '#5F5395',
    borderRadius: 22,
    marginHorizontal: 5
  },
  button:{
    width:300,
    height:50,
    backgroundColor: '#5F5395',
    borderRadius: 22,
  },
  buttonText:{
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff',
      textAlign:'center'
  },
  pickerBox:{
    width:310,
    height:50,
    color: '#ffffff',
    marginVertical: 10,
    marginHorizontal: 10
  },
  pickerBox3:{
    width:310,
    height:50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 22,
    paddingHorizontal: 16,
    color: '#ffffff',
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: 'center',
    alignItems: 'center', justifyContent: 'center'
  },
  inputBox:{
    width:310,
    height:50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 22,
    paddingHorizontal: 16,
    color: '#ffffff',
    marginVertical: 10,
    marginHorizontal: 10
  },
  inputName:{
    width:150,
    height:50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 22,
    paddingHorizontal: 16,
    color: '#ffffff',
    marginVertical: 10,
    marginHorizontal: 5
  },
  inputPhone1:{
    width:100,
    height:50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 22,
    paddingHorizontal: 16,
    color: '#ffffff',
    marginVertical: 10,
    marginHorizontal: 5
  },
  inputPhone2:{
    width:200,
    height:50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 22,
    paddingHorizontal: 16,
    color: '#ffffff',
    marginVertical: 10,
    marginHorizontal: 5
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