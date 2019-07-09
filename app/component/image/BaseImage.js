import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import NavigationBar from '../tabBar/NavigationBar'
import PropTypes from 'prop-types';
import { downloadFile } from '../../common/fetchBlob/FetchBlob';


export default class BaseImage extends Component {
    props = {
        url: null,
    }
    state = {
        loadProgress: 0,
        loadType: PropTypes.oneOf(['default', 'loading', 'success', 'netError', 'timeOut']),
        loadPath: null,
    }
    constructor(props) {
        super(props);
        console.log(this);
        this.state.loadType = 'default';
    }

    /** 视图加载完毕 */
    async componentDidMount() {
        console.log(this.state.loadType);
        this.loadData(this.props.url);
    }
    loadData(url) {
        downloadFile(url, 'image.png', (progress) => {
            this.setState({
                loadProgress: progress,
                loadType: 'loading',
            });
            console.log('下载进度 = ', progress)
        }, (path, data) => {
            this.setState({
                loadPath: path,
                loadType: 'success',
            });
            console.log('下载成功 = ', path, data)
        }, (e) => {
            this.setState({
                loadType: 'netError',
            });
            console.log('下载失败 = ', e)
        });
    }

    render() {
        const { loadType, loadPath, loadProgress } = this.state;
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
                return (
                    <Image source={{ url: loadPath }} style={{width: 100, height: 100}}/>
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