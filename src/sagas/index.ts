import { all, fork } from 'redux-saga/effects';
import boardsSaga from './boardsSaga';

export default function* rootSaga() {
  yield all([fork(boardsSaga)]);
}
