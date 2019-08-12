//LoginScreen.js
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from 'react-native';
import commonStyle from '../../../css/commonStyle';
import Util, { treeMap } from "../../../util/Util";
import ShowTableView from "./ShowTableView";
import ItemView from "./ItemView";

export const seleteViewStyle = {
    nativeHeight: 35,//工具栏高度
    nativeItemSpacing: 0.5,//工具栏item间距
    selectItemColor: commonStyle.bgColor,//选中Item颜色
    notSelectItemColor: commonStyle.white,//选中Item颜色
    windowHeight: Util.MAIN_HEIGHT(),//工具栏只有一个item的宽度
    nativeItemOneWidth: Util.MAIN_WIDTH(),//工具栏只有一个item的宽度
    nativeItemTwoWidth: Util.MAIN_WIDTH() / 2,//工具栏只有两个item的宽度
    nativeItemMinWidth: 100,//工具栏item最小宽度
}



export default class SeleteView extends PureComponent {
    // 所有数据列表
    allTabDataList = [];
    // 视图状态
    state = {
        isPop: false,
        seleteData: null,
    }

    constructor(props) {
        super(props);
        this.props = {
            tabData: [],
            renderMultiSelectShowView: true,
        }
    }


    _clickItem(item) {
        const listData = this.allTabDataList;
        let seleteItem = null;

        this.allTabDataList = listData.map((value) => {
            if (value.key_wl === item.key_wl) {
                seleteItem = value.isSelect_wl?value:null;
            } else {
                value.isSelect_wl = false;
            }
            return value;
        });

        this.setState({
            isPop: seleteItem,
            seleteData: seleteItem,
        })
    }
    _closs(touch) {
        this._clickItem({ key_wl: null });
    }

    /** 生成TAB视图 */
    _renderTabView(item, index) {
        item = item.item;
        console.log("--生成TAB视图--" + item);

        if (item.custom_wl) {
            return (typeof (this.props.renderTabView) === 'function') ?
                <View style={{ flex: 1 }}>
                    {this.props.renderTabView(item)}
                </View>
                : <Text>{item.key_wl}请实现renderTabView方法</Text>
        } else {
            return <ItemView dataCount={this.allTabDataList.length} data={item} clickItem={this._clickItem.bind(this)} >
                {
                    (typeof (this.props.renderTabView) === 'function') ?
                        <View style={{
                            flex: 1
                        }}>
                            {this.props.renderTabView(item)}
                        </View>
                        : <Text>{item.key_wl}请实现renderTabView方法</Text>
                }
            </ItemView>
        }
    }

    /** 生成弹出层视图 */
    _renderSeleteShowView(item) {
        console.log("--生成弹出层视图--" + item);
        if (item.key === 'department'){
            if (!item.dataList.length){
                console.log('请先选择工厂');
                this._closs();
                return;
            }
        }
        return <View style={{ backgroundColor: commonStyle.white, width: '100%', flex: 1 }}>
            {
                (typeof (this.props.renderSeleteShowView) === 'function') ?
                    this.props.renderSeleteShowView(item) :
                    (this.props.multiSelect ?
                        <ShowTableView
                            data={item}
                            onSuccessData={this._onSuccessData.bind(this)}
                        /> :
                        <Text>{item.key_wl}请实现renderSeleteShowView方法</Text>)
            }
            {this._renderSeleteShowMenuView(item)}
        </View>
    }
    _onSuccessData = (data) => {
        this._closs();
        // 选中的id列表
        let selectIdList = [];
        // 选中的工厂部门
        let selectFactoryList = [];
        for (let i = 0; i < this.allTabDataList.length; i++) {
            let typeData = this.allTabDataList[i];
            if (typeData.key === 'factory'){
                selectFactoryList = typeData.selectDataList;
            }
            if (typeData.key === 'department' && selectFactoryList){
                typeData.dataList = [];
                typeData.selectDataList = [];
                typeData.selectIdList = [];
                if (selectFactoryList.length){
                    selectFactoryList.forEach((value)=>{
                        typeData.dataList = typeData.dataList.concat(value.children);
                    })
                } else {
                    typeData.dataList = typeData.data;
                }

                typeData.dataList.forEach((value)=>{
                    if (value.isSelect_wl){
                        typeData.selectDataList.push(value);
                        typeData.selectIdList.push(value.id);
                    }
                })
            }

            let list = typeData.selectIdList;
            if (list && list.length) {
                selectIdList = selectIdList.concat(list);
            }
        }
        if (typeof (this.props.onSuccessData) === 'function') {
            return this.props.onSuccessData(selectIdList, this.allTabDataList);
        }
    }

    /** 生成弹出层下方功能视图 */
    _renderSeleteShowMenuView(item) {
        console.log("--生成弹出层功能视图--" + item);
        if (typeof (this.props.renderSeleteShowMenuView) === 'function') {
            return this.props.renderSeleteShowMenuView(item);
        } else {
            return null;
        }
    }

    /** 生成主要显示视图 */
    _renderContenView(item) {
        let { children } = this.props;
        console.log("--生成主要显示视图--" + item);
        if (typeof (this.props.renderContenView) === 'function') {
            return this.props.renderContenView(item);
        } else if (children) {
            return children;
        } else {
            return <Text style={{
                backgroundColor: commonStyle.yellow,
            }}>请实现renderContenView方法,或者在组件内创建视图</Text>
        }
    }
    /** 返回tab数据 */
    _getTabData(tabData) {
        if (tabData) {
            return tabData;
        }
        return [];
    }
    /** 处理数据，添加必要参数 */
    _dealData(data) {
        this.allTabDataList = data;
        return this.allTabDataList;
    }

    render() {
        let { seleteData, isPop } = this.state;
        let { tabData } = this.props;

        let data = this._dealData(this._getTabData(tabData));
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        top: seleteViewStyle.nativeHeight,
                        width: '100%',
                        height: (seleteViewStyle.windowHeight - seleteViewStyle.nativeHeight),
                    }}>
                    {this._renderContenView()}
                </View>

                <View style={{
                    height: isPop ? '100%' : seleteViewStyle.nativeHeight,
                    width: '100%',
                    position: "absolute",
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        backgroundColor: commonStyle.blockClear_10
                    }}>
                        <View style={{ height: seleteViewStyle.nativeHeight }} >
                            {
                                (data.length > 1) ?
                                    <FlatList
                                        style={{
                                            height: '100%',
                                        }}
                                        data={data}
                                        renderItem={this._renderTabView.bind(this)}
                                        horizontal={true}
                                        //隐藏水平
                                        showsHorizontalScrollIndicator={false}
                                        //隐藏垂直
                                        showsVerticalScrollIndicator={false}
                                    /> :
                                    ((data.length === 1) ? this._renderTabView(data[0]) : null)
                            }
                        </View>
                        {isPop ? <TouchableOpacity
                            style={{
                                height: '100%',
                            }}
                            activeOpacity={1}
                            onPress={(touch) => this._closs(touch)}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    maxHeight: '60%',
                                }}
                                activeOpacity={1}
                            >
                                {this._renderSeleteShowView(seleteData)}
                            </TouchableOpacity>
                        </TouchableOpacity> : null}
                    </View>
                </View>

            </View>
        );
    }
}
export const styles = StyleSheet.create({
    //默认 确定和重置按钮的样式
    menuText: {
        height: 50,
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        ...Platform.select({
            ios: {
                lineHeight: 50,
            },
        }),
    },
});



