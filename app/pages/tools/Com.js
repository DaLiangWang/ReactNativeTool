import React, { Component } from 'react';
import { Text, View, Navigator, FlatList, TouchableOpacity, Button, Picker } from 'react-native';
import BaseView from './../../component/base/BaseView';
import commonStyle from '../../css/commonStyle';

export default class PickerView extends BaseView {

    constructor(props) {
        super(props);
        this.navigationBar.title = "Picker选择器";
        this.navigationBar.leftTitle = "返回";
        this.navigationBar.rightTitle = "sender";

        this.comHide.HideAll = false;
        this.comHide.AlertHide = true;
        this.comHide.ShowViewHide = true;


        // this.comHide.NavigationBarHide = false;
    }
    leftAction() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    async rightAction() {
        console.log(this);
    }

    clickAlert(item) {
        this.AlertData.show("请选择照片", ["拍照", "图库"], '#333333', (obj) => {
            console.log(obj);
        });

        console.log(item);
    }

    clickEView(item) {
        console.log(item);
        this.refs.ShowView.show()

    }

    renderContent() {
        return (
            <View>
                <TouchableOpacity activeOpacity={1} onPress={() => this.clickAlert("")}>
                    <View style={{ backgroundColor: commonStyle.orange, height: 44 }}>
                        <Text>弹出选择框</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => this.clickEView("")}>
                    <View style={{ backgroundColor: commonStyle.orange, height: 44 }} >
                        <Text>弹出空白页</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}
