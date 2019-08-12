//LoginScreen.js
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import BaseView from '../../AHProject/component/base/BaseView';
import * as commonStyle from "../../AHProject/css/commonStyle";
import {seleteViewStyle} from "../../AHProject/component/view/SelectView/SeleteView";
import SeleteView from "../../AHProject/component/view/SelectView/SeleteView";

export default class SelectView extends BaseView{
    newDropDown = [];
    constructor(props) {
        super(props);
        this.navigationBar.title = "筛选框";
        this.navigationBar.leftTitle = "返回";
        this.navigationBar.rightTitle = "OtherTwo";
    }

    leftAction(){
        const { navigation } = this.props;
        navigation.goBack();
    }

    rightAction(){
        const { navigation } = this.props;
        navigation.navigate('OtherTwo');
    }

    renderContent() {
        const dropDown = selectData;
        if (!this.newDropDown || !this.newDropDown.length) {
            let newDropDownCopy = JSON.parse(JSON.stringify(dropDown));

            this.newDropDown = newDropDownCopy.map((item, index) => {
                item.dataList = item.data;
                //设置选中状态
                item.isSelect_wl = false;
                //设置key
                item.key_wl = "wl_" + index;
                //设置选中状态
                item.selectDataList = [];
                //设置选中状态
                item.selectIdList = [];
                //判断是否为自定义组件
                if (item.key === "section") {
                    item.custom_wl = true;
                }
                return item;
            });
        }

        return (
            <View>
                <SeleteView
                    tabData={this.newDropDown}
                    renderTabView={this.renderTabView.bind(this)}
                    onSuccessData={this._onSuccessData.bind(this)}
                    multiSelect
                >
                    <div>ssss</div>
                </SeleteView>
            </View>
        );
    }



    // /** 生成TAB视图 */
    renderTabView(item) {
        if (item.key === "section") {
            return <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 200,
                backgroundColor: '#fff',

            }}>
                <View style={styles_tab.tabTextFatherInput}>
                    <TextInput
                        style={styles_tab.tabTextInput}
                        placeholder="搜索产线"
                        autoCapitalize='none'
                        autoComplete='off'
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        clearButtonMode
                        onChangeText={(text) => this.searchText = text}
                    />
                </View>

                <Text style={styles_tab.tabSeachButton}
                      onPress={() => {
                          this._onSearchText(this.searchText);
                      }}>搜索</Text>
            </View>
        } else {
            // return null;
            let shouTitle = null;
            if (item.selectDataList && item.selectDataList.length) {
                let titleList = [];
                for (let i = 0; i < item.selectDataList.length; i++) {
                    titleList.push(item.selectDataList[i].showName);
                }
                shouTitle = titleList.join(',');
            }
            return shouTitle ? <Text
                    style={[styles_tab.tabShowText, { width: 80, left: 10 }]}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}>{shouTitle}</Text>
                :
                <Text style={styles_tab.tabShowText}>
                    {item.showName + " "}
                    {item.isSelect_wl ? <IconFont font='&#xe601;' style={styles_tab.tabShowImage} /> : <IconFont font='&#xe600;' style={styles_tab.tabShowImage} />}
                </Text>
        }

    }
    _onSearchText(text) {
        console.log(text);
        this.setState({
            searchText: text,
        })
    }
    _onSuccessData(selectIdList, allTabDataList) {
        console.log(selectIdList);
        console.log(allTabDataList);
    }
}



export const styles_tab = StyleSheet.create({
    //tab按钮文本样式
    tabShowText: {
        height: seleteViewStyle.nativeHeight,
        flex: 1,
        fontSize: 12,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        ...Platform.select({
            ios: {
                lineHeight: seleteViewStyle.nativeHeight,
            },
        }),
    },
    //显示箭头样式
    tabShowImage: {
        fontSize: 9,
        color: '#000',
    },
    //搜多框父级样式
    tabTextFatherInput: {
        top: 2,
        marginBottom: 4,
        width: 130,
        left: 5,
        borderColor: commonStyle.borderColor,
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: commonStyle.white,
    },
    //搜多框样式
    tabTextInput: {
        padding: 0,
        flex: 1,
        fontSize: 14,
        left: 5,
    },
    //搜索按钮样式
    tabSeachButton: {
        // backgroundColor: 'blue',
        width: 50,
        right: 10,
        height: seleteViewStyle.nativeHeight,
        fontSize: 14,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        ...Platform.select({
            ios: {
                lineHeight: seleteViewStyle.nativeHeight,
            },
        }),
    },
});
