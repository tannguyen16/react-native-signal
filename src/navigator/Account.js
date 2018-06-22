import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Account extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <View style={styles.container}>
            <Text> Account </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
  },
});
