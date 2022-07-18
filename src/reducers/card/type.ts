import { TCard } from '../../types/card';

export type StateCard = {
  card: TCard;
  loading: boolean;
  error: string | null;
}