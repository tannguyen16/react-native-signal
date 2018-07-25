import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TextInput, Picker, Alert } from 'react-native';
import { List, ListItem, SearchBar, Header, FormValidationMessage, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import axios from 'axios';
import {GetRequest} from '../helper/request_helper';


export default class UserProfile extends React.Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: '#5F5395', height: 40 },
        headerTitleStyle: { color: 'white', alignItems: 'center' },
        title: "Thông Tin Tài Khoản",
    }

    constructor(props) {
        super(props);

        const { navigation } = this.props;
        this.state = {
            loading: false,
            access_token : navigation.getParam('access_token', 'access_token'),
            data: navigation.getParam('data', null),
            errorMessage : null
        };
    }  


    render() {
        return (
            <View style = {styles.container}>
                {/* <Header 
                    centerComponent={{ text: 'Thông Tin Tài Khoản', style: { color: '#fff', fontSize: 16, fontWeight: 'bold' } }}
                    outerContainerStyles={{ backgroundColor: '#5F5395', height: 50 }}
                    innerContainerStyles={{ justifyContent: 'space-around' }}
                /> */}
                <ListItem 
                    title={'Họ'}
                    titleStyle = {styles.textStyle}
                    rightTitle={"" + this.state.data.last_name}
                    containerStyle={{ height: 50 }}
                    hideChevron
                />
                <ListItem 
                    title={'Tên'}
                    titleStyle = {styles.textStyle}
                    rightTitle={"" + this.state.data.first_name}
                    containerStyle={{ height: 50 }}
                    hideChevron
                />
                <ListItem 
                    title={'Tên tài khoản'}
                    titleStyle = {styles.textStyle}
                    rightTitle={"" + this.state.data.username}
                    containerStyle={{ height: 50 }}
                    hideChevron
                />
                <ListItem 
                    title={'Mã ID'}
                    titleStyle = {styles.textStyle}
                    rightTitle={"" + this.state.data.id}
                    containerStyle={{ height: 50 }}
                    hideChevron
                />
                <ListItem 
                    title={'Email'}
                    titleStyle = {styles.textStyle}
                    rightTitle={"" + this.state.data.email}
                    containerStyle={{ height: 50 }}
                    hideChevron
                />
                <ListItem 
                    title={'Số điện thoại'}
                    titleStyle = {styles.textStyle}
                    rightTitle={"" + this.state.data.phone}
                    containerStyle={{ height: 50 }}
                    hideChevron
                />
                <ListItem 
                    title={'Ngày kích hoạt'}
                    titleStyle = {styles.textStyle}
                    rightTitle={this.state.data.date_of_active == null ? "Chưa kích hoạt" : "" + this.state.data.date_of_active.split(' ')[0]}
                    containerStyle={{ height: 50 }}
                    hideChevron
                />
                <ListItem 
                    title={'Ngày hết hạn'}
                    titleStyle = {styles.textStyle}
                    rightTitle={this.state.data.date_of_deactive == null ? "Chưa kích hoạt" : "" + this.state.data.date_of_deactive.split(' ')[0]}
                    containerStyle={{ height: 50 }}
                    hideChevron
                />
                    <FormValidationMessage>
                        {this.state.errorMessage}
                    </FormValidationMessage>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#4C9BCF'
  },
    resContainer: {
        flex : 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: '#5F5395',
        borderRadius: 10,
        paddingHorizontal: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    buttonTP:{
        width:150,
        height:50,
        backgroundColor: 'green',
        borderRadius: 15,
        justifyContent: "center",
        alignSelf: "stretch"
    },
    buttonEdit:{
        width:150,
        height:50,
        backgroundColor: '#5F5395',
        borderRadius: 15,
        justifyContent: "center",
       alignSelf: "stretch"
    },
    buttonSL:{
        width:150,
        height:50,
        backgroundColor: 'red',
        borderRadius: 15,
        justifyContent: "center",
        alignSelf: "stretch"
    },
    buttonContainer:{
        paddingVertical: 10,
        justifyContent: 'center', 
        alignItems: 'center' ,
        alignSelf: 'center'
    },
    textStyle:{
        fontSize: 18,
        color: "#fff"
    },
});
