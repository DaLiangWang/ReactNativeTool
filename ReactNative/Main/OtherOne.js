//LoginScreen.js
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import BaseView from '../Base/BaseView';
import OtherTwo from "./OtherTwo";

export default class OtherOne extends BaseView{
    constructor(props) {
        super(props);
        this.state.title = "OtherOne";
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
