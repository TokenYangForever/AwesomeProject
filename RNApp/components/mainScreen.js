/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import deviceStorage from './../common/DeviceStorage'
import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableHighlight,
  Alert
} from 'react-native'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      arr: [],
      chooseIndex: -1
    }
  }
  componentDidMount () {
    const { params } = this.props.navigation.state
    if (params.newgame) {
      // 新游戏
      fetch(`http://192.168.0.105:8083/sudo/getSudo?difficulty=${params.difficulty}`)
      .then(response => {
        response.json().then(
            // 这里的result就是最终的接口数据了
            (data) => {
              let {result} = data
              this.setState({
                arr: result,
              })
            }
        )
      })
    } else {
      // 继续游戏
      deviceStorage.get('Checkerboard').then((arr) => {
        this.setState({arr})
      })
    }
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
  judgeResult = () => {
    let arr = this.state.arr
    let dp = {}
    let index = 0
    for (let a = 0; a < 3; a++) {
      for (let b = 0; b < 3; b++) {
        dp[`area${a}${b}`] = new Map()
      }
    }
    for (let i = 0; i < 9; i++) {
      dp[`x${i}`] = new Map()
      dp[`y${i}`] = new Map()
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let temp = arr[index]
        if (temp !== '') {
          let xIndex = 'x' + j
          let yIndex = 'y' + i
          let areaIndex = 'area' + Math.floor(j/3) + Math.floor(i/3)
          if (dp[xIndex].has(temp) || dp[yIndex].has(temp) || dp[areaIndex].has(temp)) {
            return [false, '有空格填错了哦~', index]
          } else {
            dp[xIndex].set(temp, true)
            dp[yIndex].set(temp, true)
            dp[areaIndex].set(temp, true)
          }
        } else {
          return [false, '还有空格没填完哦~']
        }
        index++
      }
    }
    return [true]
  }
  selectAction = (ev, item) => {
    let {arr, chooseIndex} = this.state
    arr[chooseIndex] = item
    deviceStorage.save('Checkerboard', arr).then(() => {})
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
    let {arr} = this.state
    let result = this.judgeResult()

    if (result[0]) {
      Alert.alert(
        '完成~'
      )
    } else {
      Alert.alert(
        result[1]
      )
      if (result[2]) {
        this.setState({
          chooseIndex: result[2]
        })
      }
    }
  }
  render () {
    return (
      <View>
        <View style={styles.container}>
          <Text>mainScreen</Text>
          <View style={styles.MScontainer}>
            {this.renderArr()}
            <View style={styles.borderView1}></View>
            <View style={styles.borderView2}></View>
            <View style={styles.borderView3}></View>
            <View style={styles.borderView4}></View>
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
  borderView1: {
    position: 'absolute',
    top: 120,
    left: 0,
    width: 360,
    height: 0,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1.5,
  },
  borderView2: {
    position: 'absolute',
    top: 240,
    left: 0,
    width: 360,
    height: 0,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1.5,
  },
  borderView3: {
    position: 'absolute',
    top: 0,
    left: 120,
    width: 0,
    height: 360,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1.5,
  },
  borderView4: {
    position: 'absolute',
    top: 0,
    left: 240,
    width: 0,
    height: 360,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1.5,
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
