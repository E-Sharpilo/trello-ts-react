import { createSlice } from '@reduxjs/toolkit'
import { getLists } from '../api/listsApi'
import { TLists } from '../types/lists'

const initialState: TLists = {
  lists: [],
  loading: false,
  error: null,
}

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLists.fulfilled, (state, action) => {
        state.lists = action.payload
        state.loading = false
      })
  },
})

export default listsSlice.reducer
