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

function* listsSaga() {
  yield takeEvery(getListsFetch.type, getListsWorker)
  yield takeEvery(createListsFetch.type, createListWorker)
}

export default listsSaga
