import { TBoard } from '../../types/board';

export type TBoards = {
  boards: TBoard[];
  loading: boolean;
  error: string | null;
}