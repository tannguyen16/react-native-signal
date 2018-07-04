import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
        };
        this.getUserNumber = this.getUserNumber.bind(this);
    }  

    componentDidMount(){
        this.getUserNumber();
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
                outerContainerStyles={{ backgroundColor: '#1c313a', height: 50 }}
                innerContainerStyles={{ justifyContent: 'space-around' }}
            />
            <ListItem 
                title={`Tạo tín hiệu`}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
                onPress={()=> this.props.navigation.navigate('CreateOrder')}

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
                title={`Xác nhận người dùng`}
                titleStyle = {styles.textStyle}
                containerStyle={{ height: 50 }}
            />
            </List>
            </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
  },
  textStyle:{
    fontSize: 19,
    fontWeight: 'bold',
    color: "#fff"
  },
});
