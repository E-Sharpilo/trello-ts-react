import { createSlice } from '@reduxjs/toolkit'
import { getBoards } from '../api/boardsApi'
import { TBoards } from '../types/boards'

const initialState: TBoards = {
  boards: [],
  loading: false,
  error: null,
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.boards = action.payload
        state.loading = false
      })
  },
})

export default boardsSlice.reducer
