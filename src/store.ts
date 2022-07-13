import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './reducers/boards'
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from './sagas'
import listsReducer from './reducers/lists'
import cardsReducer from './reducers/cards'

const saga = createSagaMiddleware()

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer
  },
  middleware:[saga]
})

saga.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
