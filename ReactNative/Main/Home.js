import React, { Component } from 'react';
import { Text, View,Navigator } from 'react-native';
import BaseView from '../Base/BaseView';

export default class Home extends BaseView {
    constructor(props) {
        super(props);
        this.state.title = "首页";
        this.state.leftTitle = "lll";
        this.state.rightTitle = "rrr";
    }


    leftAction(){
        const { navigation } = this.props;
        navigation.goBack();
    }

    rightAction(){
        const { navigation } = this.props;
        navigation.navigate('Login')
    }

    renderContent() {
        return (
            <View>
                <Text onPress={()=>{this.props.navigation.navigate('Login')}}>
                    login
                </Text>
            </View>
        );
    }
}