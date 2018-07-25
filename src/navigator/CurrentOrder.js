import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PTRView from 'react-native-pull-to-refresh';

import axios from 'axios';
import {GetRequest} from '../helper/request_helper';


export default class CurrentOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            access_token : this.props.screenProps.access_token,
            data: null,
            user_number: null,
            dataDisplay: null,
            refresh: null
        };

        this._refresh = this._refresh.bind(this);
    }  



    componentDidMount() {
        this.makeRemoteRequest();
    }
    

    makeRemoteRequest = () => {
        var dataDisplay = [];
        this.setState({ loading: true });
        console.log("here");
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
                if(notification.status == 0) {
                    dataDisplay.push(notification);
                }
            });
            this.setState({dataDisplay : dataDisplay});
        }).catch(error =>{
            console.log(error.response);

        })
    };
    

    _refresh() {
        return new Promise((resolve) => {
            this.makeRemoteRequest();
            setTimeout(()=>{resolve()}, 1000)
          
        });
    }

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
            <View style = {styles.container}>
            <Header 
            outerContainerStyles={{ backgroundColor: 'black', height: StatusBar.currentHeight - 5 }}
            />
            <Header 
                centerComponent={{ text: 'Tín Hiệu Mới', style: { color: '#fff', fontSize: 16, fontWeight: 'bold' } }}
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
                            subtitle={item.buy_or_sell == 0 ? "Mua - " + `${item.price}` : "Bán - " + `${item.price}`}
                            subtitleStyle = {styles.subtitleStyle}
                            rightTitle = {"Lệnh đang chạy"}
                            rightTitleStyle = {styles.rightTitleStyle}
                            rightSubtitle = {"Vui lòng chờ"}
                            containerStyle={{ borderBottomWidth: 0 }}
                            onPress={()=> this.props.navigation.navigate('CurrentOrderLook', { item: item, access_token : this.state.access_token })}
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
        flex : 1,
        backgroundColor: '#4C9BCF'
  },
  textStyle:{
    fontSize: 19,
    fontWeight: 'bold',
    color: "#fff"
  },
  rightTitleStyle:{
    fontSize: 16,
    fontWeight: 'bold',
    color: "#fff"
  },
  subtitleStyle:{
      fontSize: 17,
      fontWeight: 'bold',
  }
});
