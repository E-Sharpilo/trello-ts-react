import { Board } from './board';

export type Boards = {
  boards: Board[];
  loading: boolean;
  error: string | null;
}