import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class CurrentOrder extends React.Component {

    
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          data: [],
          page: 1,
          seed: 1,
          error: null,
          refreshing: false,
        };
    }  

    componentDidMount() {
        this.makeRemoteRequest();
    }
    
    makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
        .then(res => res.json())
        .then(res => {
        this.setState({
            data: page === 1 ? res.results : [...this.state.data, ...res.results],
            error: res.error || null,
            loading: false,
            refreshing: false
        });
        })
        .catch(error => {
        this.setState({ error, loading: false });
        });
    };

    renderHeader = () => {
        return <Header centerComponent={{ text: 'Lệnh đang chạy', style: { color: '#fff' } }}
        outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
        innerContainerStyles={{ justifyContent: 'space-around' }} />;
      };

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
      };
    
    render() {
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <Header 
                centerComponent={{ text: 'Lệnh Đang Chạy', style: { color: '#fff', fontSize: 16, fontWeight: 'bold' } }}
                outerContainerStyles={{ backgroundColor: '#1c313a', height: 50 }}
                innerContainerStyles={{ justifyContent: 'space-around' }}
            />
                <FlatList
                    backgroundColor = '#455a64'
                    data={this.state.data}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({ item }) => (
                        <ListItem
                          roundAvatar
                          title={`${item.name.first} ${item.name.last}`}
                          subtitle={item.email}
                          avatar={{ uri: item.picture.thumbnail }}
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
});
