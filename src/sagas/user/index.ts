import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { callApi } from '../../api/callApi'
import { getLoginFailure, getLoginFetch, getLoginSuccess, getRefreshFetch, getRegistrationFailure, getRegistrationFetch, getRegistrationSuccess } from '../../reducers/user'

import { AuthResponse, LoginPass } from './types'


function* getLoginWorker(action: PayloadAction<LoginPass>) {
  try {
    const res: AuthResponse = yield call(callApi, 'login', {
      method: 'POST',
      body: action.payload
    })
    yield put(getLoginSuccess(res))
  } catch (error) {
    yield put(getLoginFailure(error))
  }
}

function* getRegisterWorker(action: PayloadAction<LoginPass>) {
  console.log(action.payload);
  
  try {
    const res: AuthResponse = yield call(callApi, 'registration', {
      method: 'POST',
      body: action.payload
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
    yield put(getRegistrationSuccess(res))
  } catch (error) {
    yield put(getRegistrationFailure(error))
  }
}


function* userSaga() {
  yield takeEvery(getLoginFetch.type, getLoginWorker)
  yield takeEvery(getRegistrationFetch.type, getRegisterWorker)
  yield takeEvery(getRefreshFetch.type, getRefreshWorker)
}

export default userSaga