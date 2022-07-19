import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { callApi } from '../../api/callApi'
import {
  createCardTagsFailure,
  createCardTagsFetch,
  createCardTagsSuccess,
  deleteCardTagsFailure,
  deleteCardTagsFetch,
  deleteCardTagsSuccess,
  getCardTagsFailure,
  getCardTagsFetch,
  getCardTagsSuccess,
} from '../../reducers/cardTags'
import { CardTags } from '../../types/card_tags'
import { TCreateCardTagsSuccess, TDeleteCardTagsSuccess } from './type'

function* getCardTagsWorker(action: PayloadAction<string>) {
  try {
    const res: CardTags[] = yield call(callApi, 'card-tag', {
      query: {
        cardId: action.payload,
      },
    })
    yield put(getCardTagsSuccess(res))
  } catch (error) {
    yield put(getCardTagsFailure(error))
  }
}

function* createCardTagsWorker(action: PayloadAction<TCreateCardTagsSuccess>) {
  try {
    const res: CardTags = yield call(callApi, 'card-tag', {
      method: 'POST',
      body: action.payload,
    })
    yield put(createCardTagsSuccess(res))
  } catch (error) {
    yield put(createCardTagsFailure(error))
  }
}

function* deleteCardTagsWorker(action: PayloadAction<TDeleteCardTagsSuccess>) {
  try {
    yield call(callApi, `card-tag/${action.payload.tagId}`, {
      method: 'DELETE',
    })
    yield put(deleteCardTagsSuccess(action.payload))
    yield put(getCardTagsFetch(action.payload.cardId))
  } catch (error) {
    yield put(deleteCardTagsFailure(error))
  }
}

function* cardTagsSaga() {
  yield takeEvery(getCardTagsFetch.type, getCardTagsWorker)
  yield takeEvery(createCardTagsFetch.type, createCardTagsWorker)
  yield takeEvery(deleteCardTagsFetch.type, deleteCardTagsWorker)
}

export default cardTagsSaga
