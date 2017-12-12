
import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View
} from 'react-native'

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>这是token，闲着无聊时做的react-native app的demo</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})
