import { all, fork } from 'redux-saga/effects';
import boardsSaga from './boardsSaga';
import listsSaga from './listsSaga';

export default function* rootSaga() {
  yield all([fork(boardsSaga), fork(listsSaga)]);
}
