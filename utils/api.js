import { AsyncStorage } from 'react-native'
import mockData from './mock-data'

const DB_KEY = 'FlashCards:decks'

const parseDecks = decks => (decks ? JSON.parse(decks) : mockData)

export const getDecks = () => AsyncStorage.getItem(DB_KEY).then(parseDecks)

export const getDeck = id => getDecks().then(decks => decks[id])

export const saveDeckTitle = title => {
  getDecks().then(decks => {
    if (!decks[title]) {
      decks[title] = {
        title,
        questions: [],
      }
      AsyncStorage.setItem(DB_KEY, JSON.stringify(decks))
    }
  })
}

export const addCardToDeck = (title, { question, answer }) => {
  getDecks().then(decks => {
    if (decks[title] && decks[title]['questions']) {
      decks[title]['questions'].push({ question, answer })
    }
    AsyncStorage.setItem(DB_KEY, JSON.stringify(decks))
  })
}

export const clearDecks = () => {
  AsyncStorage.setItem(DB_KEY, '')
}
