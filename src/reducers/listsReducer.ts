/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { TLists } from './lists'

const initialState: TLists = {
  lists: [],
  loading: false,
  error: null,
}

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    getListsFetch: (state, action) => {
      state.loading = true
    },
    getListsSuccess: (state, action) => {
      state.lists = action.payload
      state.loading = false
    },
    getListsFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    createListsFetch: (state, _action) => {
      state.loading = true
    },
    createListsSuccess: (state, action) => {
      state.lists.push(action.payload)
      state.loading = false
    },
    createListsFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  getListsFetch,
  getListsSuccess,
  getListsFailure,
  createListsFetch,
  createListsSuccess,
  createListsFailure,
} = listsSlice.actions

export default listsSlice.reducer
