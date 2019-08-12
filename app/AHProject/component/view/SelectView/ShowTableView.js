import React, { Component, PureComponent } from 'react';
import {Text, View, FlatList, ActivityIndicator, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import commonStyle from "../../../css/commonStyle";
import {seleteViewStyle, styles} from "./SeleteView";
import IconFont from "../../../../component/IconFont";

export default class ShowTableView extends Component {
    // 视图状态
    state = {
        refreshView: 1,
    }
    // 页面刷新的次数
    changeNum = 1;

    // 选中的item
    toSelectIdList = null;
    // 当前视图的KEY
    nowViewKey = null;

    render() {
        let { dataList, key, selectIdList } = this.props.data;
        if (this.nowViewKey !== key) {
            this.toSelectIdList = null;
            this.nowViewKey = null;
            this.nowViewKey = key;
        }
        let { refreshView } = this.state;

        if (!this.toSelectIdList) {
            this.toSelectIdList = selectIdList ? [...selectIdList] : [];
        }

        dataList = dataList.map((item) => {
            if (this.toSelectIdList.indexOf(item.id) === -1) {
                item.isSelect_wl = false;
            } else {
                item.isSelect_wl = true;
            }
            return item;
        })


        return <View style={{
            flex: 1,
            backgroundColor: seleteViewStyle.selectItemColor
        }}>
            <FlatList
                data={dataList}
                key={refreshView}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <ShowItemView
                        data={item}
                        selectItemData={this._selectItemData.bind(item)}
                    />
                )}
            />
            <View style={{
                backgroundColor: commonStyle.lineColor,
                width: '100%',
                height: 1,
            }} />
            <View style={{
                backgroundColor: commonStyle.white,
                width: '100%',
                height: 50,
            }}>
                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 0 }}>
                    <Text
                        style={styles.menuText}
                        onPress={() => {
                            this._onResetData(this.props.data)
                        }}>重置</Text>
                    <Text
                        style={[styles.menuText, { backgroundColor: commonStyle.red }]}
                        onPress={() => {
                            this._onSuccessData(this.props.data)
                        }}>确定</Text>
                </View>
            </View>
        </View>
    }
    _selectItemData = (item) => {
        if (item.isSelect_wl) {
            this.toSelectIdList.push(item.id);
        } else {
            if (this.toSelectIdList.indexOf(item.id) !== -1) {
                this.toSelectIdList.splice(this.toSelectIdList.indexOf(item.id), 1)
            }
        }
        console.log(this.toSelectIdList);
    }
    _onResetData(data) {
        this.toSelectIdList = [];
        this.setState({
            refreshView: this.changeNum++
        })
    }
    _onSuccessData(data) {
        let selectDataList = [];
        let selectIdList = [];
        data.dataList.forEach(element => {
            if (this.toSelectIdList.indexOf(element.id) !== -1) {
                selectDataList.push(element);
                selectIdList.push(element.id)
            }
        });
        data.selectDataList = selectDataList;
        data.selectIdList = selectIdList;
        if (typeof (this.props.onSuccessData) === 'function') {
            this.props.onSuccessData(data);
        }
    }
}
class ShowItemView extends Component {
    state = {
        isSelect_wl: false,
    }
    render() {
        const { data } = this.props;
        this.state.isSelect_wl = data.isSelect_wl;
        const { isSelect_wl } = this.state;

        return <TouchableOpacity
            style={{
                width: '50%',
                height: 30,
            }}
            activeOpacity={1}
            onPress={() => {
                this._selectItemData(data)
            }}>
            <View style={styles_tab.itemShowView}>
                {isSelect_wl ? <IconFont font='&#xe6df;' style={styles_tab.itemShowImage} /> : <IconFont font='&#xe6d3;' style={styles_tab.itemShowImage} />}
                <Text style={styles_tab.itemShowText}>{data.showName}</Text>
            </View>

        </TouchableOpacity>;
    }
    _selectItemData(item) {
        item.isSelect_wl = !item.isSelect_wl;
        this.setState({
            isSelect_wl: item.isSelect_wl,
        })
        if (typeof (this.props.selectItemData) === 'function') {
            this.props.selectItemData(item);
        }
    }
}

export const styles_tab = StyleSheet.create({
    itemShowView: {
        marginLeft: '1%',
        marginTop: 1,
        marginBottom: 1,
        width: '99%',
        height: 29,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderColor: commonStyle.borderColor,
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: commonStyle.white,
    },
    //显示箭头样式
    itemShowImage: {
        height: 28,
        fontSize: 14,
        marginLeft: '10%',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        ...Platform.select({
            ios: {
                lineHeight: 28,
            },
        }),
    },
    itemShowText: {
        height: 28,
        fontSize: 12,
        left: 5,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        ...Platform.select({
            ios: {
                lineHeight: 28,
            },
        }),
    },

});