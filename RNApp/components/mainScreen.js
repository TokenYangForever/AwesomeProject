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
    fetch('http://192.168.0.104:8083/sudo/getSudo')
    .then(response => {
      response.json().then(
          // 这里的result就是最终的接口数据了
          (data) => {
            let {quesArr, result} = data
            this.setState({
              arr: quesArr,
              result,
              chooseIndex: 0
            })
          }
      )
    })
    this.state = {
      arr: [],
      result: [],
      chooseIndex: 0
    }
  }
  renderArr = () => {
    let {arr, chooseIndex} = this.state
    return arr.map((item, index) => {
      if (typeof item == "string") {
        return (
          <View key={index} style={chooseIndex == index ? styles.bChoosen : styles.bRow}>
            <TouchableHighlight onPress={(ev) => {this.pressAction(ev, index)}}>
              <Text style={styles.text}>{item === '' ? ' ' : item}</Text>
            </TouchableHighlight>
          </View>
        )      
      } else {
        return (
          <View key={index} style={styles.bRow}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )
      }
    })
  }
  pressAction = (ev, index) => {
    this.setState({
      chooseIndex: index
    })
  }
  selectAction = (ev, item) => {
    let {arr, chooseIndex} = this.state
    arr[chooseIndex] = item
    this.setState({arr})
  }
  render () {
    return (
      <View>
        <View style={styles.container}>
          <Text>{this.state.chooseIndex}</Text>
          <Text>mainScreen</Text>
          <View style={styles.MScontainer}>
            {this.renderArr()}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          {
            ['1','2','3','4','5','6','7','8','9'].map((item, index) => {
              return (
                <View key={index} style={styles.bottomSpan}>
                  <TouchableHighlight onPress={(ev) => {this.selectAction(ev, item)}}>
                    <Text style={styles.text}>{item}</Text>
                  </TouchableHighlight>
                </View>
              )
            })
          }
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
  bottomContainer: {
    marginTop: 450,
    flex: 1,
    width: 360,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomSpan: {
    margin: 5,
    width: 35,
    height: 35,
    borderColor: 'skyblue',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5
  },
  bRow: {
    width: 40,
    height: 40,
    borderColor: 'skyblue',
    borderStyle: 'solid',
    borderWidth: 1
  },
  bChoosen: {
    width: 40,
    height: 40,
    borderColor: 'crimson',
    borderStyle: 'solid',
    borderWidth: 2
  },
  text: {
    textAlign: 'center',
    fontSize: 25
  }
})
