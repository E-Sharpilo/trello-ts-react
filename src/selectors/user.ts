import { StateUser } from '../reducers/user/type';

export const selectUser = (state: { user: StateUser }) => state.user;
