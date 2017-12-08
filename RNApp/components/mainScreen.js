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
  TouchableHighlight,
  Alert
} from 'react-native'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      arr: [],
      result: [],
      chooseIndex: -1
    }
  }
  componentDidMount () {
    fetch('http://192.168.0.104:8083/sudo/getSudo')
    .then(response => {
      response.json().then(
          // 这里的result就是最终的接口数据了
          (data) => {
            let {quesArr, result} = data
            this.setState({
              arr: quesArr,
              result,
              chooseIndex: -1
            })
          }
      )
    })
  }
  renderArr = () => {
    let {arr, chooseIndex} = this.state
    return arr.map((item, index) => {
      if (typeof item == "string") {
        return (
          <View key={index} style={chooseIndex == index ? styles.bChoosen : styles.bRow}>
            <TouchableHighlight onPress={(ev) => {this.pressAction(ev, index)}}>
              <Text style={styles.editableText}>{item === '' ? ' ' : item}</Text>
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
  cleanAction = () => {
    let {arr, chooseIndex} = this.state
    if (chooseIndex === -1) {
      return
    }
    arr[chooseIndex] = ''
    this.setState({arr})
  }
  submitAction = () => {
    let flag = true
    let {arr, result} = this.state
    for (let i in arr) {
      if (arr[i] == '') {
        Alert.alert(
          '还有空格没填完哦~'
        )
        return
      } else if (flag && Number(arr[i]) !== result[i]) {
        flag = false
      }
    }
    Alert.alert(
      flag ? '完成~' : '有空格填错了哦~'
    )
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
          <View style={styles.bottomContainer2}>
            <View style={styles.buttonStyle}>
              <Button
                onPress={this.cleanAction}
                title="清空"
                color="#841584"
              />            
            </View>
            <View style={styles.buttonStyle}>
              <Button
                onPress={this.cleanAction}
                title="暂停"
                color="#841584"
              />            
            </View>
            <View style={styles.buttonStyle}>
              <Button
                onPress={this.submitAction}
                title="提交"
                color="#841584"
              />            
            </View>
          </View>
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
    flex: 1,
    marginTop: 450,
    width: 360,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomContainer2: {
    position: 'absolute',
    top: 20,
    flex: 1,
    flexDirection: 'row',
  },
  buttonStyle: {
    margin: 10,
    width: 70,
    height: 50
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
  },
  editableText: {
    textAlign: 'center',
    fontSize: 25,
    color: 'green'
  }
})
