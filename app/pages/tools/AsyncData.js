import React, { Component } from 'react';
import { Text, View, Navigator, FlatList, TouchableOpacity, Button, Picker } from 'react-native';
import BaseView from '../../component/base/BaseView';
import commonStyle from '../../css/commonStyle';

export default class AsyncData extends BaseView {
    state = {
        language: null,
    }
    constructor(props) {
        super(props);
        this.navigationBar.title = "Async本地数据";
        this.navigationBar.leftTitle = "返回";
        this.navigationBar.rightTitle = "输出";

    }
    leftAction() {
        const { navigation } = this.props;
        navigation.goBack();
    }
    async rightAction() {
        let data = await storage.load('loginState');
        console.log(data);
    }
    clickSave(item) {
        console.log(item);
        const data = {
            from: 'some other site',
            userid: 'some userid',
            token: 'some token',
        };
        storage.save('loginState', data, 5000);
    }
    clickRemove(item) {
        console.log(item);
        storage.remove('loginState');
    }

    renderContent() {
        return (
            <View>
                <TouchableOpacity activeOpacity={1} onPress={() => this.clickSave("d")}>
                    <View style={{ backgroundColor: commonStyle.orange, height: 44 }}>
                        <Text>保存数据</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => this.clickRemove("d")}>
                    <View style={{ backgroundColor: commonStyle.orange, height: 44 }} >
                        <Text>删除数据</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
