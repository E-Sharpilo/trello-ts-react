/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { StateUser } from './type';

const initialState: StateUser = {
  user: {},
  isAuth: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getLoginFetch: (state, _action) => {
      state.loading = true;
    },
    getLoginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuth = true;
    },
    getLoginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getRegistrationFetch: (state, _action) => {
      state.loading = true;
    },
    getRegistrationSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuth = true;
    },
    getRegistrationFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getLogoutFetch: (state, _action) => {
      state.loading = true;
    },
    getLogoutSuccess: (state, action) => {
      state.user = {};
      
      state.loading = false;
      state.isAuth = false;
    },
    getLogoutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    getRefreshFetch: (state, _action) => {
      state.loading = true;
    },
    getRefreshSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isAuth = true;
    },
    getRefreshFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    getUserFetch: (state, _action) => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isAuth = true;
    },
    getUserFailure: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getLoginFetch,
  getLoginSuccess,
  getLoginFailure,
  getRegistrationFetch,
  getRegistrationSuccess,
  getRegistrationFailure,
  getLogoutFetch,
  getLogoutSuccess,
  getLogoutFailure,
  getRefreshFetch,
  getRefreshSuccess,
  getRefreshFailure,
  getUserFetch,
  getUserSuccess,
  getUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
