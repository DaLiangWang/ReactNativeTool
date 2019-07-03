import React, { Component } from 'react';
import { Text, View } from 'react-native';
import BaseView from '../../Base/BaseView';

export default class Mine extends BaseView {
    constructor(props) {
        super(props);
        this.navigationBar.title = "xxx";
    }

    renderContent() {
        return (
            <Text>Mine</Text>
        );
    }
}