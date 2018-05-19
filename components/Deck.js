import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { darkGrey, black, gray } from '../utils/colors'

const Deck = ({ title, questions }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.count}>{questions.length} Cards</Text>
  </View>
)

export default Deck

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: black,
    fontSize: 28,
    textAlign: 'center',
  },
  count: {
    color: gray,
    fontSize: 16,
    textAlign: 'center',
  },
})
