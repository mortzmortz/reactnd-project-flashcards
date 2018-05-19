import { LOAD_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case LOAD_DECKS: {
      return {
        ...state,
        ...action.decks,
      }
      break
    }

    case ADD_DECK: {
      const newState = {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        },
      }
      return newState
      break
    }

    case ADD_CARD: {
      const { title, qa } = action
      const newState = {
        ...state,
      }

      if (newState[title]) {
        const { question, answer } = qa
        newState[title].questions.push({ question, answer })
      }
      return newState
      break
    }

    default:
      return state
  }
}

export default decks
