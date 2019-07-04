import React, { Component } from 'react';
import {Image, Text, View,Button,Alert} from 'react-native';
import BaseView from '../../common/base/BaseView';
import BaseTableView from "../../common/base/BaseTableView";

export default class Mine extends BaseView {
    constructor(props) {
        super(props);
        this.navigationBar.title = "xxx";
    }

    dataFrom = {
        data:[
            {
                id:"1",
                title:"11111",
            },
            {
                id:"2",
                title:"2",
            },
            {
                id:"3",
                title:"3",
            },
        ]
    }

    renderView(item){
        return (
            <View>
                <Button
                    onPress={() => {
                        Alert.alert("你点击了按钮！");
                    }}
                    title="点我！"
                />
            </View>
        )
    }


    renderContent() {
        const {data} = this.dataFrom;

        return (
            <View style={{flex: 1}}>
                <BaseTableView
                    dataFrom={data}
                    renderView={this.renderView.bind()}
                    {...this.props}
                />
            </View>
        );
    }
}