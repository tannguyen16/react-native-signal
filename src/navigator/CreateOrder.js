import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TextInput, Picker } from 'react-native';
import { List, ListItem, SearchBar, Header, FormValidationMessage, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Permissions, Notifications } from 'expo';
import axios from 'axios';
import * as firebase from 'firebase';

export default class CreateOrder extends React.Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: '#5F5395', height: 40 },
        headerTitleStyle: { color: 'white', alignItems: 'center' },
        title: "Tạo tín hiệu",
    }

    constructor(props) {
        super(props);
    
        this.state = {
            access_token : this.props.screenProps.access_token,
            loading: false,
            error: null,
            currency_code: "",
            buy_or_sell: null,
            price: null,
            take_profit_one: null,
            take_profit_two: null,
            take_profit_three: null,
            stop_loss: null,
            errorMessage: null,
            pickBuy: "Mua"
        };

        this._createOrder= this._createOrder.bind(this);
        this._sendPushNotification = this._sendPushNotification.bind(this);

    }  
    

    _createOrder() {
        const currency_code = this.state.currency_code;
        const buy_or_sell = Number(this.state.buy_or_sell) - 1;
        const price = Number(this.state.price);
        const take_profit_one = Number(this.state.take_profit_one);
        const take_profit_two = Number(this.state.take_profit_two);
        const take_profit_three = Number(this.state.take_profit_three);
        const stop_loss = Number(this.state.stop_loss);

        axios.post(`https://tinhieu-backend.herokuapp.com/admin/notification`, {
            currency_code: currency_code,
            buy_or_sell: buy_or_sell,
            price: price,
            take_profit_one: take_profit_one,
            take_profit_two: take_profit_two,
            take_profit_three: take_profit_three,
            stop_loss: stop_loss
        },
        {
            headers: {
                "Authorization" : "Bearer " + this.state.access_token
            }
        })
        .then(res => {
            const data = res.data;
            console.log("curency code" + this.state.currency_code)

            this._sendPushNotification("Tín hiệu mới: " + this.state.currency_code);
        }).then(res => {
            const { navigation } = this.props;
            navigation.goBack();
        }).catch(error =>{
            console.log("error 1 " +  error);
        })
    }

    componentDidMount(){
    }

    _sendPushNotification(messageCreate){

            var messages = [];
            var pushToken = [];
            console.log(messageCreate)
            firebase.auth().signInAnonymously().catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
              });

            //return the main promise 
            return firebase.database().ref('users').once('value').then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    
                    var expoToken = childSnapshot.val().expoPushToken;
                    if(!pushToken.includes(expoToken)){ 
                        messages.push({
                            "to": expoToken,
                            "sound": "default",
                            "body": messageCreate
                        });
                        pushToken.push(expoToken);
                    }
                });
                //firebase.database then() respved a single promise that resolves
                //once all the messages have been resolved 
                return Promise.all(messages)

            })
                .then(messages => {
                    // console.log(messages)
                    fetch('https://exp.host/--/api/v2/push/send', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(messages)

                    });
                })
                .catch(reason => {
                    console.log("Cannot push. Reason: " + reason)
                })


        }
        
    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView scrollEnabled showsVerticalScrollIndicator = {false}>
                    <Text style = {styles.textStyle}> Mã Tiền Tệ </Text>
                    <TextInput 
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        autoCapitalize = "characters"
                        placeholderTextColor = '#ffffff'
                        onChangeText={(text) => this.setState({ currency_code : text})}
                    />
                    <Text style = {styles.textStyle}> Chọn Mua hoặc Bán (1 cho Mua và 2 cho Bán)</Text>
                    {/* <Picker selectedValue={this.state.pickBuy}
                        style={{ height: 50, width: 100, 
                            backgroundColor: '#5F5395',
                            borderRadius: 10,
                            paddingHorizontal: 16,
                            marginVertical: 10}}
                        onValueChange={(itemValue, itemIndex) => this.setState({buy_or_sell: itemValue, pickBuy: itemValue})}>
                        <Picker.Item label="Mua" value= "0" />
                        <Picker.Item label="Bán" value= "1" />
                    </Picker> */}
                    <TextInput 
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        keyboardType = "phone-pad"
                        onChangeText={(text) => this.setState({ buy_or_sell : text})}
                    />
                    <Text style = {styles.textStyle}> Giá Mua hoặc Giá Bán </Text>
                    <TextInput 
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        onChangeText={(text) => this.setState({ price : text})}
                    />
                    <Text style = {styles.textStyle}> Take Profit #1 </Text>
                    <TextInput 
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        onChangeText={(text) => this.setState({ take_profit_one : text})}
                    />
                    <Text style = {styles.textStyle}> Take Profit #2 </Text>
                    <TextInput 
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        onChangeText={(text) => this.setState({ take_profit_two : text})}

                    />
                    <Text style = {styles.textStyle}> Take Profit #3 </Text>
                    <TextInput 
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        onChangeText={(text) => this.setState({ take_profit_three : text})}

                    />
                    <Text style = {styles.textStyle}> Stop Loss </Text>
                    <TextInput 
                        style = {styles.inputBox} 
                        underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                        selectionColor="#fff"
                        placeholderTextColor = '#ffffff'
                        onChangeText={(text) => this.setState({ stop_loss : text})}
                    />
                    <FormValidationMessage>
                        {this.state.errorMessage}
                    </FormValidationMessage>
                    <Button 
                        buttonStyle = {styles.button}
                        title="Đặt lệnh"
                        textStyle = {styles.buttonText}
                        containerViewStyle = {styles.buttonContainer}
                        onPress = {this._createOrder}
                    />
                </KeyboardAwareScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4C9BCF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox:{
        width:350,
        height:50,
        backgroundColor: '#5F5395',
        borderRadius: 10,
        paddingHorizontal: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button:{
        width:300,
        height:50,
        backgroundColor: '#5F5395',
        borderRadius: 22,
    },
    buttonContainer:{
        paddingVertical: 10
    },
    textStyle:{
        fontSize: 18,
        color: "#fff"
    },
});
