import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './reducers/boards'

const store = configureStore({
  reducer: {
    boards: boardsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
