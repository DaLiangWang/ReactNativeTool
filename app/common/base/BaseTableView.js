import React, { Component,PureComponent } from 'react';
import {Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert, Platform} from 'react-native';
import NetUtil from "../../util/NetUtil";
import Util from "../../util/Util";


export default class BaseTableView extends PureComponent {
    state = {
        data: [],
        refreshing:false,
        showFoot: 'noLoading',
    };
    constructor(props) {
        super(props);
        console.log(this);
    }

    //视图加载完毕
    async componentDidMount(){
        const {url,params} = this.props;
        NetUtil.http(url,params,'GET',response => {
            this.setState({
                refreshing: false,
                data:response.data
            });
        })
    }

    //二次处理数据
    dataFrom(data){
        return data;
    }
    //指定ID为列表Item的Key
    _extraUniqueKey(item, index) {
        return "index" + index + item;
    }
    //点击Item回掉
    _onPressItem = (id) => {
        Alert.alert("你点击了按钮！" + id);
    };

    //加载列表Item视图
    _renderItem = ({item}) => (
        this.props.renderView(item)
    );




    //下拉刷新
    _headerRefresh(item){
        // console.warn(item);
        this.loadData();
    }
    //上拉加载
    _footReached(item){
        if (this.state.showFoot === 'noMoreData') {
            return;
        }
        if (this.state.showFoot === 'loading') {
            return;
        }
        // console.warn(item);
        this.loadMoreData();
    }

    //加载数据
    async loadData(){
        this.setState({refreshing: true});
        const {url,params} = this.props;
        NetUtil.http(url,params,'GET',response => {
            this.timer = setTimeout(() => {

                this.setState({refreshing: false, data:response.data});

                this.timer && clearTimeout(this.timer);
            }, 1500);
        })
    }
    /** 加载更多数据 */
    async loadMoreData(){
        this.setState({showFoot:'loading'});
        const {url,params} = this.props;
        NetUtil.http(url,params,'GET',response => {
            this.timer = setTimeout(() => {

                this.setState({showFoot: 'noLoading', data:this.state.data.concat(response.data)});

            }, 1500);
        })
    }

    /** 尾部组件的渲染 */
    _renderFooter(){
        if(this.state.showFoot === 'noLoading'){
            return (
                <View >
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}} onPress={this._footReached.bind(this)}>
                        上拉或点击加载
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 'loosenLoad'){
            return (
                <View>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        松开刷新
                    </Text>
                </View>
            );
        } else if (this.state.showFoot === 'noMoreData') {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 'loading') {
            return (
                <View>
                    <ActivityIndicator />
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        正在加载更多数据...
                    </Text>
                </View>
            );
        }
    }
    /** 空布局 */
    _createEmptyView() {
        return (
            <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>
                    暂无列表数据
                </Text>
            </View>
        );
    }
    /** 分割线 */
    _separator() {
        return <View style={{height: 1, backgroundColor: '#999999'}}/>;
    }
    /** 滑动监听*/
    _onScroll = (event) => {
        // let contentSizeH = event.nativeEvent.contentSize.height;
        // let layoutMeasurementH = event.nativeEvent.layoutMeasurement.height;
        // let h = contentSizeH - layoutMeasurementH;
        //
        // let contentOffsetY = event.nativeEvent.contentOffset.y;
        //
        // if ((contentOffsetY - h) > 50){
        //     this.setState({showFoot:'loosenLoad'});
        // } else {
        //     if(this.state.showFoot !== 'loading') {
        //         this.setState({showFoot: 'noLoading'});
        //     }
        // }
        // console.log("contentOffset滑动结束监听："+ contentOffsetY);
        // console.log("targetContentOffset滑动结束监听："+ h);
    }
    /** 滑动结束监听 */
    _onScrollEndDrag = (event) => {
        if (Util.isIOS()){
            let contentOffset = event.nativeEvent.contentOffset.y;

            let contentSizeH = event.nativeEvent.contentSize.height;
            let layoutMeasurementH = event.nativeEvent.layoutMeasurement.height;
            let targetContentOffset = contentSizeH - layoutMeasurementH;

            if ((contentOffset - targetContentOffset) > 50){
                this._footReached();
            }
            console.log("contentOffset滑动结束监听："+ contentOffset);
            console.log("targetContentOffset滑动结束监听："+ targetContentOffset);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    <FlatList
                        //元数据
                        data={this.dataFrom(this.state.data)}
                        //额外数据
                        extraData={this.state}
                        //item标识
                        keyExtractor={this._extraUniqueKey}
                        //item显示的布局
                        renderItem={this._renderItem}
                        // 空布局
                        ListEmptyComponent={this._createEmptyView}
                        //添加头尾布局
                        // ListHeaderComponent={this._createListHeader}
                        ListFooterComponent={this._renderFooter()}

                        //下拉刷新相关
                        onRefresh={this._headerRefresh.bind(this)}
                        // onRefresh={() => this._onRefresh()}
                        //refreshControl={}
                        refreshing={this.state.refreshing}
                        //加载更多
                        onEndReached={Util.isAndroid()?this._footReached.bind(this):null}
                        onEndReachedThreshold={0.1}
                        //分割线
                        ItemSeparatorComponent={this._separator}
                        //滑动监听
                        onScroll={this._onScroll}
                        onScrollEndDrag={this._onScrollEndDrag}
                    />
                }
            </View>
        );
    }
}