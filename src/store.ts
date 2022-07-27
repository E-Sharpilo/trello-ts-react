import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './reducers/boards';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './sagas';
import listsReducer from './reducers/lists';
import cardsReducer from './reducers/cards';
import cardReducer from './reducers/card';
import tagsReducer from './reducers/tags';
import cardTagsReducer from './reducers/cardTags';
import userReducer from './reducers/user';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer,
    card: cardReducer,
    tags: tagsReducer,
    cardTags: cardTagsReducer,
  },
  middleware: [saga],
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
