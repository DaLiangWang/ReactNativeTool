//RooterNavigator
import {createAppContainer,createStackNavigator,createSwitchNavigator} from 'react-navigation';
import Home from '../pages/Home/Home';
import Mine from '../pages/Mine/Mine';
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
        Mine:{
            screen:Mine,
        }
    });

export default createAppContainer(navigator);
