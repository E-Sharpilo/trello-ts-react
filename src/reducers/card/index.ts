import { createSlice } from '@reduxjs/toolkit';
import { StateCard } from './type';

const initialState: StateCard = {
  card: {
    _id: '',
    listId: '',
    title: '',
    tagsId: [],
    description: '',
  },
  loading: false,
  error: null,
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    getCardFetch: (state, _action) => {
      state.loading = true;
    },
    getCardSuccess: (state, action) => {
      state.card = action.payload;
      state.loading = false;
    },
    getCardFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateCardFetch: (state, _action) => {
      state.loading = true;
    },
    updateCardSuccess: (state, action) => {
      state.card = action.payload;
      state.loading = false;
    },
    updateCardFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteCardFetch: (state, _action) => {
      state.loading = true;
    },
    deleteCardSuccess: (state, action) => {
      state.card = initialState.card;
      state.loading = false;
    },
    deleteCardFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getCardFetch,
  getCardSuccess,
  getCardFailure,
  updateCardFetch,
  updateCardSuccess,
  updateCardFailure,
  deleteCardFetch,
  deleteCardSuccess,
  deleteCardFailure,
} = cardSlice.actions;

export default cardSlice.reducer;
