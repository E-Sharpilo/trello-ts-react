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
  reducers: {}
})

export default listsSlice.reducer
