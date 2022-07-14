import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { callApi } from '../../api/callApi'
import {
  deleteCardFailure,
  deleteCardFetch,
  deleteCardSuccess,
  getCardFailure,
  getCardFetch,
  getCardSuccess,
  updateCardFailure,
  updateCardFetch,
  updateCardSuccess,
} from '../../reducers/card'
import { TCard } from '../../types/card'
import { TUpdateCardSuccess } from './type'

function* getCardWorker(action: PayloadAction<string>) {
  try {
    const res: TCard = yield call(callApi, `card/${action.payload}`, {})
    yield put(getCardSuccess(res))
  } catch (error) {
    yield put(getCardFailure(error))
  }
}

function* updateCardWorker(action: PayloadAction<TUpdateCardSuccess>) {
  try {
    const res: TCard = yield call(callApi, `card/${action.payload.id}`, {
      method: 'PATCH',
      body: action.payload,
    })
    yield put(updateCardSuccess(res))
  } catch (error) {
    yield put(updateCardFailure(error))
  }
}

function* deleteCardWorker(action: PayloadAction<string>) {
  try {
    yield call(callApi, `card/${action.payload}`, {
      method: 'DELETE',
    })
    yield put(deleteCardSuccess(action.payload))
  } catch (error) {
    yield put(deleteCardFailure(error))
  }
}

function* cardSaga() {
  yield takeEvery(getCardFetch.type, getCardWorker)
  yield takeEvery(updateCardFetch.type, updateCardWorker)
  yield takeEvery(deleteCardFetch.type, deleteCardWorker)
}

export default cardSaga
