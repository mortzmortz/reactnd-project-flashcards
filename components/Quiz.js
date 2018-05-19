import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { connect } from 'react-redux'

import {
  setLocalNotification,
  clearLocalNotification,
} from '../utils/notifications'
import { white, black, green, red, darkGrey } from '../utils/colors'

import Deck from './Deck'
import QuizCard from './QuizCard'
import Progress from './Progress'

class Quiz extends React.PureComponent {
  state = {
    currentCard: 0,
    totalCorrect: 0,
  }

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }

  handleCorrectBtnPress = () => {
    this.setState(state => {
      return {
        currentCard: state['currentCard'] + 1,
        totalCorrect: state['totalCorrect'] + 1,
      }
    })
  }

  handleIncorrectBtnPress = () => {
    this.setState(state => {
      return {
        ...state,
        currentCard: state['currentCard'] + 1,
      }
    })
  }

  getScore = () => {
    const { totalCorrect } = this.state
    const { questions } = this.props.deck
    return `${totalCorrect / questions.length * 100}%`
  }

  restart = () => {
    this.setState({ currentCard: 0, totalCorrect: 0 })
  }

  renderScore = () => {
    const { goBack } = this.props

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreHead}>Score</Text>
          <Text style={styles.score}>{this.getScore()}</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, styles.backBtn]}
            onPress={goBack}
          >
            <Text style={[styles.btnText, styles.backBtnText]}>
              Back to Deck
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.restartBtn]}
            onPress={this.restart}
          >
            <Text style={[styles.btnText, styles.restartBtnText]}>
              Restart Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderCard = () => {
    const { currentCard } = this.state
    const { questions } = this.props.deck
    const card = questions[currentCard]

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.progressContainer}>
          <Progress current={currentCard + 1} total={questions.length} />
        </View>
        <View style={styles.cardContainer}>
          <QuizCard card={card} />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, styles.correctBtn]}
            onPress={this.handleCorrectBtnPress}
          >
            <Text style={[styles.btnText]}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.incorrectBtn]}
            onPress={this.handleIncorrectBtnPress}
          >
            <Text style={[styles.btnText]}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const { currentCard } = this.state
    const { questions } = this.props.deck

    return (
      <View style={styles.container}>
        {currentCard > 0 && currentCard === questions.length
          ? this.renderScore()
          : this.renderCard()}
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
  progressContainer: {
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
  },
  btn: {
    flex: 1,
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
  correctBtn: {
    backgroundColor: green,
  },
  incorrectBtn: {
    backgroundColor: red,
  },
  backBtn: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: black,
  },
  backBtnText: {
    color: black,
  },
  restartBtn: {
    backgroundColor: black,
  },
  restartBtnText: {
    color: white,
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  scoreContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreHead: {
    fontSize: 36,
    color: darkGrey,
  },
  score: {
    fontSize: 48,
    color: green,
  },
})

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params
  return {
    deck: decks[title] || {},
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { title } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
