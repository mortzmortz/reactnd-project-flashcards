import React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import { Platform } from 'react-native'

import Decks from './components/Decks'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'

import DeckMenu from './components/DeckMenu'
import Quiz from './components/Quiz'

import { MaterialIcons, Ionicons } from '@expo/vector-icons'

import { darkGrey, white, black } from './utils/colors'

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) =>
          Platform.OS === 'ios' ? (
            <Ionicons name="ios-list" size={30} color={tintColor} />
          ) : (
            <MaterialIcons name="list" size={30} color={tintColor} />
          ),
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) =>
          Platform.OS === 'ios' ? (
            <Ionicons name="ios-add" size={30} color={tintColor} />
          ) : (
            <MaterialIcons name="add" size={30} color={tintColor} />
          ),
      },
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? darkGrey : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : darkGrey,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  },
)

export const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTintColor: black,
      headerStyle: {
        backgroundColor: white,
      },
      title: 'Decks',
    },
  },
  DeckMenu: {
    screen: DeckMenu,
    navigationOptions: {
      headerTintColor: black,
      headerStyle: {
        backgroundColor: white,
      },
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: black,
      headerStyle: {
        backgroundColor: white,
      },
      title: 'Add Card',
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: black,
      headerStyle: {
        backgroundColor: white,
      },
    },
  },
})
