//RooterNavigator
import {createAppContainer,createStackNavigator,createSwitchNavigator} from 'react-navigation';
import OtherOne from '../Main/Other/OtherOne';
import OtherTwo from "../Main/Other/OtherTwo";


const navigatorss = createStackNavigator({
    OtherOne:{
        screen:OtherOne,
    },
    OtherTwo:{
        screen:OtherTwo,
    },
});

export default createAppContainer(navigatorss);
