/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Platform,
  Button,
  TouchableHighlight
} from 'react-native'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      arr: [
        '1', '2', '', '4', '5', '6', '7', '8', '9','4', '5', '6', '7', '8', '9', '1', '2', '3','7', '8', '9', '1', '2', '3', '4', '5', '6','2', '1', '4', '3', '6', '5', '8', '9', '7','3', '6', '5', '8', '9', '7', '2', '1', '4','8', '9', '7', '2', '1', '4', '3', '6', '5','5', '3', '1', '6', '4', '2', '9', '7', '8','6', '4', '2', '9', '7', '8', '5', '3', '1','9', '7', '8', '5', '3', '1', '6', '4', '2'
      ],
      viewtext: '123',
      chooseIndex: 0
    }
  }
  renderArr = () => {
    const arr2 = this.state.arr
    return arr2.map((item, index) => {
      if (item === '') {
        return (
          <View key={index} style={styles.bRow}>
            <TouchableHighlight onPress={(ev) => {this.prressAction(ev, index)}}>
              <Text style={styles.text}>{item}</Text>
            </TouchableHighlight>
          </View>
        )      
      } else {
        return (
          <View key={index} style={styles.bRow}>
            <TouchableHighlight onPress={(ev) => {this.prressAction(ev, index)}}>
              <Text style={styles.text}>{item}</Text>
            </TouchableHighlight>
          </View>
        )
      }
    })
  }
  prressAction = (ev, index) => {
    this.setState({
      chooseIndex: index
    })
  }
  render () {
    return (
      <View style={styles.container}>
        <Text>{this.state.chooseIndex}</Text>
        <Text>mainScreen</Text>
        <View style={styles.MScontainer}>
        {this.renderArr()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  MScontainer: {
    flex: 1,
    flexWrap: 'wrap',
    width: 360,
    flexDirection: 'row',
    margin: 10
  },
  bRow: {
    width: 40,
    height: 40,
    borderColor: 'skyblue',
    borderStyle: 'solid',
    borderWidth: 1
  },
  text: {
    textAlign: 'center',
    fontSize: 25
  }
})
