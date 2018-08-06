import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, Alert } from 'react-native';
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate } from 'react-i18next';

import I18n from 'ex-react-native-i18n';
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
            data : null
        };
        this.getUserProfile = this.getUserProfile.bind(this);
        this.onLogOut = this.onLogOut.bind(this);

    }  

    componentDidMount(){
        this.getUserProfile();
    }
    onLogOut(){
        this.props.screenProps.onLogOut();
    }
    getUserProfile = () => {
        this.setState({ loading: true });
        axios.get(`https://tinhieu-backend.herokuapp.com/users/me`, {headers: {
            "Authorization" : "Bearer " + this.state.access_token
          }
        })
        .then(res => {
            const data = res.data;
            this.setState({data: data})
        }).catch(error =>{
            console.log(error);
        })
    };



    render() {

        return (
            
            <View style = {styles.container}>
            <Header 
                outerContainerStyles={{ backgroundColor: 'black', height: StatusBar.currentHeight - 5 }}
            />
            <Header 
                centerComponent={{ text: I18n.t('account'), style: { color: '#fff', fontSize: 16, fontWeight: 'bold' } }}
                outerContainerStyles={{ backgroundColor: '#5F5395', height: 50 }}
                innerContainerStyles={{ justifyContent: 'space-around' }}
            />
            {/* <ListItem
                title={`Tỉ lệ thành công`}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
                hideChevron
            /> */}
            <ListItem 
                title= {I18n.t('info')}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
                onPress={()=> this.props.navigation.navigate('UserProfile', {data: this.state.data, access_token : this.state.access_token})}
            />
            {/* <ListItem
                title={`Chỉnh sửa thông tin tài khoản`}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
            /> */}
            <ListItem
                title= {I18n.t('logout')}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
                onPress = {() => this.onLogOut()}
            />
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
