import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,Navigator} from 'react-native';
import Navigation from './router/Rooter';
import storage from './AHProject/common/storage/storage';
// import storageTools from './common/storage/storageTools';


export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Navigation/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});