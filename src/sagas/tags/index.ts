import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { callApi } from '../../api/callApi'
import {
  createTagsFailure,
  createTagsFetch,
  createTagsSuccess,
  deleteTagsFailure,
  deleteTagsFetch,
  deleteTagsSuccess,
  getTagsFailure,
  getTagsFetch,
  getTagsSuccess,
  updateTagsFailure,
  updateTagsFetch,
  updateTagsSuccess,
} from '../../reducers/tags'
import { TTag } from '../../types/tag'
import { TCreateTagsSuccess, TUpdateTagsSuccess } from './type'

function* getTagsWorker() {
  try {
    const res: TTag[] = yield call(callApi, 'tag', {})
    yield put(getTagsSuccess(res))
  } catch (error) {
    yield put(getTagsFailure(error))
  }
}

function* createTagsWorker(action: PayloadAction<TCreateTagsSuccess>) {
  try {
    const res: TTag = yield call(callApi, 'tag', {
      method: 'post',
      body: action.payload,
    })
    yield put(createTagsSuccess(res))
  } catch (error) {
    yield put(createTagsFailure(error))
  }
}

function* deleteTagsWorker(action: PayloadAction<string>) {
  try {
    yield call(callApi, `tag/${action.payload}`, {
      method: 'delete',
    })
    yield put(deleteTagsSuccess(action.payload))
  } catch (error) {
    yield put(deleteTagsFailure(error))
  }
}

function* updateTagsWorker(action: PayloadAction<TUpdateTagsSuccess>) {
  try {
    const res: TTag = yield call(callApi, `tag/${action.payload.id}`, {
      method: 'patch',
      body: action.payload,
    })
    yield put(updateTagsSuccess(res))
  } catch (error) {
    yield put(updateTagsFailure(error))
  }
}

function* tagsSaga() {
  yield takeEvery(getTagsFetch.type, getTagsWorker)
  yield takeEvery(createTagsFetch.type, createTagsWorker)
  yield takeEvery(deleteTagsFetch.type, deleteTagsWorker)
  yield takeEvery(updateTagsFetch.type, updateTagsWorker)
}

export default tagsSaga
