import { TUser } from '../../types/user';

export type StateUser = {
  user: TUser;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}