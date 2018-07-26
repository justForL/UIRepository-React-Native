/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import LJAlert from './Components/LJAlert'
import TimeCountDown from './Components/TimeCountDown'
import AlertManager from './Components/LJAlert'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {

  _confirmBtnOnpress(){
    console.warn("确认按钮点击");
    AlertManager.hide();
  }
  _closeBtnOnpress(){
    console.warn("关闭按钮点击");
    AlertManager.hide();
  }
  _timeCountDownPress = () =>{
    AlertManager.show("语音验证码","simple",{
      show:true,
      content:"我们将会给138****3212手机拨打语音请注意接听来电",
      sureBtnTitle:"我知道了",
      btnTitles:["取消","放弃修改"],
      confirmBtnOnpress:this._confirmBtnOnpress,
      closeBtnOnpress:this._closeBtnOnpress
    })
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TimeCountDown 
        timeOut={5}
        onPress={this._timeCountDownPress.bind(this)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
