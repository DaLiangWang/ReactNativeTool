import React, { Component } from 'react';
import { Text, View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from "../../../pages/home/Home";
import Table from "../../../pages/table/Table";
import NavigationLogin from '../../../router/OtherRouter';

export default class TabBar extends Component {
    state = {
        selectedTab : "home"
    }

    /**
     title：标题，不推荐使用（如果设置了这个导航栏和标签栏的title就会变成一样的）
     headerTitle：设置导航栏标题，推荐
     header：可以设置一些导航的属性，隐藏顶部导航栏设置为null
     headerBackTitle：设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
     headerTruncatedBackTitle：设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"
     headerRight：设置导航条右侧。可以是按钮或者其他视图控件
     headerLeft：设置导航条左侧。可以是按钮或者其他视图控件
     headerStyle：设置导航条的样式。背景色，宽高等
     headerTitleStyle：设置导航栏文字样式
     headerBackTitleStyle：设置导航栏‘返回’文字样式
     headerTintColor：设置导航栏颜色
     headerPressColorAndroid：安卓独有的设置颜色纹理，需要安卓版本大于5.0
     gesturesEnabled：是否支持滑动返回手势，iOS默认支持，安卓默认关闭
     * */
    static navigationOptions={
        header:null
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
                    // renderIcon={() => <Text>H</Text>}
                    // renderSelectedIcon={() => <Icon name={ 'ios-home' } size={30} color={'#4E78E7'}/>}
                    onPress={() => this.setState({ selectedTab: 'home' })}
                >
                    <Home {...this.props} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="其他"
                    selected={this.state.selectedTab === 'other'}
                    // renderIcon={() => <Text>H</Text>}
                    // renderSelectedIcon={() => <Icon name={ 'ios-home' } size={30} color={'#4E78E7'}/>}
                    onPress={() => this.setState({ selectedTab: 'other' })}
                >
                    <NavigationLogin></NavigationLogin>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="table"
                    selected={this.state.selectedTab === 'table'}
                    // renderIcon={() => <Text>M</Text>}
                    // renderSelectedIcon={() => <Icon name={ 'ios-more' } size={30} color={'#4E78E7'}/>}
                    onPress={() => this.setState({ selectedTab: 'table' })}
                >
                    <Table {...this.props} />
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}