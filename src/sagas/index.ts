import { all, fork } from 'redux-saga/effects';
import boardsSaga from './boardsSaga';
import cardsSaga from './cardsSaga';
import listsSaga from './listsSaga';

export default function* rootSaga() {
  yield all([fork(boardsSaga), fork(listsSaga), fork(cardsSaga)]);
}
