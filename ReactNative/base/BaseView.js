import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class BaseView extends Component {

    renderContent() {
        return null;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{height:64, backgroundColor: 'powderblue'}} />
                <View style={{flex: 1, backgroundColor: 'skyblue'}}>
                    {this.renderContent()}
                </View>
            </View>
        );
    }
}