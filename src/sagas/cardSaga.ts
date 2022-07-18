import { AnyAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { callApi } from '../api/callApi'
import { getCardFailure, getCardFetch, getCardSuccess } from '../reducers/card'

function* getCardWorker(action: AnyAction): Generator {
  try {
    const res = yield call(callApi, `card/${action.payload}`, {})
    yield put(getCardSuccess(res))
  } catch (error) {
    yield put(getCardFailure(error))
  }
}

function* cardSaga() {
  yield takeEvery(getCardFetch.type, getCardWorker)
}

export default cardSaga
