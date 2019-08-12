//RooterNavigator
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
// import home from '../pages/home/home';
import table from '../pages/table/Table';
import TabBar from '../AHProject/component/tabBar/TabBar';
import Touch from '../pages/tools/Touch';
import Com from '../pages/tools/Com';
import AsyncData from '../pages/tools/AsyncData'
import FileCache from '../pages/tools/FileCache';
import Home from "../pages/home/Home";
import SelectView from "../pages/table/SelectView";

const navigator = createStackNavigator({
    TabBar: {
        screen: TabBar,
    },
    Home: {
        screen: Home,
        // navigationOptions: {
        //     // title: 'home',
        //     // gesturesEnabled: false,
        //     // tabBarVisible: true,
        // }
    },
    table: {
        screen: table,
    },
    Com: {
        screen: Com,
    },
    Touch: {
        screen: Touch,
    },
    AsyncData: {
        screen: AsyncData,
    },
    FileCache: {
        screen: FileCache,
    },
    SelectView: {
        screen: SelectView,
    },


});

export default createAppContainer(navigator);
