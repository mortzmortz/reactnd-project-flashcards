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
import { addDeck } from '../redux/actions'
import { saveDeckTitle } from '../utils/api'
import { black, white, lightGray } from '../utils/colors'

import FormButtons from './FormButtons'

class AddDeck extends React.Component {
  state = {
    title: '',
  }

  submit = () => {
    const { title } = this.state
    const { addDeck } = this.props
    if (title) {
      // Update Redux
      addDeck(title)
      // Update storage
      saveDeckTitle(title)
      // Navigate to decks list
      this.reset()
    }
  }

  reset = () => {
    this.setState(
      () => ({
        title: '',
      }),
      this.toHome,
    )
  }

  toHome() {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="Deck Title"
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <FormButtons
          onSubmit={this.submit}
          onCancel={this.reset}
          submitBtnText={'Add Deck'}
          cancelBtnText={'Cancel'}
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
  label: {
    margin: 10,
    color: black,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  titleInput: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: lightGray,
  },
})

const mapStateToProps = decks => ({
  decks,
})

export default connect(mapStateToProps, { addDeck })(AddDeck)
