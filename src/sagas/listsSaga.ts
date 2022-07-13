import { AnyAction } from 'redux'
import { call, put, takeEvery } from 'redux-saga/effects'
import { cApi } from '../api/callApi'
import {
  createListsFailure,
  createListsFetch,
  createListsSuccess,
  getListsFailure,
  getListsFetch,
  getListsSuccess,
  updateListsFailure,
  updateListsFetch,
  updateListsSuccess,
} from '../reducers/lists'

function* getListsWorker(action: AnyAction): Generator {
  try {
    const res = yield call(cApi, `list/${action.payload}`, {})
    yield put(getListsSuccess(res))
  } catch (error) {
    yield put(getListsFailure(error))
  }
}

function* createListWorker(action: AnyAction): Generator {
  try {
    const res = yield call(cApi, 'list', {
      method: 'POST',
      body: action.payload,
    })
    yield put(createListsSuccess(res))
  } catch (error) {
    yield put(createListsFailure(error))
  }
}

function* updateListWorker(action: AnyAction): Generator {
  try {
    const res = yield call(cApi, `list/${action.payload.id}`, {
      method: 'PATCH',
      body: action.payload,
    })
    yield put(updateListsSuccess(res))
  } catch (error) {
    yield put(updateListsFailure(error))
  }
}

function* listsSaga() {
  yield takeEvery(getListsFetch.type, getListsWorker)
  yield takeEvery(createListsFetch.type, createListWorker)
  yield takeEvery(updateListsFetch.type, updateListWorker)
}

export default listsSaga
