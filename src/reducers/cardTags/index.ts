/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { StateCardTags } from './type'

const initialState: StateCardTags = {
  cardTags: [],
  loading: false,
  error: null,
}

const cardTagsSlice = createSlice({
  name: 'cardTags',
  initialState,
  reducers: {
    createCardTagsFetch: (state, _action) => {
      state.loading = true
    },
    createCardTagsSuccess: (state, action) => {
      state.cardTags.push(action.payload)
    },
    createCardTagsFailure: (state, action) => {
      state.error = action.payload
    },
    deleteCardTagsFetch: (state, _action) => {
      state.loading = true
    },
    deleteCardTagsSuccess: (state, action) => {
      const index = state.cardTags.findIndex((item) => item._id === action.payload._id)
      if (index >= 0) {
        state.cardTags.splice(index, 1, action.payload)
      }
      state.loading = false
    },
    deleteCardTagsFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  createCardTagsFetch,
  createCardTagsSuccess,
  createCardTagsFailure,
  deleteCardTagsFetch,
  deleteCardTagsSuccess,
  deleteCardTagsFailure
} = cardTagsSlice.actions

export default cardTagsSlice.reducer