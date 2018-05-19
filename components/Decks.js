import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { AppLoading } from 'expo'
import { SearchBar } from 'react-native-elements'

import { connect } from 'react-redux'
import { loadDecks } from '../redux/actions'
import { getDecks } from '../utils/api'
import { white, lightGray } from '../utils/colors'

import Deck from './Deck'

class Decks extends React.Component {
  state = {
    isReady: false,
    query: '',
  }

  componentDidMount() {
    const { loadDecks } = this.props
    getDecks()
      .then(decks => loadDecks(decks))
      .then(() => this.setState(() => ({ isReady: true })))
  }

  onPressItem = ({ title }) => {
    this.props.navigation.navigate('DeckMenu', { title })
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.onPressItem(item)}
      >
        <Deck id={item.title} title={item.title} questions={item.questions} />
      </TouchableOpacity>
    )
  }

  handleSearchChange = query => {
    this.setState(() => ({
      query: query.toLowerCase(),
    }))
  }

  handleSearchClear = () => {
    this.setState(() => ({
      query: '',
    }))
  }

  renderSearchBar = () => (
    <SearchBar
      autoCapitalize="none"
      platform={Platform.OS}
      onChangeText={this.handleSearchChange}
      onCancel={this.handleSearchClear}
      onClear={this.handleSearchClear}
      cancelButtonTitle="Cancel"
      placeholder="Search"
      value={this.state.query}
    />
  )

  render() {
    const { decks } = this.props
    const listOfDecks = Object.values(decks).filter(deck =>
      deck.title.toLowerCase().includes(this.state.query),
    )

    if (!this.state.isReady) {
      return <AppLoading />
    }

    return (
      <FlatList
        style={styles.container}
        data={listOfDecks}
        extraData={this.state}
        keyExtractor={item => item.title}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderSearchBar}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  item: {
    backgroundColor: white,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: lightGray,
  },
})

const mapStateToProps = decks => ({
  decks,
})

export default connect(mapStateToProps, { loadDecks })(Decks)
