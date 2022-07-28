import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { callApi } from '../../api/callApi'
import {
  getLoginFailure,
  getLoginFetch,
  getLoginSuccess,
  getLogoutFailure,
  getLogoutFetch,
  getLogoutSuccess,
  getRefreshFailure,
  getRefreshFetch,
  getRefreshSuccess,
  getRegistrationFailure,
  getRegistrationFetch,
  getRegistrationSuccess,
  getUserFailure,
  getUserFetch,
  getUserSuccess,
} from '../../reducers/user'
import { TUser } from '../../types/user'

import { AuthResponse, LoginPass } from './types'

function* getLoginWorker(action: PayloadAction<LoginPass>) {
  console.log('login worker')

  try {
    const res: AuthResponse = yield call(callApi, 'login', {
      method: 'POST',
      body: action.payload,
    })

    localStorage.setItem('token', res.accessToken)

    yield put(getLoginSuccess(res))
  } catch (error) {
    console.log(error)

    yield put(getLoginFailure(error))
  }
}

function* getRegisterWorker(action: PayloadAction<LoginPass>) {
  console.log(action.payload)

  try {
    const res: AuthResponse = yield call(callApi, 'registration', {
      method: 'POST',
      body: action.payload,
    })
    localStorage.setItem('token', res.accessToken)
    yield put(getRegistrationSuccess(res))
  } catch (error) {
    yield put(getRegistrationFailure(error))
  }
}

function* getRefreshWorker() {
  try {
    const res: AuthResponse = yield call(callApi, 'refresh', {})
    localStorage.setItem('token', res.accessToken)
    yield put(getRefreshSuccess(res))
  } catch (error) {
    yield put(getRefreshFailure(error))
  }
}

function* getLogoutWorker() {
  try {
    yield call(callApi, 'logout', {})
    localStorage.removeItem('token')
    yield put(getLogoutSuccess(null))
  } catch (error) {
    yield put(getLogoutFailure(error))
  }
}

function* getUserWorker() {
  try {
    const res: TUser = yield call(callApi, 'user', {})
    yield put(getUserSuccess(res))
  } catch (error) {
    yield put(getUserFailure(error as AxiosError))
  }
}

function* userSaga() {
  yield takeEvery(getUserFetch.type, getUserWorker)
  yield takeEvery(getLoginFetch.type, getLoginWorker)
  yield takeEvery(getRegistrationFetch.type, getRegisterWorker)
  yield takeEvery(getRefreshFetch.type, getRefreshWorker)
  yield takeEvery(getLogoutFetch.type, getLogoutWorker)
}

export default userSaga
