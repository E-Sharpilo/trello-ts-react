import { StateBoards } from '../reducers/boards/type';

export const selectBoards = (state: { boards: StateBoards }) => state.boards;
