import React from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import { addCard } from '../redux/actions'
import { addCardToDeck } from '../utils/api'
import { black, white, lightGray } from '../utils/colors'

import FormButtons from './FormButtons'

class AddCard extends React.Component {
  state = {
    question: '',
    answer: '',
  }

  submit = () => {
    const { question, answer } = this.state
    const { addCard, deck } = this.props
    if (question && answer) {
      addCard(deck.title, { question, answer })
      // Update Storage
      addCardToDeck(deck.title, { question, answer })
      // Navigate back
      this.reset()
    }
  }

  reset = () => {
    this.setState({ question: '', answer: '' })
    this.props.goBack()
  }

  render() {
    const { deck } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <TextInput
          style={styles.question}
          placeholder="Type the question"
          onChangeText={text => this.setState({ question: text })}
          value={this.state.question}
        />
        <TextInput
          style={styles.answer}
          placeholder="Type the answer"
          multiline={true}
          onChangeText={text => this.setState({ answer: text })}
          value={this.state.answer}
        />
        <FormButtons
          onSubmit={this.submit}
          onCancel={this.reset}
          submitBtnText={'Add Card'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
  },
  title: {
    color: black,
    fontSize: 24,
    textAlign: 'center',
  },
  question: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: lightGray,
    borderRadius: 4,
  },
  answer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: lightGray,
    height: 70,
  },
})

const mapStateToProps = (decks, { navigation }) => ({
  deck: decks[navigation.state.params.title] || {},
})

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { title } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    addCard: (title, card) => dispatch(addCard(title, card)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
