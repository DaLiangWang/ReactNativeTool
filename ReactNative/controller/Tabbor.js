import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import Home from "../view/Home";
import Mine from "../view/Mine";
// import Icon from 'react-native-vector-icons/Ionicons';

import { Text, View } from 'react-native';

export default class Tabbor extends Component {
    state = {
        selectedTab : "home"
    }
    constructor(props) {
        super(props);
        this.state = {selectedTab: "home"}
    }

    render() {
        return (
            <TabNavigator tabBarStyle={{ backgroundColor:'white' }} style={{backgroundColor: 'white'}}>
                <TabNavigator.Item
                    title="主页"
                    selected={this.state.selectedTab === 'home'}
                    // renderIcon={() => <Icon name={ 'ios-home' } size={30} color={'gray'}/>}
                    // renderSelectedIcon={() => <Icon name={ 'ios-home' } size={30} color={'#4E78E7'}/>}
                    // onPress={() => this.setState({ selectedTab: 'home' })}
                >
                    <Home {...this.props} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="其他"
                    selected={this.state.selectedTab === 'other'}
                    // renderIcon={() => <Icon name={ 'ios-more' } size={30} color={'gray'}/>}
                    // renderSelectedIcon={() => <Icon name={ 'ios-more' } size={30} color={'#4E78E7'}/>}
                    // onPress={() => this.setState({ selectedTab: 'other' })}
                >
                    <Mine {...this.props} />
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}