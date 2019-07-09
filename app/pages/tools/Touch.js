import React, { Component } from 'react';
import { Text, View, Navigator, FlatList, TouchableOpacity, Button } from 'react-native';
import BaseView from '../../component/base/BaseView';
import commonStyle from '../../css/commonStyle';

export default class Touch extends BaseView {
 
    constructor(props) {
        super(props);
        this.navigationBar.title = "手势响应";
        this.navigationBar.leftTitle = "返回";

    }
    leftAction(){
        const { navigation } = this.props;
        navigation.goBack();
    }
    clickItem(item) {
        console.log(item);

    }


    renderContent() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => this.clickItem("d")}>
                <View style={{ backgroundColor: commonStyle.orange, height: 44 }}>
                    <Text>sfsfs</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
