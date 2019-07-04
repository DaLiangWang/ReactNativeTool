import React, { Component } from 'react';
import {Image, Text, View,Button,Alert} from 'react-native';
import BaseView from '../../common/base/BaseView';
import BaseTableView from "../../common/base/BaseTableView";

export default class Table extends BaseView {
    constructor(props) {
        super(props);
        this.navigationBar.title = "table";
    }

    renderView(item){
        return (
            <View>
                <Button
                    title={item.test}
                />
            </View>
        )
    }


    renderContent() {
        // const {data} = this.dataFrom;
        return (
            <View style={{flex: 1}}>
                <BaseTableView
                    url={"https://raw.githubusercontent.com/DaLiangWang/ReactNativeTool/dev/TestData/listData.json"}
                    renderView={this.renderView.bind(this)}
                    {...this.props}
                />
            </View>
        );
    }
}