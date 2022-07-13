import { TBoard } from '../../types/board';

export type StateBoards = {
  boards: TBoard[];
  loading: boolean;
  error: string | null;
}