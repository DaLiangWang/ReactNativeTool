import React, { Component } from 'react';
import { Text, View, Navigator, FlatList, TouchableOpacity, Button, Picker } from 'react-native';
import BaseView from '../../component/base/BaseView';
import commonStyle from '../../css/commonStyle';

export default class Com extends BaseView {
    state = {
        language: null,
    }
    constructor(props) {
        super(props);
        this.navigationBar.title = "组件";
        this.navigationBar.leftTitle = "返回";

    }
    leftAction() {
        const { navigation } = this.props;
        navigation.goBack();
    }
    clickItem(item) {
        console.log(item);

    }


    renderContent() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => this.clickItem("d")}>
                <Picker
                    selectedValue={this.state.language}
                    style={{ backgroundColor: commonStyle.cyan }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </TouchableOpacity>
        );
    }
}
