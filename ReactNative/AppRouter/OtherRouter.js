//RooterNavigator
import {createAppContainer,createStackNavigator,createSwitchNavigator} from 'react-navigation';
import OtherOne from '../Main/OtherOne';
import OtherTwo from "../Main/OtherTwo";


const navigatorss = createStackNavigator({
    OtherOne:{
        screen:OtherOne,
    },
    OtherTwo:{
        screen:OtherTwo,
    },
});

export default createAppContainer(navigatorss);
