import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'

import MainScreen from './components/mainScreen'
import homePage from './components/app'
import aboutScreen from './components/about'
import {
  DrawerNavigator
} from 'react-navigation'

const App = DrawerNavigator({
  Home: {
    screen: homePage,
    navigationOptions: {
      drawerLabel: '主菜单'
    }
  },
  Main: {
    screen: MainScreen
  },
  About: {
    screen: aboutScreen,
    navigationOptions: {
      drawerLabel: '关于'
    }
  }
})

export default App
