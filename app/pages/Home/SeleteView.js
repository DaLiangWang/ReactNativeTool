//LoginScreen.js
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from 'react-native';
import BaseView from '../../component/base/BaseView';
import commonStyle from '../../css/commonStyle';
import BaseTableView from "../../component/base/BaseTableView";


const nativeHeight = 5;//工具栏高度百分比
const nativeItemSpacing = 1;//工具栏item间距
const nativeItemMinWidth = 80;//工具栏item最小宽度


let nativeItemWidth = nativeItemMinWidth;//工具栏item宽度
export default class SeleteView extends BaseView {
    state = {
        isPop: false,
        screeningData: null,
    }

    constructor(props) {
        super(props);
        this.navigationBar.title = "筛选视图";
        this.navigationBar.leftTitle = "返回";
    }

    leftAction() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    clickItem(item) {
        let { screeningData } = this.state;

        let isShow = this.state.isPop;
        if (isShow) {
            isShow = (item.key === screeningData.key) ? !isShow : true;
        } else {
            isShow = !isShow;
        }

        this.setState({
            isPop: isShow,
            screeningData: isShow ? item : null,
        })
    }
    closs() {
        this.setState({
            isPop: false,
            screeningData: null,
        })
    }
    renderView(item) {
        return <TouchableOpacity activeOpacity={1} onPress={() => this.clickItem(item)}>
            <View style={{
                backgroundColor: commonStyle.orange,
                height: '100%',
                width: nativeItemWidth,
                marginLeft: nativeItemSpacing,
                marginRight: nativeItemSpacing
            }}>
                <Text>{item.key}</Text>
            </View>
        </TouchableOpacity>
    }
    renderShowView(item) {
        return <Text style={{
            backgroundColor: commonStyle.blue,
        }}>{item.key}</Text>

    }
    getTabData() {
        return [
            { key: 'a' },
            { key: 'b' },
            { key: 'c' },
            { key: 'd' },
            { key: 'e' },
            { key: 'f' },
            { key: 'g' },
            { key: 'h' },
            { key: 'i' },
            { key: 'j' },
            { key: 'k' },
            { key: 'l' }];
    }

    renderContent() {
        let { screeningData, isPop } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        backgroundColor: commonStyle.drakGray,
                        top: (nativeHeight + '%'),
                        width: '100%',
                        flex: 1,
                        position: "absolute"
                    }}>
                    二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar
                    二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar
                    二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar二层路由，跳转不隐藏tabbar二层路由ar
                </Text>

                <View style={{
                    height: isPop ? '100%' : (nativeHeight + '%'),
                    // backgroundColor: commonStyle.green,
                    width: '100%',
                    position: "absolute"
                }}>
                    <BaseTableView
                        style={{
                            height: (nativeHeight + '%'),
                            // backgroundColor: commonStyle.red
                        }}
                        data={this.getTabData()}
                        renderView={this.renderView.bind(this)}
                        horizontal={true}
                    />

                    {isPop ? <View style={{
                        // marginTop: 50,
                        height: ((100 - nativeHeight) + '%'),
                        // flex: 1,
                        // backgroundColor: commonStyle.purple,
                    }}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            activeOpacity={1}
                            onPress={() => this.closs()}
                        >
                            {this.renderShowView(screeningData)}
                        </TouchableOpacity>
                    </View> : null}
                </View>
            </View >
        );
    }
}

// export const styles = StyleSheet.create({
//     contentView: {
//         backgroundColor: commonStyle.drakGray,
//         marginTop: nativeHeight,
//         width: '100%',
//         flex: 1,
//         position: "absolute"
//     },
//     nativeView: {
//         backgroundColor: commonStyle.green,
//         width: '100%',
//         position: "absolute"
//     },
// });