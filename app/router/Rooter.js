//RooterNavigator
import {createAppContainer,createStackNavigator,createSwitchNavigator} from 'react-navigation';
import Home from '../pages/Home/Home';
import Table from '../pages/Mine/table';
import TabBar from '../component/tabBar/TabBar';


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
            screen:Table,
        }
    });

export default createAppContainer(navigator);
