import React, { Component } from 'react';
import { Text, View, Navigator, FlatList, TouchableOpacity, Button, Picker } from 'react-native';
import BaseView from '../../AHProject/component/base/BaseView';
import { mkdir, downloadFile } from '../../AHProject/common/fetchBlob/FetchBlob';
import commonStyle from '../../AHProject/css/commonStyle';
import BaseImage from '../../AHProject/component/view/BaseImage';

export default class FileCache extends BaseView {

    constructor(props) {
        super(props);
        this.navigationBar.title = "文件缓存";
        this.navigationBar.leftTitle = "返回";
        this.navigationBar.rightTitle = "输出";

    }
    leftAction() {
        const { navigation } = this.props;
        navigation.goBack();
    }

    async rightAction() {

    }

    clickSave(item) {
        // downloadFile(item, 'image.png', (progress) => {
        //     console.log('下载进度 = ', progress)
        // }, (path, data) => {
        //     console.log('下载成功 = ', path, data)
        // }, (e) => {
        //     console.log('下载失败 = ', e)
        // });
    }
    clickRemove(item) {

    }

    renderContent() {
        let imageUrl = 'https://raw.githubusercontent.com/DaLiangWang/ReactNativeTool/dev/testImage.jpeg';
        return (
            <View>
                <TouchableOpacity activeOpacity={1} onPress={() => this.clickSave(imageUrl)}>
                    <View style={{ backgroundColor: commonStyle.orange, height: 44 }}>
                        <Text>下载图片</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => this.clickRemove("删除")}>
                    <View style={{ backgroundColor: commonStyle.orange, height: 44 }} >
                        <Text>删除数据</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => this.clickRemove("删除")}>
                    <View style={{ backgroundColor: commonStyle.purple, height: 200, width: 200 }} >
                        <BaseImage url={imageUrl}></BaseImage>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
