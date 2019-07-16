import React from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, StyleSheet, Modal } from 'react-native';

export default class ShowView extends React.PureComponent {
    state = { isPop: false };

    show() {
        this.setState({ isPop: true });
    }
    closs() {
        this.setState({ isPop: false });
    }
    _onShow(sender) {
        console.log(sender);
    }
    _onRequestClose(sender) {
        console.log(sender);
    }
    // _onDismiss(sender) {
    //     console.log(sender);
    // }

    // 返回内容视图
    renderContent() {
        return (
            <View
                onPress={() => this.closs()}
                style={styles.mask}
            >
                <Text
                    style={{ color: 'red', fontSize: 18, width: 300 }}>
                    我是modal出来的视图
                        </Text>
                <Text
                    onPress={() => this.closs()}
                    style={{ color: 'red', fontSize: 18, marginTop: 100 }}>
                    点我取消
                        </Text>
            </View>
        );
    }


    render() {
        return (
            <Modal
                animationType="fade"
                visible={this.state.isPop}
                transparent={true}
                onShow={this._onShow.bind(this)}
                presentationStyle="overFullScreen"
                onRequestClose={this._onRequestClose.bind(this)}
            >
                {this.renderContent()}
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    mask: {
        justifyContent: "center",
        backgroundColor: "#00000021",
        alignItems: "center",
        flex: 1
    },
});