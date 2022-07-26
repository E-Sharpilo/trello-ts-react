/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { TCard } from '../../types/card';
import { StateCards } from './type';


const initialState: StateCards = {
  cards: [],
  loading: false,
  error: null,
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    getCardsFetch: (state, _action) => {
      state.loading = true
    },
    getCardsSuccess: (state, action) => {
      action.payload.forEach((element:TCard) => {
        if (!state.cards.some(item => item._id === element._id)) {
          state.cards.push(element)
        }
      });
      
      state.loading = false
    },
    getCardsFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    clearCardsList: (state) => {
      state.cards = []
    },
    createCardsFetch: (state, _action) => {
      state.loading = true
    },
    createCardsSuccess: (state, action) => {
      state.cards.push(action.payload)
      state.loading = false
    },
    createCardsFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  getCardsFetch,
  getCardsSuccess,
  getCardsFailure,
  createCardsFetch,
  createCardsSuccess,
  createCardsFailure,
  clearCardsList
} = cardsSlice.actions

export default cardsSlice.reducer