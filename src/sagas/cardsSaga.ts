import { AnyAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { cApi } from '../api/callApi'
import {
  createCardsFailure,
  createCardsFetch,
  createCardsSuccess,
  getCardsFailure,
  getCardsFetch,
  getCardsSuccess,
} from '../reducers/cards'

function* getCardsWorker(action: AnyAction): Generator {
  try {
    const res = yield call(cApi, 'card', {
      query: `?boardId=${action.payload}`,
    })

    yield put(getCardsSuccess(res))
  } catch (error) {
    yield put(getCardsFailure(error))
  }
}

function* createCardsWorker(action: AnyAction): Generator {
  try {
    const res = yield call(cApi, 'card', {
      method: 'POST',
      body: action.payload,
    })
    yield put(createCardsSuccess(res))
  } catch (error) {
    yield put(createCardsFailure(error))
  }
}

function* cardsSaga() {
  yield takeEvery(getCardsFetch.type, getCardsWorker)
  yield takeEvery(createCardsFetch.type, createCardsWorker)
}

export default cardsSaga
