import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { white, black, blue } from '../utils/colors'

class TextButton extends React.PureComponent {
  render() {
    const { children, onPress, buttonStyle = {}, textStyle = {} } = this.props
    return (
      <View>
        <TouchableOpacity style={[styles.btn, buttonStyle]} onPress={onPress}>
          <Text style={[styles.btnText, textStyle]}>{children}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: white,
    padding: 10,
    height: 40,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: blue,
    fontSize: 20,
  },
})

export default TextButton
