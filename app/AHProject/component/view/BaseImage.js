import React, { Component } from 'react';
import { Text, StyleSheet, Image, alert } from 'react-native';
import PropTypes from 'prop-types';
import { downloadFile, downloadFileS } from '../../common/fetchBlob/FetchBlob';

export default class BaseImage extends Component {
    props = {
        url: null,
    }
    state = {
        loadProgress: 0,
        loadType: PropTypes.oneOf(['android', 'default', 'loading', 'success', 'netError', 'timeOut']),
        loadPath: null,
    }
    constructor(props) {
        super(props);
        console.log(this);
        // Util.isIOS() ? null : this.state.loadType = 'android';
    }

    /** 视图加载完毕 */
    async componentDidMount() {
        console.log(this.state.loadType);
        // Util.isIOS() ? this.loadData(this.props.url) : null;
        this.loadData(this.props.url)
    }
    loadData(url) {
        this.setState({
            loadProgress: 0,
            loadType: 'loading',
        });

        downloadFile(url, 'testImage.jpeg', (progress) => {
            this.setState({
                loadProgress: progress,
                loadType: 'loading',
            });
        }, (path, data) => {

            let promise = CameraRoll.saveToCameraRoll(path);
            promise.then(function (result) {
                alert("已保存到系统相册")
            }).catch(function (error) {
                alert('保存失败！\n' + error);
            });

            this.setState({
                loadPath: path,
                loadType: 'success',
            });
        }, (e) => {
            this.setState({
                loadType: 'netError',
            });
        });
    }

    render() {
        const { loadType, loadPath, loadProgress } = this.state;
        const { url } = this.props;

        switch (loadType) {
            case 'default':
                return (
                    <Text> default </Text>
                );
            case 'noLoad':
                return (
                    <Text> noLoad </Text>
                );
            case 'loading':
                return (
                    <Text> loading </Text>
                );
            case 'success':
            case 'android':
                return (
                    <Image
                        source={{ url: loadPath }}
                        resizeMode={'contain'}
                        style={{ width: 200, height: 200 }}
                    />
                );
            case 'netError':
            case 'timeOut':
            default:
                return (
                    <Text>失败</Text>
                );
        }

    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
});