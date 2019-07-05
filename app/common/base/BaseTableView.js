import React, { Component, PureComponent } from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import NetUtil from "../../util/NetUtil";
import Util from "../../util/Util";

/** 外部处理参数 */
const defProps = {
    /** 请求URl */
    url: null,
    /** 请求参数 */
    params: null,
    /** 外部传入数据 */
    data: null,
    /** 是否打开上下拉刷新 */
    isOpenRefreshing: true,
    /** 二次处理数据 */
    dataFrom: null,
    /** Item创建 */
    renderView: null,
    /** item分割线 */
    separatorView: null,
    /** 空白页 */
    createEmptyView: null,
    /** 头部组件的渲染 */
    renderHeaderView: null,
    /** 尾部组件的渲染 */
    renderFooterView: null,
    /** 滑动监听 */
    onScroll: null,
}
/** 内部处理参数 */
const defState = {
    /** 元数据 */
    data: [],
    /** 下拉刷新状态 */
    refreshing: false,
    /** 上啦加载状态 */
    showFoot: 'noLoading',
};

export default class BaseTableView extends PureComponent {
    constructor(props) {
        super(props);
        /** 初始化数据 */
        this.props = defProps;
        this.state = defState;
    }

    /** 视图加载完毕 */
    async componentDidMount() {
        const { url, params, data } = this.props;
        if (!data) {
            NetUtil.http(url, params, 'GET', response => {
                this.setState({
                    refreshing: false,
                    data: response.data
                });
            })
        } else {
            this.setState({
                refreshing: false,
                data: data
            });
        }

    }


    /** 二次处理数据 */
    _dataFrom(data) {
        if (typeof (this.props.dataFrom) === 'function') {
            return this.props.dataFrom(item.item);
        } else {
            return data;
        }
    }

    /** 指定ID为列表Item的Key */
    _extraUniqueKey(item, index) {
        return "index" + index + item;
    }

    /** 加载列表Item视图 */
    _renderItem(item) {
        if (typeof (this.props.renderView) === 'function') {
            return this.props.renderView(item.item);
        } else {
            return <Text>需要添加renderView方法</Text>
        }
    }

    /** 空白页 */
    _createEmpty(item) {
        if (typeof (this.props.createEmptyView) === 'function') {
            return this.props.createEmptyView();
        } else {
            return (
                <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
    }

    /** 分割线 */
    _separator(item) {
        if (typeof (this.props.separatorView) === 'function') {
            return this.props.separatorView(item.item);
        } else {
            return <View style={{ height: 1, backgroundColor: '#999999' }} />;
        }
    }

    /** 头部组件的渲染 */
    _renderHeader(item) {
        if (typeof (this.props.renderHeaderView) === 'function') {
            return this.props.renderHeaderView(item);
        } else {
            return (
                null
            )
        }
    }

    /** 尾部组件的渲染 */
    _renderFooter(item) {
        if (typeof (this.props.renderFooterView) === 'function') {
            return this.props.renderFooterView(item);
        } else {
            return (
                <FooterView
                    status={this.state.showFoot}
                    {...this.props}
                />
            )
        }
    }



    /** 下拉刷新 */
    _headerRefresh(item) {
        this._loadData();
    }
    /** 上拉加载 */
    _footReached(item) {
        if (this.state.showFoot === 'noMoreData') {
            return;
        }
        if (this.state.showFoot === 'loading') {
            return;
        }
        // console.warn(item);
        this._loadMoreData();
    }
    /** 加载数据 */
    async _loadData() {
        this.setState({ refreshing: true });
        const { url, params } = this.props;
        NetUtil.http(url, params, 'GET', response => {
            this.timer = setTimeout(() => {

                this.setState({ refreshing: false, data: response.data });

                this.timer && clearTimeout(this.timer);
            }, 1500);
        })
    }
    /** 加载更多数据 */
    async _loadMoreData() {
        this.setState({ showFoot: 'loading' });
        const { url, params } = this.props;
        NetUtil.http(url, params, 'GET', response => {
            this.timer = setTimeout(() => {

                this.setState({ showFoot: 'noLoading', data: this.state.data.concat(response.data) });

            }, 1500);
        })
    }

    /** 滑动监听*/
    _onScroll = (event) => {
        if (typeof (this.props.onScroll) === 'function') {
            return this.props.onScroll(event);
        }
    }
    /** 滑动结束监听 */
    _onScrollEndDrag = (event) => {
        const { isOpenRefreshing } = this.props

        if (Util.isIOS() && isOpenRefreshing) {
            let contentOffset = event.nativeEvent.contentOffset.y;

            let contentSizeH = event.nativeEvent.contentSize.height;
            let layoutMeasurementH = event.nativeEvent.layoutMeasurement.height;
            let targetContentOffset = contentSizeH - layoutMeasurementH;

            if ((contentOffset - targetContentOffset) > 50) {
                this._footReached();
            }
            // console.log("contentOffset滑动结束监听："+ contentOffset);
            // console.log("targetContentOffset滑动结束监听："+ targetContentOffset);
        }
    }

    render() {
        const { isOpenRefreshing } = this.props
        const { data, refreshing } = this.state;

        return (
            <View style={{ flex: 1 }}>
                {
                    <FlatList
                        //元数据
                        data={this._dataFrom(data)}
                        //额外数据
                        extraData={this.state}
                        //item标识
                        keyExtractor={this._extraUniqueKey}
                        //item显示的布局
                        renderItem={this._renderItem.bind(this)}
                        //分割线
                        ItemSeparatorComponent={this._separator.bind(this)}
                        // 空布局
                        ListEmptyComponent={this._createEmpty.bind(this)}
                        //添加头尾布局
                        ListHeaderComponent={this._renderHeader.bind(this)}
                        ListFooterComponent={isOpenRefreshing ? this._renderFooter.bind(this) : null}
                        //下拉刷新相关
                        onRefresh={isOpenRefreshing ? this._headerRefresh.bind(this) : null}
                        refreshing={isOpenRefreshing ? refreshing : isOpenRefreshing}
                        //加载更多
                        onEndReached={isOpenRefreshing ? (Util.isAndroid() ? this._footReached.bind(this) : null) : null}
                        onEndReachedThreshold={0.1}
                        //滑动监听
                        onScroll={this._onScroll}
                        onScrollEndDrag={this._onScrollEndDrag}
                    />
                }
            </View>
        );
    }
}


class FooterView extends Component {
    footReached() {
        this.props.footReached();
    };

    render() {
        const { status } = this.props;

        if (status === 'noLoading') {
            return (
                <View >
                    <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
                        上加载
                    </Text>
                </View>
            );
        } else if (status === 'loosenLoad') {
            return (
                <View>
                    <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
                        松开刷新
                    </Text>
                </View>
            );
        } else if (status === 'noMoreData') {
            return (
                <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
                    <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if (status === 'loading') {
            return (
                <View>
                    <ActivityIndicator />
                    <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
                        正在加载更多数据...
                    </Text>
                </View>
            );
        }
    }
}