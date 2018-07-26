import React, { Component } from 'react';
import { View,Image,Text,BackAndroid,BackHandler,Animated,StyleSheet,Dimensions,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
const {width,height} = Dimensions.get('window');
const LJAlertBackViewWidth = width - 30;
const LJBackHandler = BackHandler || BackAndroid;
const LJ_BACK_EVENT = 'hardwareBackPress';

export default class LJAlert extends Component {
    
    
    /**
     *  type: simple  confirm  默认 simple
     *  title : simple 和  confirm 模式下 的标题
     *  content : simple模式下展示的内容,confirm下不需要
     *  sureBtnTitle simple模式下的按钮标题
     *  confirmBtnOnpress: 两种模式下的确认按钮
     *  closeBtnOnpress: 两种模式下关闭按钮
     *  backActionHandler: 安卓的返回按钮事件
     *  btnTitles: comfirm模式下的按钮标题
     * @static
     * @memberof LJAlert
     */
    static defaultProps = {
        
        title: PropTypes.string,
        content: PropTypes.string,
        sureBtnTitle: PropTypes.string,
        confirmBtnOnpress: PropTypes.func,
        closeBtnOnpress: PropTypes.func,
        type: PropTypes.string,
        backActionHandler: PropTypes.func,
        btnTitles: PropTypes.array,
    }
    constructor(props) {
        super(props);
        const {show} = this.props;
        this.springValue = new Animated.Value(0.3);
        this.state = {
            showSelf:false
        }
        if(show) this._animateShowAction(true);
    }

    changeShowState(show: Boolean) {
        this.setState({
            showSelf:show
        })
    }

    _animateShowAction(show: Boolean) {
        
        Animated.spring(
            this.springValue,
            {
                toValue: 1,
                bounciness:10,
                useNativeDriver: true,
            }
        ).start();
        
        setTimeout(() => {
            this.changeShowState(show);
          });
    }
    _animateHideAction(show:Boolean) {  
        Animated.spring(
            this.springValue,
            {
                toValue: 0,
                tension:10,
                useNativeDriver: true,
            }
        ).start();
    }
    _closedBtnOnpress() {
        this._animateHideAction(false)
        this.changeShowState(false);
        this.props.closeBtnOnpress();
    }

    _confirmBtnOnPress() {
        this._animateHideAction(false)
        this.changeShowState(false);
        this.props.confirmBtnOnpress();
    }

    _renderAlertView() {
        if (this.props.type === 'simple') {
            return this._renderAlertSimple();
        }else if (this.props.type === 'confirm') {
            return this._renderAlertConfirm();
        }
        return null
    }

    _renderAlertSimple() {
        const {title,content,sureBtnTitle} = this.props
        const animation = {transform:[{scale:this.springValue}]};
        return(
            <View style={styles.container}>
                <Animated.View style={[styles.alertBackView,animation]}>
                    <TouchableOpacity style={{width:"100%"}} onPress={this._closedBtnOnpress.bind(this)}>
                        <Text style={styles.closeBtn}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.contentText}>{content}</Text>
                    <TouchableOpacity style={styles.sureBtn} onPress={this._confirmBtnOnPress.bind(this)}>
                        <Text style={styles.sureBtnText}>{sureBtnTitle}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )
    }

    _renderAlertConfirm() {
        const {title,btnTitles} = this.props
        const animation = {transform:[{scale:this.springValue}]};
        return(
            <View style={styles.container}>
                <Animated.View style={[styles.alertBackView,{height:136},animation]}>
                    <View style={styles.confirmTitleView}>
                        <Text style={styles.confirmTilteText}>{title}</Text>
                    </View>
                    <View style={styles.confirmBtnView}>
                        <TouchableOpacity style={[styles.confirmBtn,{borderRightColor:"#e7e7e7",borderRightWidth:1,}]} onPress={this._closedBtnOnpress.bind(this)}>
                            <Text style={styles.confirmBtnText}>{btnTitles[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmBtn} onPress={this._confirmBtnOnPress.bind(this)}>
                            <Text style={[styles.confirmBtnText, {color:"#009FEE"}]} >{btnTitles[1]}</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        )
    }
    render() {
            if (!this.state.showSelf){
                return null;
            }
                
            return this._renderAlertView();
    }

    //安卓后退按钮监听
    componentDidMount() {
        LJBackHandler.addEventListener(LJ_BACK_EVENT,this._backActionHandler)
    }
    componentWillUnmount() {
        LJBackHandler.removeEventListener(LJ_BACK_EVENT);
    }

    _backActionHandler() {
        this.props.backActionHandler();
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.7)',
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute'
    },
    alertBackView:{
        width:LJAlertBackViewWidth,
        backgroundColor: 'white',
        height:211,
        marginTop: 100,
        borderRadius:5,
        alignItems: 'center',
    },
    closeBtn:{
        textAlign:"right",
        marginRight: 15,
        marginTop: 15,
        color:'#D8D8D8',
        fontSize: 20,
    },
    titleText:{
        fontSize: 20,
        color: '#4a4a4a',
        textAlign: 'center',
    },
    contentText:{
        marginTop: 8,
        fontSize: 16,
        color: '#959595',
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    sureBtn:{
        borderColor: "#3BA1FF",
        borderWidth: 1,
        borderRadius: 22,
        width: 178,
        height: 43,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    sureBtnText:{
        color: "#3BA1FF",
        fontSize: 16,
        textAlign: "center"
    },

    confirmBtnView:{
        flexDirection: 'row',
        height: '34%',
    },

    confirmTitleView:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '66%',
        borderBottomWidth: 1,
        borderBottomColor: "#e7e7e7",
    },
    confirmTilteText:{
        color: "#4a4a4a",
        fontSize: 20,
        marginTop: 30,
    },
    confirmBtn:{
        width: '50%',
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    confirmBtnText: {
        fontSize: 16,
        color: '#7D7D7D'
    }
})