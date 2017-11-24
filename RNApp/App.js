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
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from 'react-navigation'

// const App = StackNavigator({
//   Home: {
//     screen: homePage,
//     navigationOptions: {
//       title: '首页'
//     }
//   },
//   Main: {
//     screen: MainScreen,
//     navigationOptions: {
//       title: '第二个页面'
//     }
//   }
// })

// const App = TabNavigator({
//   Home: {
//     screen: homePage
//   },
//   Main: {
//     screen: MainScreen
//   }
// }, {
//   tabBarPosition: 'top',
//   animationEnabled: true,
//   tabBarOptions: {
//     activeTintColor: '#e91e63'
//   }
// })

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
