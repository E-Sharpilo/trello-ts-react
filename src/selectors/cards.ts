import { TCards } from '../reducers/cards/type';

export const selectCards = (state:{ cards: TCards }) => state.cards.cards