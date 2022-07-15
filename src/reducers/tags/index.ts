/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { StateTags} from './type'

const initialState: StateTags = {
  tags: [],
  loading: false,
  error: null,
}

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers:{
    getTagsFetch: (state, _action) => {
      state.loading = true
    },
    getTagsSuccess: (state, action) => {
      state.tags = action.payload
      state.loading = false
    },
    getTagsFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    createTagsFetch: (state, _action) => {
      state.loading = true
    },
    createTagsSuccess: (state, action) => {
      state.tags.push(action.payload)
      state.loading = false
    },
    createTagsFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  }
})

export const {
  getTagsFetch,
  getTagsSuccess,
  getTagsFailure,
  createTagsFetch,
  createTagsSuccess,
  createTagsFailure,
} = tagsSlice.actions


export default tagsSlice.reducer