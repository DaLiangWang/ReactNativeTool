import React, { Component } from 'react';
import { Text, View, Navigator, FlatList, TouchableOpacity, Button, Picker } from 'react-native';
import BaseView from '../../component/base/BaseView';
import { mkdir, downloadFile } from '../../common/fetchBlob/FetchBlob';
import commonStyle from '../../css/commonStyle';
import BaseImage from '../../component/image/BaseImage';

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
        downloadFile(item, 'image.png', (progress) => {
            console.log('下载进度 = ', progress)
        }, (path, data) => {
            console.log('下载成功 = ', path, data)
        }, (e) => {
            console.log('下载失败 = ', e)
        });
    }
    clickRemove(item) {

    }

    renderContent() {
        let imageUrl = 'http://image.baidu.com/search/down?tn=download&ipn=dwnl&word=download&ie=utf8&fr=result&url=http%3A%2F%2Fpic37.nipic.com%2F20140113%2F8800276_184927469000_2.png&thumburl=http%3A%2F%2Fimg5.imgtn.bdimg.com%2Fit%2Fu%3D3300305952%2C1328708913%26fm%3D26%26gp%3D0.jpg';
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
                    <View style={{ backgroundColor: commonStyle.purple, height: 88 }} >
                        <BaseImage url={imageUrl}></BaseImage>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
