import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import NavigationBar from '../tabBar/NavigationBar'
import AlertSelected from '../../util/AlertSelected';
import ShowView from '../../util/ShowView';

export default class BaseView extends Component {
    navigationBar = {
        title: null,
        leftTitle: null,
        leftImage: null,
        rightTitle: null,
        rightImage: null,
    }
    /**
     * 是否开启组件
     * NavigationBarHide：是否显示导航栏，默认开启
     * HideAll：默认true 关闭所有组件
     * AlertHide：alert选择框组件，默认关闭
     */
    comHide = {
        NavigationBarHide: true,
        HideAll: true,
        AlertHide: false,
        ShowViewHide: false,
    }

    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.AlertData = null;
        this.ShowView = null;
    }

    leftAction() {
        const { navigation } = this.props;
        navigation.goBack();
        console.log('leftAction');
    }

    rightAction() {
        console.log('rightAction');
    }

    // 返回头部视图
    renderHeader() {
        const { NavigationBarHide } = this.comHide;
        return (
            NavigationBarHide ? <NavigationBar leftAction={this.leftAction.bind(this)} rightAction={this.rightAction.bind(this)} {...this.navigationBar} /> : null
        );
    }
    // 返回内容视图
    renderContent() {
        return (
            <View style={styles.container}>
                {this.renderContent()}
            </View>
        );
    }
    // 返回公用组件
    renderCom() {
        const { HideAll, AlertHide, ShowViewHide } = this.comHide;
        if (HideAll) {
            return null;
        }
        return (
            <View>
                {AlertHide ? <AlertSelected ref={(dialog) => {
                    this.AlertData = dialog;
                }} /> : null}
                {ShowViewHide ? <ShowView ref="ShowView" /> : null}
            </View>

        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderHeader()}
                {this.renderContent()}
                {this.renderCom()}
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
});