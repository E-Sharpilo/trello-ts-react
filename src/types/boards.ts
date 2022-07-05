import { TBoard } from './board';

export type TBoards = {
  boards: TBoard[];
  loading: boolean;
  error: string | null;
}