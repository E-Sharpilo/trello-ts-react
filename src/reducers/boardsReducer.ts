import { createSlice } from '@reduxjs/toolkit'
import { TBoards } from './boards'

const initialState: TBoards = {
  boards: [],
  loading: false,
  error: null,
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    getBoardsFetch: (state) => {
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
    // eslint-disable-next-line no-unused-vars
    createBoardsFetch: (state, action) => {
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
  },
})

export const {
  getBoardsFetch,
  getBoardsSuccess,
  getBoardsFailure,
  createBoardsFetch,
  createBoardsSuccess,
  createBoardsFailure,
} = boardsSlice.actions

export default boardsSlice.reducer
