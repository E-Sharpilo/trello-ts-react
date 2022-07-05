import { createSlice } from '@reduxjs/toolkit'
import { getBoards } from '../api/boardsApi'
import { Boards } from '../types/boards'

const initialState: Boards = {
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
        console.log(state.boards);
        
        state.loading = false
      })
  },
})

export default boardsSlice.reducer
