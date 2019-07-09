import React, { Component } from 'react';
import { Text, View, Navigator, FlatList, TouchableOpacity, Button } from 'react-native';
import BaseView from '../../component/base/BaseView';
import BaseTableView from "../../component/base/BaseTableView";
import commonStyle from '../../css/commonStyle';

export default class Home extends BaseView {
    data = [
        {
            title: "手势响应",
            view: "Touch"
        },
        {
            title: "组件",
            view: "Com"
        },
        {
            title: "本地数据存储",
            view: "AsyncData"
        },
        {
            title: "文件缓存",
            view: "FileCache"
        },
        
    ]
    constructor(props) {
        super(props);
        this.navigationBar.title = "home";
    }
    clickItem(item) {
        console.log(item);
        const { navigation } = this.props;
        navigation.navigate(item.view);
    }
    renderView(item) {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => this.clickItem(item)}>
                <View style={{ backgroundColor: commonStyle.orange, height: 44 }}>
                    <Text>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    dataFrom(data) {
        console.log(data);
        return data.map((item, index) => {
            item.title = item.title + index;
            return item;
        });
    }

    renderContent() {
        return (
            <BaseTableView
                data={this.data}
                renderView={this.renderView.bind(this)}
                dataFrom={this.dataFrom.bind(this)}
                // isOpenItemLayout = {true}
                {...this.props}
            />
        );
    }
}
