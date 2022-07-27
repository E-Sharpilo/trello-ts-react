import { createSlice } from '@reduxjs/toolkit';
import { StateLists } from './type';

const initialState: StateLists = {
  lists: [],
  loading: false,
  error: null,
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    getListsFetch: (state, _action) => {
      state.loading = true;
    },
    getListsSuccess: (state, action) => {
      state.lists = action.payload;
      state.loading = false;
    },
    getListsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createListsFetch: (state, _action) => {
      state.loading = true;
    },
    createListsSuccess: (state, action) => {
      state.lists.push(action.payload);
      state.loading = false;
    },
    createListsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateListsFetch: (state, _action) => {
      state.loading = true;
    },
    updateListsSuccess: (state, action) => {
      const index = state.lists.findIndex((item) => item._id === action.payload._id);
      if (index >= 0) {
        state.lists.splice(index, 1, action.payload);
      }
      state.loading = false;
    },
    updateListsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteListsFetch: (state, _action) => {
      state.loading = true;
    },
    deleteListsSuccess: (state, action) => {
      state.lists = state.lists.filter((item) => item._id !== action.payload);
      state.loading = false;
    },
    deleteListsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getListsFetch,
  getListsSuccess,
  getListsFailure,
  createListsFetch,
  createListsSuccess,
  createListsFailure,
  updateListsFetch,
  updateListsSuccess,
  updateListsFailure,
  deleteListsFetch,
  deleteListsSuccess,
  deleteListsFailure,
} = listsSlice.actions;

export default listsSlice.reducer;
