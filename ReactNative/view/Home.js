import React, { Component } from 'react';
import { Text, View } from 'react-native';
import BaseView from '../base/BaseView';

export default class Home extends BaseView {
    renderContent() {
        return (
            <Text>Home</Text>
        );
    }
}