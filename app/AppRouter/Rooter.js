//RooterNavigator
import {createAppContainer,createStackNavigator,createSwitchNavigator} from 'react-navigation';
import Home from '../Main/Home/Home';
import Mine from '../Main/Mine/Mine';
import Tabbor from '../TabBar/Tabbor';


const navigator = createStackNavigator({
        Tabbor:{
            screen:Tabbor,
        },
        Home:{
            screen:Home,
            navigationOptions: {
                title: 'Home',
                // gesturesEnabled: false,
                // tabBarVisible: true,
            }
        },
        Mine:{
            screen:Mine,
        }
    });

export default createAppContainer(navigator);
