import { StateCards } from '../reducers/cards/type';

export const selectCards = (state: { cards: StateCards }) => state.cards;
