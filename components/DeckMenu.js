import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'

import { connect } from 'react-redux'
import { white, black } from '../utils/colors'

import Deck from './Deck'

class DeckMenu extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title }
  }

  render() {
    const { deck, navigateToAddCard, navigateToQuiz } = this.props

    return (
      <View style={styles.container}>
        <Deck id={deck.title} title={deck.title} questions={deck.questions} />
        <TouchableOpacity
          style={[styles.btn, styles.addCardBtn]}
          onPress={() => navigateToAddCard(deck.title)}
        >
          <Text style={[styles.btnText, styles.addCardBtnText]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.startBtn]}
          onPress={() => navigateToQuiz(deck.title)}
        >
          <Text style={[styles.btnText, styles.startBtnText]}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  btn: {
    padding: 10,
    height: 45,
    margin: 10,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        borderRadius: 7,
      },
      android: {
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
      },
    }),
  },
  addCardBtn: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: black,
  },
  addCardBtnText: {
    color: black,
  },
  startBtn: {
    backgroundColor: black,
  },
  startBtnText: {
    color: white,
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})

const mapStateToProps = (decks, { navigation }) => ({
  deck: decks[navigation.state.params.title] || {},
  decks,
})

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { title } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    navigateToAddCard: title => navigation.navigate('AddCard', { title }),
    navigateToQuiz: title => navigation.navigate('Quiz', { title }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckMenu)
