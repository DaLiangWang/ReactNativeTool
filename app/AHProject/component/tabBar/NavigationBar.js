import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';
import commonStyle from "../../css/commonStyle";

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        
        // leftTitle和leftImage 优先判断leftTitle (即 文本按钮和图片按钮优先显示文本按钮)
        const { title, leftTitle, leftImage, leftAction, rightTitle, rightImage, rightAction } = this.props;
        return (
            <View style={[styles.barView, this.props.style]}>
                <View style={ styles.showView }>
                    {
                        leftTitle
                            ?
                            <TouchableOpacity style={styles.leftNav} onPress={ ()=>{leftAction()} }>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.barLeftButton}>{leftTitle}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            (
                                leftImage
                                    ?
                                    <TouchableOpacity style={styles.leftNav} onPress={ ()=>{leftAction()} }>
                                        <View style={{alignItems: 'center'}}>
                                            <Image source={ leftImage }/>
                                        </View>
                                    </TouchableOpacity>
                                    : null
                            )
                    }
                    {
                        title ?
                            <Text style={styles.title}>{title || ''}</Text>
                            : null
                    }
                    {
                        rightTitle ?
                            <TouchableOpacity style={styles.rightNav} onPress={ ()=>{rightAction()} }>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.barRightButton}>{rightTitle}</Text>
                                </View>
                            </TouchableOpacity>
                            : (rightImage ?
                                <TouchableOpacity style={styles.rightNav} onPress={ ()=>{rightAction()} }>
                                    <View style={{alignItems: 'center'}}>
                                        <Image source={ rightImage }/>
                                    </View>
                                </TouchableOpacity>
                                : null
                            )
                    }

                </View>
                <View style={styles.lineView}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lineView: {
        height: 0.5,
        backgroundColor: commonStyle.navLineColor,
    },
    barView: {
        height: Platform.OS === 'android' ? 44 : 64,
        backgroundColor: commonStyle.navThemeColor,
    },
    showView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: Platform.OS === 'android' ? 0 : 20,
        height: 44,
    },
    title: {
        color: commonStyle.navTitleColor,
        fontSize: 18.0,
    },
    leftNav: {
        position: 'absolute',
        top: 8,
        bottom: 8,
        left: 8,
        justifyContent: 'center',
    },
    rightNav: {
        position: 'absolute',
        right: 8,
        top: 8,
        bottom: 8,
        justifyContent: 'center',
    },
    barLeftButton: {
        color: commonStyle.navLeftTitleColor,
        fontSize: 18
    },
    barRightButton: {
        color: commonStyle.navRightTitleColor,
        fontSize: 18
    },
})



export default NavigationBar