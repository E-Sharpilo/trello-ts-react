import { TBoards } from '../reducers/boards/type';

export const selectBoards = (state:{ boards: TBoards }) => state.boards.boards
