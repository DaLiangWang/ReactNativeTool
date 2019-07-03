//RooterNavigator
import {createAppContainer,createStackNavigator,createSwitchNavigator} from 'react-navigation';
import OtherOne from '../pages/Other/OtherOne';
import OtherTwo from "../pages/Other/OtherTwo";


const navigatorss = createStackNavigator({
    OtherOne:{
        screen:OtherOne,
    },
    OtherTwo:{
        screen:OtherTwo,
    },
});

export default createAppContainer(navigatorss);
