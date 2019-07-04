import React, {Component} from 'react';
import {Platform} from "react-native";


const serverHost = ""
const Util = {
    isAndroid(){
        return (Platform.OS === 'android');
    },
    isIOS(){
        return (Platform.OS === 'ios');
    }
}

export default Util;
