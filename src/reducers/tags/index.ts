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
    deleteTagsFetch: (state, _action) => {
      state.loading = true
    },
    deleteTagsSuccess: (state, action) => {
      state.tags = state.tags.filter((item) => item._id !== action.payload)
      state.loading = false
    },
    deleteTagsFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    updateTagsFetch: (state, _action) => {
      state.loading = true
    },
    updateTagsSuccess: (state, action) => {
      const index = state.tags.findIndex((item) => item._id === action.payload._id)
      if (index >= 0) {
        state.tags.splice(index, 1, action.payload)
      }
      state.loading = false
    },
    updateTagsFailure: (state, action) => {
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
  deleteTagsFetch,
  deleteTagsSuccess,
  deleteTagsFailure,
  updateTagsFetch,
  updateTagsSuccess,
  updateTagsFailure,
} = tagsSlice.actions


export default tagsSlice.reducer