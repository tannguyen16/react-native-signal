import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {NavigationActions} from 'react-navigation';
import Prompt from 'rn-prompt';
import {Permissions, Notifications} from 'expo';
import * as firebase from 'firebase';
import axios from 'axios';

export default class AdminAccount extends React.Component {
    static navigationOptions = {
        header: null
    }
    
        
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            access_token : this.props.screenProps.access_token,
            user_number: null,
            user_data: null,
            promptVisibleAct: false,
            promptVisibleDeact: false,
            promptVisibleExtend: false,
            promptVisibleNoti: false,
            promptVisibleInfo: false
        };

        if (!firebase.apps.length) {
            firebase.initializeApp({
              apiKey: "AIzaSyDhl4Rmp86P8Vixz3Z0r5yoZQ59bhsHB2I",
              authDomain: "tinhieu-backend.firebaseapp.com",
              databaseURL: "https://tinhieu-backend.firebaseio.com",
              projectId: "tinhieu-backend",
              storageBucket: "tinhieu-backend.appspot.com",
              messagingSenderId: "449954797568"
            });
          }

        this.getUserNumber = this.getUserNumber.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.promptActivate = this.promptActivate.bind(this);
        this.promptExtend= this.promptExtend.bind(this);
        //this.promptDeactive= this.promptDeactive.bind(this);
        this.sendNotification= this.sendNotification.bind(this);
        this._sendPushNotification = this._sendPushNotification.bind(this);
        this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this);
        this.onLogOut = this.onLogOut.bind(this);
    }  

    onLogOut(){
        this.props.screenProps.onLogOut();
    }

    componentDidMount(){
        this.getUserNumber();
        this.registerForPushNotificationsAsync();
    }

    registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
      
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
      
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
      
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        
        console.log("token" + token);
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

    sendNotification(value){
        this.setState({ loading: true });
        axios.post(`https://tinhieu-backend.herokuapp.com/admin/send_text`,  {
            text : value
        },
        {
            headers: {
                "Authorization" : "Bearer " + this.state.access_token
            }
        })
        .then(res => {
            const data = res.data;
            console.log(data);
            this._sendPushNotification(value);
            this.setState({promptVisibleNoti: false});
        }).catch(error =>{
            console.log(error);
        })
    };

    promptActivate(value){
        this.setState({ loading: true });
        axios.post(`https://tinhieu-backend.herokuapp.com/admin/confirm_user`,  {
            user_id : value
        },
        {
            headers: {
                "Authorization" : "Bearer " + this.state.access_token
            }
        })
        .then(res => {
            const data = res.data;
            console.log(data);
            this.setState({promptVisibleAct: false});
        }).catch(error =>{
            console.log(error);
        })
    };

    // promptDeactivate(value){
    //     this.setState({ loading: true });
    //     axios.post(`https://tinhieu-backend.herokuapp.com/admin/confirm_user`,  {
    //         user_id : value
    //     },
    //     {
    //         headers: {
    //             "Authorization" : "Bearer " + this.state.access_token
    //         }
    //     })
    //     .then(res => {
    //         const data = res.data;
    //         console.log(data);
    //         this.setState({promptVisibleDeact: false});
    //     }).catch(error =>{
    //         console.log(error);
    //     })
    // };

    promptExtend(value){
        this.setState({ loading: true });
        axios.post(`https://tinhieu-backend.herokuapp.com/admin/extend_duration`, {
            user_id : value,
            month_extend: 1
        },
        {headers: {
            "Authorization" : "Bearer " + this.state.access_token
          }
        })
        .then(res => {
            const data = res.data;
            console.log(data);
            this.setState({promptVisibleExtend: false});
        }).catch(error =>{
            console.log(error);
        })
    };

    getUserInfo(value){
        this.setState({ loading: true });
        axios.get(`https://tinhieu-backend.herokuapp.com/admin/info/` + value, {headers: {
            "Authorization" : "Bearer " + this.state.access_token
          }
        })
        .then(res => {
            const data = res.data;
            this.setState({user_data: data})
            this.setState({promptVisibleInfo: false});
        }).then(res => {
            this.props.navigation.navigate('UserProfile',  {data: this.state.user_data, access_token : this.state.access_token});
        }).catch(error =>{
            console.log(error);
        })
    }

    getUserNumber = () => {
        this.setState({ loading: true });
        axios.get(`https://tinhieu-backend.herokuapp.com/admin/list_user`, {headers: {
            "Authorization" : "Bearer " + this.state.access_token
          }
        })
        .then(res => {
            const data = res.data;
            console.log(data.users.length);
            this.setState({user_number: data.users.length})
        }).catch(error =>{
            console.log(error);
        })
    };

    render() {
        return (
            <View style = {styles.container}>
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'black' }}>
            <Header 
                centerComponent={{ text: 'Tài Khoản Admin', style: { color: '#fff', fontSize: 16, fontWeight: 'bold' } }}
                outerContainerStyles={{ backgroundColor: '#5F5395', height: 50 }}
                innerContainerStyles={{ justifyContent: 'space-around' }}
            />
            <ListItem 
                title={`Tạo tín hiệu`}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
                onPress={()=> this.props.navigation.navigate('CreateOrder')}

            />
            <ListItem
                title={`Gửi thông báo`}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
                onPress = {() => this.setState({promptVisibleNoti:true})}
            />
            <ListItem
                title={`Tỉ lệ thành công`}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
                hideChevron
            />
            <ListItem
                title={`Lượng người dùng`}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
                hideChevron
                rightTitle = {"" + this.state.user_number}
            />
            <ListItem
                title={`Activate tài khoản`}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
                onPress = {() => this.setState({promptVisibleAct:true})}
            />
            <ListItem
                title={`Tăng thời hạn`}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
                onPress = {() => this.setState({promptVisibleExtend:true})}
            />
            <ListItem
                title={`Xem thông tin tài khoản`}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
                onPress = {() => this.setState({promptVisibleInfo:true})}
            />
            {/* <ListItem
                title={`Deactivate tài khoản`}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
                onPress = {() => this.setState({promptVisibleDeact:true})}
            /> */}
            <ListItem
                title={`Thoát tài khoản`}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
                onPress = {() => this.onLogOut()}
            />
            </List>
            <Prompt
                title="Kích hoạt tài khoản"
                placeholder="ID tài khoản"
                defaultValue=""
                visible={ this.state.promptVisibleAct }
                onCancel={ () => this.setState({
                    promptVisibleAct: false
                }) }
                onSubmit={ (value) => this.promptActivate(value) }/>
            <Prompt
                title="Tăng thời hạn tài khoản"
                placeholder="ID tài khoản"
                defaultValue=""
                visible={ this.state.promptVisibleExtend }
                onCancel={ () => this.setState({
                    promptVisibleExtend: false
                }) }
                onSubmit={ (value) => this.promptExtend(value) }/>
            <Prompt
                title="Xem thông tin tài khoản"
                placeholder="ID tài khoản"
                defaultValue=""
                visible={ this.state.promptVisibleInfo }
                onCancel={ () => this.setState({
                    promptVisibleInfo: false
                }) }
                onSubmit={ (value) => this.getUserInfo(value) }/>
            <Prompt
                title="Xóa tài khoản"
                placeholder="ID tài khoản"
                defaultValue=""
                visible={ this.state.promptVisibleDeact }
                onCancel={ () => this.setState({
                    promptVisibleDeact: false
                }) }
                onSubmit={ (value) => this.promptDeactive(value) }/>
            <Prompt
                title="Gửi thông báo"
                placeholder="Thông báo"
                defaultValue=""
                visible={ this.state.promptVisibleNoti }
                onCancel={ () => this.setState({
                    promptVisibleNoti: false
                }) }
                onSubmit={ (value) => this.sendNotification(value) }/>
            </View>
            
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C9BCF',
  },
  textStyle:{
    fontSize: 19,
    fontWeight: 'bold',
    color: "#fff"
  },
});
