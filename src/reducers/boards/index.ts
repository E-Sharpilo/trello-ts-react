/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { StateBoards } from './type'

const initialState: StateBoards = {
  boards: [],
  loading: false,
  error: null,
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    getBoardsFetch: (state, _action) => {
      state.loading = true
    },
    getBoardsSuccess: (state, action) => {
      state.boards = action.payload
      state.loading = false
    },
    getBoardsFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    createBoardsFetch: (state, _action) => {
      state.loading = true
    },
    createBoardsSuccess: (state, action) => {
      state.boards.push(action.payload)
      state.loading = false
    },
    createBoardsFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    updateBoardsFetch: (state, _action) => {
      state.loading = true
    },
    updateBoardsSuccess: (state, action) => {
      const index = state.boards.findIndex((item) => item._id === action.payload._id)
      if (index >= 0) {
        state.boards.splice(index, 1, action.payload)
      }
      state.loading = false
    },
    updateBoardsFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    deleteBoardsFetch: (state, _action) => {
      state.loading = true
    },
    deleteBoardsSuccess: (state, action) => {
      state.boards = state.boards.filter((item) => item._id !== action.payload)
      state.loading = false
    },
    deleteBoardsFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  getBoardsFetch,
  getBoardsSuccess,
  getBoardsFailure,
  createBoardsFetch,
  createBoardsSuccess,
  createBoardsFailure,
  updateBoardsFetch,
  updateBoardsSuccess,
  updateBoardsFailure,
  deleteBoardsFetch,
  deleteBoardsSuccess,
  deleteBoardsFailure,
} = boardsSlice.actions

export default boardsSlice.reducer
