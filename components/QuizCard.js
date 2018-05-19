import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native'

import { red, black, white } from '../utils/colors'

import TextButton from './TextButton'

class QuizCard extends React.Component {
  state = {
    showQuestion: true,
  }

  componentWillReceiveProps(nextProps) {
    // handle next question
    const { card } = this.props
    if (card.question !== nextProps.card.question) {
      this.showQuestion()
    }
  }

  showQuestion = () => {
    this.setState({ showQuestion: true })
  }

  toggleCard = () => {
    this.setState(state => ({ showQuestion: !state.showQuestion }))
  }

  renderQuestion = () => {
    const { question } = this.props.card
    return (
      <View>
        <TextButton onPress={this.toggleCard}>Answer</TextButton>
        <View style={styles.qaTextContainer}>
          <Text style={styles.qaText}>{question}</Text>
        </View>
      </View>
    )
  }

  renderAnswer = () => {
    const { answer } = this.props.card
    return (
      <View>
        <TextButton onPress={this.toggleCard}>Question</TextButton>
        <View style={styles.qaTextContainer}>
          <Text style={styles.qaText}>{answer}</Text>
        </View>
      </View>
    )
  }

  render() {
    const { card } = this.props
    const { showQuestion } = this.state

    return (
      <View style={styles.container}>
        {showQuestion ? this.renderQuestion() : this.renderAnswer()}
      </View>
    )
  }
}

export default QuizCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  qaTextContainer: {
    minHeight: 400,
    marginLeft: 10,
    marginRight: 10,
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qaText: {
    color: black,
    fontSize: 34,
    textAlign: 'center',
  },
})
