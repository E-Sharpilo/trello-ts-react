import { AnyAction } from 'redux'
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects'
import { callApi } from '../api/callApi'
import {
  createBoardsFailure,
  createBoardsSuccess,
  getBoardsFailure,
  getBoardsSuccess,
} from '../reducers/boardsReducer'

function* getBoardsWorker(): Generator {
  try {
    const res = yield call(callApi, 'board')
    yield put(getBoardsSuccess(res))
  } catch (error) {
    yield put(getBoardsFailure(error))
  }
}

function* createBoardWorker(action: AnyAction): Generator {  
  try {
    const res = yield call(callApi, 'board', '', 'POST', action.payload)    
    yield put(createBoardsSuccess(res))
  } catch (error) {
    yield put(createBoardsFailure(error))
  }
}

function* boardsSaga(): Generator<StrictEffect> {
  yield takeEvery('boards/getBoardsFetch', getBoardsWorker)
  yield takeEvery('boards/createBoardsFetch', createBoardWorker)
}

export default boardsSaga
