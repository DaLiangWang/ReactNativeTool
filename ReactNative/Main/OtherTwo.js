//LoginScreen.js
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import BaseView from '../Base/BaseView';

export default class OtherTwo extends BaseView{
    constructor(props) {
        super(props);
        this.state.title = "OtherTwo";
        this.state.leftTitle = "lll";
        this.state.rightTitle = "rrr";
    }

    leftAction(){
        const { navigation } = this.props;
        navigation.goBack();
    }

    rightAction(){
        const { navigation } = this.props;
        navigation.navigate('OtherTwo');
    }

    renderContent() {
        return (
            <View>
                <Text>
                    OtherTwo
                </Text>
            </View>
        );
    }
}
