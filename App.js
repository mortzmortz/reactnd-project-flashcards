import React from 'react'
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './redux/reducers'

import { Constants } from 'expo'

import { MainNavigator } from './routes'

import { setLocalNotification } from './utils/notifications'
import { clearDecks } from './utils/api'
import { darkGrey, white, black } from './utils/colors'

const Status = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

class App extends React.Component {
  componentDidMount() {
    // clearDecks()
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <Status backgroundColor={darkGrey} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

export default App
