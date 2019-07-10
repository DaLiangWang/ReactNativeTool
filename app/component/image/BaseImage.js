import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import NavigationBar from '../tabBar/NavigationBar'
import PropTypes from 'prop-types';
import { downloadFile, downloadFileS } from '../../common/fetchBlob/FetchBlob';
import Util from '../../util/Util';

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
        Util.isIOS() ? null : this.state.loadType = 'android';
    }

    /** 视图加载完毕 */
    async componentDidMount() {
        console.log(this.state.loadType);
        Util.isIOS() ? this.loadData(this.props.url) : null;
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

        // let icon =  require(loadPath); 

        // const orderImage = Image.resolveAssetSource(require(loadPath));
        // console.info(orderImage);

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
                    Util.isIOS() ?
                        <Image
                            source={{ url: loadPath }}
                            resizeMode={'contain'}
                            style={{ width: 200, height: 200 }}
                        />
                        :
                        <Image
                            source={{ url: url }}
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