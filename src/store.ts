import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './reducers/boards'
import listsReducer from './reducers/lists';

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
