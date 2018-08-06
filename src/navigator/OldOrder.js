import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PTRView from 'react-native-pull-to-refresh';

import I18n from 'ex-react-native-i18n';

import axios from 'axios';
import {GetRequest} from '../helper/request_helper';


export default class AdminOldOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            access_token : this.props.screenProps.access_token,
            data: null,
            user_number: null,
            dataDisplay: null
        };

        this._refresh = this._refresh.bind(this);

    }  

    _refresh() {
        return new Promise((resolve) => {
            this.makeRemoteRequest();
            setTimeout(()=>{resolve()}, 1000)
          
        });
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
            data.notifications.forEach(notification => {
                if(notification.status != 0) {
                    dataDisplay.push(notification);
                }
            });
            this.setState({dataDisplay : dataDisplay});
        }).catch(error =>{
            console.log(error.response);
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
            <View style = {styles.container} >
            <Header 
                outerContainerStyles={{ backgroundColor: 'black', height: StatusBar.currentHeight - 5 }}
            />
            <Header 
                centerComponent={{ text: I18n.t('oldSignal'), style: { color: '#fff', fontSize: 16, fontWeight: 'bold' } }}
                outerContainerStyles={{ backgroundColor: '#5F5395', height: 50, marginTop: StatusBar.height }}

            />
            <PTRView onRefresh={this._refresh}>
                    <FlatList
                        backgroundColor = 'black'
                        data={this.state.dataDisplay}
                        keyExtractor={item => item.id.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                        inverted
                        renderItem={({ item }) => (
                            <ListItem 
                            title={`${item.currency_code}`}
                            titleStyle = {styles.textStyle}
                            subtitle={item.buy_or_sell == 0 ? "Buy - " + `${item.price}` : "Sell - " + `${item.price}`}
                            subtitleStyle = {styles.subtitleStyle}
                            rightTitle = {item.status == 1? "TAKE PROFIT" : "STOP LOSS"}
                            rightTitleStyle = {item.status == 1 ? styles.successTitleStyle : styles.failTitleStyle }
                            containerStyle={{ borderBottomWidth: 0 }}
                            onPress={()=> this.props.navigation.navigate('OldOrderLook', { item: item, access_token : this.state.access_token })}
                            />
                        
                        )}
                    />
            </PTRView>
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
