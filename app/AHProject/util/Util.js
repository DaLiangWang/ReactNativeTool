import React, {Component} from 'react';
import {Dimensions, Platform} from "react-native";
var {height,width} =  Dimensions.get('window');


const Util = {
    isAndroid(){
        return (Platform.OS === 'android');
    },
    isIOS(){
        return (Platform.OS === 'ios');
    },
    MAIN_WIDTH(){
        return width;
    },
    MAIN_HEIGHT(){
        return height;
    }
}

/**
 * 遍历树形结构，返回callback结果的组合
 * @param data 树形结构数据
 * @param callback 回调 参数（子节点返回集合, 当前节点, 父节点, 同级节点位置, 层级0开始, 同层级数据数组）
 * @param field 子数据在对象中的名称 默认 children
 * @param parent 父节点 递归用 直接调用不用传
 * @param level 层级 递归用 直接调用不用传
 * @returns {Array} 返回组装好的数组
 */
export function treeMap(data, callback, field = 'children', parent, level = 0){
    let result = [];
    for(let i = 0; i < data.length; i++){
        let node = data[i],
            childResults = [];
        // 先执行子节点，获取子节点处理返回的集合
        if (node[field] && node[field].length) {
            childResults = treeMap(node[field], callback, field, node, level+1);
        }
        // 将子节点返回的集合组装
        result.push(callback.call(node, childResults, node, parent, i, level, data));
    }
    return result;
}

export default Util;
