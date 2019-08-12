import React, { Component, PureComponent } from 'react';
import { TouchableOpacity} from 'react-native';
import {seleteViewStyle} from "./SeleteView";

export default class ItemView extends Component{
    state = {
        isSelect_wl: false,
    }
    render() {
        let { children,dataCount,data } = this.props;
        this.state.isSelect_wl = data.isSelect_wl;

        let ViewStyle = {
            backgroundColor: this.state.isSelect_wl ? seleteViewStyle.selectItemColor : seleteViewStyle.notSelectItemColor,
            height: seleteViewStyle.nativeHeight,
            minWidth: seleteViewStyle.nativeItemMinWidth,
            marginLeft: seleteViewStyle.nativeItemSpacing,
            marginRight: seleteViewStyle.nativeItemSpacing
        };
        if (dataCount === 1) {
            ViewStyle = {
                flex: 1,
                backgroundColor: this.state.isSelect_wl ? seleteViewStyle.selectItemColor : seleteViewStyle.notSelectItemColor,
                height: seleteViewStyle.nativeHeight,
                width: seleteViewStyle.nativeItemOneWidth,
            };
        }
        if (dataCount === 2) {
            ViewStyle = {
                backgroundColor: this.state.isSelect_wl ? seleteViewStyle.selectItemColor : seleteViewStyle.notSelectItemColor,
                height: seleteViewStyle.nativeHeight,
                width: seleteViewStyle.nativeItemTwoWidth,
            };
        }
        return <TouchableOpacity style={ViewStyle}  activeOpacity={1} onPress={() => this._clickItem(data)}>
            {children}
        </TouchableOpacity>
    }
    _clickItem(item) {
        item.isSelect_wl = !item.isSelect_wl;
        this.setState({
            isSelect_wl: item.isSelect_wl,
        })
        if (typeof (this.props.clickItem) === 'function') {
            this.props.clickItem(item);
        }
    }
}


