//LoginScreen.js
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import BaseView from '../../AHProject/component/base/BaseView';
import OtherTwo from "./OtherTwo";

export default class OtherOne extends BaseView{
    constructor(props) {
        super(props);
        this.navigationBar.title = "二层路由";
        this.navigationBar.leftTitle = "返回";
        this.navigationBar.rightTitle = "OtherTwo";
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
                    二层路由，跳转不隐藏tabbar
                </Text>
            </View>
        );
    }
}
