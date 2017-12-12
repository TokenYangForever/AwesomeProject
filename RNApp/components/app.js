/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import deviceStorage from './../common/DeviceStorage'
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Picker,
  Alert
} from 'react-native'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      text: 'Easy',
      select: ''
    }
    deviceStorage.get('difficulty').then(val => {
      // 没有值时，val为null
      if (val) {
        this.setState({
          text: val,
          select: ''
        })
      }
    })

  }
  newGamePress = () => {
    let {text} = this.state
    deviceStorage.delete('Main')
    deviceStorage.save('difficulty', text).then(() => {
      this.props.navigation.navigate('Main', {difficulty: text, newgame: true})
    })
  }
  continuePress = () => {
    deviceStorage.get('Checkerboard').then((arr) => {
      if (arr) {
        this.props.navigation.navigate('Main', {newgame: false})
      } else {
        return Promise.reject()
      }
    }).catch(() => {
      Alert.alert('无法找到之前的记录，重新开始吧~')
    })
    
  }
  aboutPress = () => {
    this.props.navigation.navigate('About')
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>数独游戏</Text>
        <View style={styles.homeBtnGroup}>
          <TouchableNativeFeedback onPress={this.newGamePress}>
            <Text style={styles.homeBtn}>新游戏</Text>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={this.continuePress}>
            <Text style={styles.homeBtn}>继续</Text>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={this.aboutPress}>
            <Text style={styles.homeBtn}>关于</Text>
          </TouchableNativeFeedback>
          <View style={{width: 250, backgroundColor:'skyblue',margin:15,borderRadius: 15}}>
            <Picker
              selectedValue={this.state.text}
              onValueChange={(lang) => this.setState({text: lang})}>
              <Picker.Item label="简单" value="Easy" />
              <Picker.Item label="中等" value="Medium" />
              <Picker.Item label="困难" value="Hard" />
            </Picker>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column'
  },
  homeBtn: {
    width: 250,
    backgroundColor: 'skyblue',
    margin: 20,
    borderRadius: 15,
    textAlign: 'center',
    fontSize: 20
  },
  homeBtnGroup: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'center'
  },
  titleText: {
    fontSize: 20,
    marginTop: 10,
    textAlign:'center'
  }
})
