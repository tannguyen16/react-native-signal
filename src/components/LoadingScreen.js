import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Logo extends React.Component {
    render(){
        return(
            <View style = {styles.container}>
                <Image
                    style={{width: 80, height: 90}}
                    source={require('../images/logo.png')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });