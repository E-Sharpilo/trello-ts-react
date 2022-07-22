import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { callApi } from '../../api/callApi'
import {
  createCardsFailure,
  createCardsFetch,
  createCardsSuccess,
  getCardsFailure,
  getCardsFetch,
  getCardsSuccess,
} from '../../reducers/cards'
import { TCard } from '../../types/card'
import { TCreateCardsSuccess } from './type'

function* getCardsWorker(action: PayloadAction<string>) {
  try {
    yield put(getCardsSuccess([]))

    const res: TCard[] = yield call(callApi, 'card', {
      query: {
        listId: action.payload,
      },
    })

    yield put(getCardsSuccess(res))
  } catch (error) {
    yield put(getCardsFailure(error))
  }
}

function* createCardsWorker(action: PayloadAction<TCreateCardsSuccess>) {
  try {
    yield put(getCardsSuccess([]))

    const res: TCard = yield call(callApi, 'card', {
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
