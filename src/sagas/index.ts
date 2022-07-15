import { all, fork } from 'redux-saga/effects'
import boardsSaga from './boards'
import cardSaga from './card'
import cardsSaga from './cards'
import listsSaga from './lists'
import tagsSaga from './tags'

export default function* rootSaga() {
  yield all([fork(boardsSaga), fork(listsSaga), fork(cardsSaga), fork(cardSaga), fork(tagsSaga)])
}
