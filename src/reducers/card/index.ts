/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { StateCard } from './type'

const initialState: StateCard = {
  card:  {
    _id: '',
    listId: '',
    title: '',
    tagsId: [],
    description: ''
  },
  loading: false,
  error: null,
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    getCardFetch: (state, _action) => {
      state.loading = true
    },
    getCardSuccess: (state, action) => {
      state.card = action.payload
      state.loading = false
    },
    getCardFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { getCardFetch, getCardSuccess, getCardFailure } = cardSlice.actions

export default cardSlice.reducer
