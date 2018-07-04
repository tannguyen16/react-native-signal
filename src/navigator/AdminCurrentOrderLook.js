import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TextInput, Picker, Alert } from 'react-native';
import { List, ListItem, SearchBar, Header, FormValidationMessage, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import axios from 'axios';
import {GetRequest} from '../helper/request_helper';


export default class AdminCurrentOrderLook extends React.Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: '#1c313a', height: 40 },
        headerTitleStyle: { color: 'white', alignItems: 'center' },
        title: "Tạo tín hiệu",
    }

    constructor(props) {
        super(props);

        const { navigation } = this.props;
        this.state = {
            loading: false,
            access_token : navigation.getParam('access_token', 'access_token'),
            item: navigation.getParam('item', null),
            errorMessage : null
        };
        this._endOrderTP= this._endOrderTP.bind(this);
        this._endOrderSL= this._endOrderSL.bind(this);
        this._deleteOrder= this._deleteOrder.bind(this);
        this._alertDelete= this._alertDelete.bind(this);
    }  

    _endOrderTP() {
        const itemId = this.state.item.id;
        axios.post(`https://tinhieu-backend.herokuapp.com/admin/change_status`, {
            noti_id : itemId,
            status: 1
        },
        {
            headers: {
                "Authorization" : "Bearer " + this.state.access_token
            }
        })
        .then(res => {
            const data = res.data;
            console.log(data);
            this.setState({errorMessage: "Cắt lệnh thành công"})
        })
        .then(res => {
            const { navigation } = this.props;
            navigation.goBack();
            navigation.state.params.onSelect({ selected: true });
        })
        .catch(error =>{
            console.log(error.response);
            this.setState({errorMessage: "Cắt lệnh không thành công"})
            console.log(this.access_token);
        })
    }

    _endOrderSL() {
        const itemId = this.state.item.id;
        axios.post(`https://tinhieu-backend.herokuapp.com/admin/change_status`, {
            noti_id : itemId,
            status : -1
        },
        {
            headers: {
                "Authorization" : "Bearer " + this.state.access_token
            }
        })
        .then(res => {
            const data = res.data;
            console.log(data);
            this.setState({errorMessage: "Cắt lệnh thành công"})
        })
        .then(res => {
            const { navigation } = this.props;
            navigation.goBack();
            navigation.state.params.onSelect({ selected: true });
        })
        .catch(error =>{
            console.log(error.response);
            this.setState({errorMessage: "Cắt lệnh không thành công"})
            console.log(this.access_token);
        })
    }

    _alertDelete(){
        Alert.alert(
            'Xóa lệnh',
            'Bạn có muốn xóa lệnh này không?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this._deleteOrder()},
            ],
            { cancelable: false }
          )
    }

    _deleteOrder() {
        const itemId = this.state.item.id;
        axios.delete(`https://tinhieu-backend.herokuapp.com/admin/notification/` + itemId, 
        {
            headers: {
                "Authorization" : "Bearer " + this.state.access_token
            }
        })
        .then(res => {
            const data = res.data;
            console.log(data);
            this.setState({errorMessage: "Cắt lệnh thành công"})
        })
        .then(res => {
            const { navigation } = this.props;
            navigation.goBack();
            navigation.state.params.onSelect({ selected: true });
        })
        .catch(error =>{
            console.log(error.response);
            this.setState({errorMessage: "Cắt lệnh không thành công"})
            console.log(this.access_token);
        })
    }

    render() {
        return (
            <List containerStyle={{ flex: 1, borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'black' }}>
                <Header 
                    centerComponent={{ text: 'Xem Lệnh', style: { color: '#fff', fontSize: 16, fontWeight: 'bold' } }}
                    outerContainerStyles={{ backgroundColor: '#1c313a', height: 50 }}
                    innerContainerStyles={{ justifyContent: 'space-around' }}
                />

                <View style = {styles.rowContainer}>
                    <Button 
                        buttonStyle = {styles.buttonEdit}
                        title="Chỉnh sửa lệnh"
                        textStyle = {styles.buttonText}
                        containerViewStyle = {styles.buttonContainer}
                        onPress = {()=> this.props.navigation.navigate('EditOrder', { item: this.state.item, access_token : this.state.access_token })}
                    />
                    <Button 
                        buttonStyle = {styles.buttonSL}
                        title="Xóa lệnh"
                        textStyle = {styles.buttonText}
                        containerViewStyle = {styles.buttonContainer}
                        onPress = {this._alertDelete}
                    />
                </View>
                <ListItem 
                    title={this.state.item.currency_code}
                    titleStyle = {styles.textStyle}
                    containerStyle={{ height: 50 }}
                    hideChevron
                />
                <ListItem 
                    title={this.state.item.buy_or_sell == 0 ? "MUA": "BÁN"}
                    titleStyle = {styles.textStyle}
                    rightTitle={"" + this.state.item.price}
                    containerStyle={{ height: 50 }}
                    hideChevron
                />
                <ListItem
                    title={`Take Profit #1`}
                    titleStyle = {{color : "green"}}
                    rightTitle={"" + this.state.item.take_profit_one}
                    containerStyle = {{borderBottomWidth : 0, height : 35}}
                    hideChevron
                />
                <ListItem
                    title={`Take Profit #2`}
                    titleStyle = {{color : "green"}}
                    rightTitle={"" + this.state.item.take_profit_two}
                    containerStyle={{ borderBottomWidth : 0, height: 35}}
                    hideChevron
                />
                <ListItem
                    title={`Take Profit #3`}
                    titleStyle = {{color : "green"}}
                    rightTitle={"" + this.state.item.take_profit_three}
                    containerStyle={{ borderBottomWidth : 0, height: 35 }}
                    hideChevron
                />
                <ListItem
                    title={`Stop Loss`}
                    titleStyle = {{color : "red"}}
                    rightTitle={"" + this.state.item.stop_loss}
                    containerStyle={{ height: 35 }}
                    hideChevron
                />
                <View style = {styles.container}>
                    <Text style = {styles.textStyle}> Đang Chờ Kết Quả </Text>
                </View>
                <View style = {styles.rowContainer}>
                    <Button 
                        buttonStyle = {styles.buttonTP}
                        title="Cắt lệnh với Take Profit"
                        textStyle = {styles.buttonText}
                        containerViewStyle = {styles.buttonContainer}
                        onPress = {this._endOrderTP}
                    />
                    <Button 
                        buttonStyle = {styles.buttonSL}
                        title="Cắt lệnh với Stop Loss"
                        textStyle = {styles.buttonText}
                        containerViewStyle = {styles.buttonContainer}
                        onPress = {this._endOrderSL}
                    />
                </View>
                    <FormValidationMessage>
                        {this.state.errorMessage}
                    </FormValidationMessage>

                </List>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderBottomWidth: 5,
    },
    rowContainer: {
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15
    },
    inputBox:{
        width:350,
        height:50,
        backgroundColor: '#1c313a',
        borderRadius: 10,
        paddingHorizontal: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    buttonTP:{
        width:100,
        height:50,
        backgroundColor: 'green',
        borderRadius: 15,
    },
    buttonEdit:{
        width:100,
        height:50,
        backgroundColor: '#1c313a',
        borderRadius: 15,
    },
    buttonSL:{
        width:100,
        height:50,
        backgroundColor: 'red',
        borderRadius: 15,
    },
    buttonContainer:{
        paddingVertical: 10,
    },
    textStyle:{
        fontSize: 18,
        color: "#fff"
    },
});
