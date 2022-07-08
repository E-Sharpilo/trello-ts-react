import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './reducers/boardsReducer'
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from './sagas'
import listsReducer from './reducers/listsReducer'

const saga = createSagaMiddleware()

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer
  },
  middleware:[saga]
})

saga.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
