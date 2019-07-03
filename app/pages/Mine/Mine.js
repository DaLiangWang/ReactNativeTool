import React, { Component } from 'react';
import {Image, Text, View,Button,Alert} from 'react-native';
import BaseView from '../../common/base/BaseView';

export default class Mine extends BaseView {
    constructor(props) {
        super(props);
        this.navigationBar.title = "xxx";
    }

    renderContent() {
        return (
            <View>
                <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
                       style={{width: 100, height: 100}} />
                <Button
                    onPress={() => {
                        Alert.alert("你点击了按钮！");
                    }}
                    title="点我！"
                />
            </View>
        );
    }
}