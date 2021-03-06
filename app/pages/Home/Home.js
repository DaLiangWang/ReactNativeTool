import React, { Component } from 'react';
import { Text, View,Navigator,FlatList ,TouchableOpacity} from 'react-native';
import BaseView from '../../common/base/BaseView';

export default class Home extends BaseView {
    state = {
        selected: '',
        refreshing:false
    };

    dataFrom = {
        data:[
            {
                id:"1",
                title:"11111",
            },
            {
                id:"2",
                title:"2",
            },
            {
                id:"3",
                title:"3",
            },
        ]
    }

    constructor(props) {
        super(props);
        this.navigationBar.title = "首页";
        this.navigationBar.leftTitle = "取消加载";
        this.navigationBar.rightTitle = "开始加载";
    }

    leftAction(){
        this.setState({refreshing: false});
    }
    rightAction(){
        this.setState({refreshing: true});
    }



    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
        this.setState({selected:id});
    };

    _renderItem = ({item}) => (
        <MyListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={this.state.selected}
            title={item.title}
        />
    );

    _onRefresh = () => {
        this.setState({refreshing: true});

        this.timer = setTimeout(() => {
            this.setState({refreshing: false});
            this.timer && clearTimeout(this.timer);
        }, 1500);
    }

    renderContent() {
        const {data} = this.dataFrom;
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.refreshing}
                />
            </View>
        );
    }
}

class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const textColor = (this.props.selected === this.props.id) ? "red" : "yellow";
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View>
                    <Text style={{ color: 'black', backgroundColor: textColor}}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}