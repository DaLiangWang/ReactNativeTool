//RooterNavigator
import {createAppContainer,createStackNavigator,createSwitchNavigator} from 'react-navigation';
import OtherOne from '../pages/other/OtherOne';
import OtherTwo from "../pages/other/OtherTwo";


const navigatorss = createStackNavigator({
    OtherOne:{
        screen:OtherOne,
    },
    OtherTwo:{
        screen:OtherTwo,
    },
});

export default createAppContainer(navigatorss);
