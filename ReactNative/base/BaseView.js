import React, { Component } from 'react';
import { Text, View } from 'react-native';
import NavigationBar from '../TabBar/NavigationBar'

export default class BaseView extends Component {
    state = {
        title : null,
        leftTitle: null,
        leftImage: null,
        rightTitle: null,
        rightImage: null,
    }

    static navigationOptions={
        header:null
    }
    // constructor(props) {
    //     super(props);
    // }


    leftAction(){
        navigator.pop();
        console.log('leftAction');
    }
    rightAction(){
        console.log('rightAction');
    }


    renderHeader() {
        return (
            <NavigationBar leftAction={this.leftAction.bind(this)} rightAction={this.rightAction.bind(this)} {...this.state}/>
        );
    }
    renderContent() {
        return null;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.renderHeader()}
                <View style={{flex: 1, backgroundColor: 'skyblue'}}>
                    {this.renderContent()}
                </View>
            </View>
        );
    }
}