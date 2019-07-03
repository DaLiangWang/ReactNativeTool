import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,Navigator} from 'react-native';
import Navigation from './AppRouter/Rooter';


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