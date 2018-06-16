import { fork, select, takeLatest } from 'redux-saga/effects';

import * as types from './types';

function* handlePageChange(context) {
  const page = yield select(state => state.page);
  console.log(page);
}

function* watchPageChange(context) {
  yield takeLatest(types.GO_TO_PAGE, handlePageChange, context);
}

const forkSagas = context => [fork(watchPageChange, context)];

export default forkSagas;
