//RooterNavigator
import {createAppContainer,createStackNavigator,createSwitchNavigator} from 'react-navigation';
import Home from '../pages/home/Home';
import table from '../pages/table/Table';
import TabBar from '../component/tabBar/TabBar';
import Touch from '../pages/tools/Touch';
import Com from '../pages/tools/Com';
import AsyncData from '../pages/tools/AsyncData'

const navigator = createStackNavigator({
        TabBar:{
            screen:TabBar,
        },
        Home:{
            screen:Home,
            navigationOptions: {
                // title: 'Home',
                // gesturesEnabled: false,
                // tabBarVisible: true,
            }
        },
        table:{
            screen:table,
        },
        Com:{
            screen:Com,
        },
        Touch:{
            screen:Touch,
        },
        AsyncData:{
            screen:AsyncData,
        }
        
    });

export default createAppContainer(navigator);
