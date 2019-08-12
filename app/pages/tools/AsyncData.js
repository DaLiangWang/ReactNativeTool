import React, { Component } from 'react';
import { Text, View, Navigator, FlatList, TouchableOpacity, Button, Picker } from 'react-native';
import BaseView from '../../AHProject/component/base/BaseView';
import commonStyle from '../../AHProject/css/commonStyle';

export default class AsyncData extends BaseView {
   
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
        const data = {
            from: 'some other site',
            userid: 'some userid',
            token: 'some token',
        };
        storage.save('loginState', data, 5000);
        storage.saveId('loginState',"sss", {"sd":"dd"}, 5000);
        storage.saveId('loginState',"kkk", {"sd":"dd"}, 5000);
        console.log(item);
    }
    clickRemove(item) {
        storage.remove('loginState');
        console.log(item);

    }

    renderContent() {
        return (
            <View>
                <TouchableOpacity activeOpacity={1} onPress={() => this.clickSave("保存")}>
                    <View style={{ backgroundColor: commonStyle.orange, height: 44 }}>
                        <Text>保存数据</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => this.clickRemove("删除")}>
                    <View style={{ backgroundColor: commonStyle.orange, height: 44 }} >
                        <Text>删除数据</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
