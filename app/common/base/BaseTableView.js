import React, { Component } from 'react';
import { Text, View,FlatList ,TouchableOpacity } from 'react-native';

export default class BaseTableView extends Component {
    state = {
        selected: '',
        refreshing:false
    };
    constructor(props) {
        super(props);
        console.log(this);
    }


    _keyExtractor = (item, index) => item.id;


    _onPressItem = (id) => {
        this.setState({ selected: id });
    };


    _renderItem = ({item}) => (
        this.props.renderView(item)
    );

    _onRefresh = () => {
        this.setState({ refreshing: true });

        this.timer = setTimeout(() => {
            this.setState({ refreshing: false });
            this.timer && clearTimeout(this.timer);
        }, 1500);
    }


    render() {
        const {dataFrom} = this.props;
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={dataFrom}
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