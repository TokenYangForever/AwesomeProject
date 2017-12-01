/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableNativeFeedback,
  TouchableHighlight,
  Picker
} from 'react-native'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      text: '',
      select: ''
    }
  }
  newGamePress = () => {
    this.props.navigation.navigate('Main')
    // this.props.navigation.navigate('DrawerOpen')
  }
  continuePress = () => {}
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
              <Picker.Item label="入门" value="入门" />
              <Picker.Item label="中等" value="中等" />
              <Picker.Item label="困难" value="困难" />
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
