import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { black } from '../utils/colors'

const Progress = props => {
  const { current, total } = props
  return (
    <Text style={styles.pagination}>
      {current} / {total}
    </Text>
  )
}

const styles = StyleSheet.create({
  pagination: {
    paddingLeft: 10,
    color: black,
  },
})

export default Progress
