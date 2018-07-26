import React, { Component } from 'react'
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';

export default class TimeCountDown extends Component {

    static defaultProps = {
        timeOut:0
    }
    timer = null;
    state = { isTap: false }
    constructor(props) {
        super(props);
        this.state = {
            timeOut:this.props.timeOut
        }
    
    }
    _onPress() {
        if (!this.state.isTap) {
            this._changeCurrentTapState();
            this._countDown();
        }
    }

    _changeCurrentTapState() {
        this.setState({
            isTap: !this.state.isTap
        })
    }

    _countDown(){
        this.timer = setInterval(
            ()=>{
                if(this.state.timeOut > 1){
                    this.setState({timeOut:this.state.timeOut-1})
                }else{
                    this._changeCurrentTapState();
                    this._resetCountDownNumber();
                    this._clearTimer();
                } 
            },1000)
    }

    
    /**
     *清除timer
     *
     * @memberof TimeCountDown
     */
    _clearTimer(){
        this.timer && clearInterval(this.timer);
    }


    /**
     * 重置时间
     * 
     * @memberof TimeCountDown
     */
    _resetCountDownNumber() {
        this.setState({timeOut:this.props.timeOut})
    }
    
    componentWillUnmount() {
        this._clearTimer()
    }

    render() {
        const normalButton = {borderColor: "#00abeb"};
        const selectedButton = {borderColor: "#d8d8d8"}
        const normalText = {color: "#00abeb"};
        const selectedText = {color: "#d8d8d8"}
        return (
            <TouchableOpacity style={[styles.container,this.state.isTap ? selectedButton:normalButton]} onPress={this._onPress.bind(this)} activeOpacity={1}>
                <Text style={[styles.text,this.state.isTap ? selectedText:normalText]}>{this.state.isTap ? this.state.timeOut+"s后重新获取" : "获取验证码"}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        height: 27,
        width : 91,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#00abeb",
        borderRadius: 5,
    },
    text:{
        color: '#00abeb'
    }
});