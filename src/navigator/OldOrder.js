import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import axios from 'axios';
import {GetRequest} from '../helper/request_helper';


export default class OldOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            access_token : this.props.screenProps.access_token,
            data: null,
            user_number: null,
            dataDisplay: null
        };


    }  

    componentDidMount() {
        this.makeRemoteRequest();
    }
    

    makeRemoteRequest = () => {
        var dataDisplay = [];
        this.setState({ loading: true });
        axios.get(`https://tinhieu-backend.herokuapp.com/notification`, 
        {
            headers: {
                "Authorization" : "Bearer " + this.state.access_token
            }
        })
        .then(res => {
            const data = res.data;
            this.setState({data : data});
            console.log(data.notifications);
            data.notifications.forEach(notification => {
                if(notification.status != 0) {
                    dataDisplay.push(notification);
                }
            });
            this.setState({dataDisplay : dataDisplay});
        }).catch(error =>{
            console.log(error.response);
            console.log(this.access_token);
        })
    };
    

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#CED0CE",
            }}
          />
        );
      };
    
    render() {
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <Header 
                centerComponent={{ text: 'Tín Hiệu Cũ', style: { color: '#fff', fontSize: 16, fontWeight: 'bold' } }}
                outerContainerStyles={{ backgroundColor: '#1c313a', height: 50 }}
                innerContainerStyles={{ justifyContent: 'space-around' }}
            />
                <FlatList
                    backgroundColor = 'black'
                    data={this.state.dataDisplay}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({ item }) => (
                        <ListItem
                          title={`${item.currency_code}`}
                          titleStyle = {styles.textStyle}
                          subtitle={item.buy_or_sell == true ? "Mua - " + `${item.price}` : "Bán - " + `${item.price}`}
                          subtitleStyle = {styles.subtitleStyle}
                          rightTitle = {item.status == 1? "TAKE PROFIT" : "STOP LOSS"}
                          rightTitleStyle = {item.status == 1 ? styles.successTitleStyle : styles.failTitleStyle }
                          containerStyle={{ borderBottomWidth: 0 }}
                          
                        />
                    
                    )}
                />
            </List>
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
  successTitleStyle:{
    fontSize: 16,
    fontWeight: 'bold',
    color: "green"
  },
  failTitleStyle:{
    fontSize: 16,
    fontWeight: 'bold',
    color: "red"
  },
  subtitleStyle:{
      fontSize: 17,
      fontWeight: 'bold',
  }
});
