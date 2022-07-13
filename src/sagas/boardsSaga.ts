import { AnyAction } from 'redux'
import { call, put, takeEvery } from 'redux-saga/effects'
import { callApi } from '../api/callApi'
import {
  createBoardsFailure,
  createBoardsFetch,
  createBoardsSuccess,
  deleteBoardsFailure,
  deleteBoardsFetch,
  deleteBoardsSuccess,
  getBoardsFailure,
  getBoardsFetch,
  getBoardsSuccess,
  updateBoardsFailure,
  updateBoardsFetch,
  updateBoardsSuccess,
} from '../reducers/boards'

function* getBoardsWorker(): Generator {
  try {
    const res = yield call(callApi, 'board', {})
    yield put(getBoardsSuccess(res))
  } catch (error) {
    yield put(getBoardsFailure(error))
  }
}

function* createBoardWorker(action: AnyAction): Generator {
  try {
    const res = yield call(callApi, 'board', {
      method: 'POST',
      body: action.payload,
    })
    yield put(createBoardsSuccess(res))
  } catch (error) {
    yield put(createBoardsFailure(error))
  }
}

function* updateBoardWorker(action: AnyAction): Generator {
  try {
    const res = yield call(callApi, `board/${action.payload.id}`, {
      method: 'PATCH',
      body: action.payload,
    })
    yield put(updateBoardsSuccess(res))
  } catch (error) {
    yield put(updateBoardsFailure(error))
  }
}

function* deleteBoardWorker(action: AnyAction): Generator {
  try {
    yield call(callApi, `board/${action.payload}`, {
      method: 'DELETE',
    })
    yield put(deleteBoardsSuccess(action.payload))
  } catch (error) {
    yield put(deleteBoardsFailure(error))
  }
}

function* boardsSaga() {
  yield takeEvery(getBoardsFetch.type, getBoardsWorker)
  yield takeEvery(createBoardsFetch.type, createBoardWorker)
  yield takeEvery(updateBoardsFetch.type, updateBoardWorker)
  yield takeEvery(deleteBoardsFetch.type, deleteBoardWorker)
}

export default boardsSaga
