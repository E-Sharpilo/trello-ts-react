import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { callApi } from '../../api/callApi'
import { createTagsFailure, createTagsFetch, createTagsSuccess, getTagsFailure, getTagsFetch, getTagsSuccess } from '../../reducers/tags'
import { TTag } from '../../types/tag'
import { TCreateTagsSuccess } from './type'


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
      method: 'POST',
      body: action.payload,
    })
    yield put(createTagsSuccess(res))
  } catch (error) {
    yield put(createTagsFailure(error))
  }
}


function* tagsSaga() {
  yield takeEvery(getTagsFetch.type, getTagsWorker)
  yield takeEvery(createTagsFetch.type, createTagsWorker)
}

export default tagsSaga