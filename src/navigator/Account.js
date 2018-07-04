import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Account extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <Header 
                centerComponent={{ text: 'Tài Khoản', style: { color: '#fff', fontSize: 16, fontWeight: 'bold' } }}
                outerContainerStyles={{ backgroundColor: '#1c313a', height: 50 }}
                innerContainerStyles={{ justifyContent: 'space-around' }}
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
});
