import React from 'react';
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Login from './src/pages/login';

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#1c313a"
            barStyle="light-content"
          />
          <Login/>
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
