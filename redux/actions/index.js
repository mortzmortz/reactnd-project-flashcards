export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const loadDecks = decks => ({ type: LOAD_DECKS, decks })
export const addDeck = title => ({ type: ADD_DECK, title })
export const addCard = (title, qa) => ({ type: ADD_CARD, title, qa })
