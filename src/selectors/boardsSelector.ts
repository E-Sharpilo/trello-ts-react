import { TBoards } from '../reducers/boards';

export const selectBoards = (state:{ boards: TBoards }) => state.boards.boards