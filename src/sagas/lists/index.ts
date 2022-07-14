import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { callApi } from '../../api/callApi'
import {
  createListsFailure,
  createListsFetch,
  createListsSuccess,
  deleteListsFailure,
  deleteListsFetch,
  deleteListsSuccess,
  getListsFailure,
  getListsFetch,
  getListsSuccess,
  updateListsFailure,
  updateListsFetch,
  updateListsSuccess,
} from '../../reducers/lists'
import { TList } from '../../types/list'
import { TCreateListSuccess, TUpdateListSuccess } from './type'

function* getListsWorker(action: PayloadAction<string>){
  try {
    const res:TList = yield call(callApi, 'list', {
      query: {
        boardId: action.payload
      }
    })
    yield put(getListsSuccess(res))
  } catch (error) {
    yield put(getListsFailure(error))
  }
}

function* createListWorker(action: PayloadAction<TCreateListSuccess>){
  try {
    const res: TList = yield call(callApi, 'list', {
      method: 'POST',
      body: action.payload,
    })
    yield put(createListsSuccess(res))
  } catch (error) {
    yield put(createListsFailure(error))
  }
}

function* updateListWorker(action: PayloadAction<TUpdateListSuccess>) {
  try {
    const res: TList = yield call(callApi, `list/${action.payload.id}`, {
      method: 'PATCH',
      body: action.payload,
    })
    yield put(updateListsSuccess(res))
  } catch (error) {
    yield put(updateListsFailure(error))
  }
}

function* deleteListWorker(action: PayloadAction<string>) {
  try {
    yield call(callApi, `list/${action.payload}`, {
      method: 'DELETE',
    })
    yield put(deleteListsSuccess(action.payload))
  } catch (error) {
    yield put(deleteListsFailure(error))
  }
}

function* listsSaga() {
  yield takeEvery(getListsFetch.type, getListsWorker)
  yield takeEvery(createListsFetch.type, createListWorker)
  yield takeEvery(updateListsFetch.type, updateListWorker)
  yield takeEvery(deleteListsFetch.type, deleteListWorker)
}

export default listsSaga
